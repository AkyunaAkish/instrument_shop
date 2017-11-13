import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import addToCart from '../../actions/addToCart';
import removeFromCart from '../../actions/removeFromCart';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CartIcon from 'material-ui/svg-icons/action/shopping-cart';
import AddToCartIcon from 'material-ui/svg-icons/action/add-shopping-cart';
import RemoveFromCartIcon from 'material-ui/svg-icons/action/remove-shopping-cart';
import RemoveIcon from 'material-ui/svg-icons/action/delete-forever';

class Cart extends PureComponent {
    constructor(props) {
        super(props);

        this.bagelIndexes = {};
    }

    findCartGrandTotal() {
        if(window.localStorage.bagelCart) {
            return JSON.parse(window.localStorage.bagelCart).reduce((grandTotal, bagel) => {
                if(bagel.price) {
                    grandTotal += bagel.price;
                }

                return grandTotal;
            }, 0).toFixed(2);
        }
    }

    findBagelCount(bagel) {
        return this.props.cart.reduce((count, currentBagel) => {
            if(currentBagel.type === bagel.type) {
                count += 1;
            }

            return count;
        }, 0);
    }

    hasBagelAlready(arr, bagel) {
        return arr.reduce((bool, currentBagel) => {
            if(currentBagel.type === bagel.type) {
                bool = true;
            }

            return bool;
        }, false);
    }

    handleCartInputChange(e, bagel, id) {
        if(parseInt(e.target.value) > 1000) {
            alert('Cannot Exceed 1000');
        } else {
            // amount of bagel
            if (this.findBagelCount(bagel) > parseInt(e.target.value) && Number(this.findBagelCount(bagel) - parseInt(e.target.value))) {
                this.props.removeFromCart(bagel, this.findBagelCount(bagel) - parseInt(e.target.value));
            } else if (Number(parseInt(e.target.value) - this.findBagelCount(bagel))) {
                this.props.addToCart(bagel, parseInt(e.target.value) - this.findBagelCount(bagel));
            } else {
                this.props.removeFromCart(bagel, this.findBagelCount(bagel) - 1);
            }
        }

        $(id).focus();
    }

    renderCartListItemPrimaryText(bagel, ind) {
        return (
            <div className='inline-block'>
                <input id={`cartInput${ind}`} onChange={(e) => this.handleCartInputChange(e, bagel, `#cartInput${ind}`) } className='inline-block text-center' value={ this.findBagelCount(bagel) } type='text' style={{ fontSize: 22, width: 100 }} />
                <AddToCartIcon className='inline-block' 
                               style={{ fill: 'rgb(89,146,43)', marginRight: 10, marginLeft: 10, height: 20 }}
                               onClick={ () => this.props.addToCart(bagel) } />

                <RemoveFromCartIcon className='inline-block' 
                                    style={{ fill: 'rgb(240,91,79)', height: 20 }} 
                                    onClick={ () => this.props.removeFromCart(bagel, 1) } />
            </div>
        );
    }

    setBagelIndexes(bagels) {
        // this function is meant to enforce consistent order of rendering list items
        // so that when the component re-renders the same order of bagels in the cart will be maintained
        let trackedBagels = {};
        let indCount = 0;

        // only the first instance of a bagel needs to be tracked
        let filteredBagelArr = bagels.filter((bagel) => {
            if(trackedBagels[bagel.type] == undefined) {
                trackedBagels[bagel.type] = indCount;
                indCount++;
                return true;
            } else { 
                return false;
            }
        });
   
        let indexObj = {};

        filteredBagelArr.forEach((bagel, ind) => {
            indexObj[bagel.type] = ind;
        });

        this.bagelIndexes = indexObj;
    }

    renderCartList() {
        const typesInCart = [];
        
        if(Object.keys(this.bagelIndexes).length < 1) {
            this.setBagelIndexes(this.props.cart);
        }

        let orderedCartList = [];

        this.props.cart.forEach((bagel, ind) => {
            if (!this.hasBagelAlready(typesInCart, bagel)) {
                typesInCart.push(bagel);

                let indForCurrBagel = this.bagelIndexes[bagel.type];

                orderedCartList[indForCurrBagel] = (
                    <div key={ ind }>
                        { this.bagelIndexes[bagel.type] != 0 ? <Divider /> : <span></span> }
                        
                        <ListItem style={{ color: 'rgb(70,62,63)' }}
                                  leftAvatar={ <span style={{ paddingTop: 10, fontSize: 22 }}>{ bagel.type }</span> }
                                  rightIcon={<RemoveIcon className='inline-block' style={{ fill: 'rgb(240,91,79)' }} onClick={() => this.props.removeFromCart(bagel, this.findBagelCount(bagel))} /> }
                                  primaryText={ this.renderCartListItemPrimaryText(bagel, ind) }
                                  secondaryText={ <span className='text-center block' style={{ marginRight: 120 }}>${(this.findBagelCount(bagel) * bagel.price).toFixed(2)}</span> } />
                    </div>
                );
            }
        });

        return orderedCartList;
    }

    render() {
        const style = {
            width: '97%',
            overflowY: 'scroll',
            overflowX: 'hidden',
            margin: 20,
            backgroundColor: 'rgb(253,244,220)',
            textAlign: 'center',
            display: 'inline-block',
        };

        return (
            <div className='cart-container'>
                <h1 className='text-center'>Shopping Cart</h1>
                <Paper className='cart-paper' style={ style } zDepth={ 1 }>
                    <List className='cart-list'>
                        { this.props.cart.length ? this.renderCartList() : <h3 className='salmon-text'>Cart is Empty</h3> }
                    </List>
                </Paper>

                <div className='grand-total-container' style={{ display: this.props.cart.length < 1 ? 'none' : 'block' }}>
                    <h3>Grand Total: ${ this.findCartGrandTotal() }</h3>
                </div>

                <div style={{ width: '100%', textAlign: 'center', display: this.props.cart.length < 1 ? 'none' : 'block' }}>
                    <RaisedButton className='bagel-item-btn'
                                  label='Checkout'
                                  icon={ <CartIcon /> }
                                  backgroundColor='rgb(70,62,63)'
                                  style={{ marginRight: 10, width: '97%' }}
                                  onClick={() => console.log('checkout')} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart
    };
}

export default connect(mapStateToProps, { addToCart, removeFromCart })(Cart);