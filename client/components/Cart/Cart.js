import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
        
        this.state = {
            updateButtonInds: {}
        };
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

    handleCartInputUpdate(bagel, id, ind) {    
            if (Number($(id).val())) {
                if (parseInt($(id).val()) > 1000) {
                    alert('Cannot Exceed 1000');
                } else {
                    // amount of bagel
                    if (this.findBagelCount(bagel) > parseInt($(id).val()) && Number(this.findBagelCount(bagel) - parseInt($(id).val()))) {
                        this.props.removeFromCart(bagel, this.findBagelCount(bagel) - parseInt($(id).val()));
                    } else if (Number(parseInt($(id).val()) - this.findBagelCount(bagel))) {
                        this.props.addToCart(bagel, parseInt($(id).val()) - this.findBagelCount(bagel));
                    } else {
                        this.props.removeFromCart(bagel, this.findBagelCount(bagel) - 1);
                    }
                }
            }

            $(id).val('');

            let newButtonInds = { ...this.state.updateButtonInds };

            newButtonInds[ind] = false;

            this.setState({
                updateButtonInds: newButtonInds
            });
    }

    handleInputChange(e, ind) {
        if(e.target.value.length) {
            let newButtonInds = { ...this.state.updateButtonInds };
            newButtonInds[ind] = true;

             this.setState({ 
                 updateButtonInds: newButtonInds
             });
        } else {
            let newButtonInds = { ...this.state.updateButtonInds };
            newButtonInds[ind] = false;

            this.setState({
                updateButtonInds: newButtonInds
            });
        }
    }

    renderCartListItemPrimaryText(bagel, ind) {
        return (
            <div className='inline-block primary-text-section'>
                <input id={ `cartInput${ind}` } 
                       placeholder={ this.findBagelCount(bagel) } 
                       className='styled-input'
                       type='number'
                       onChange={ (e) => this.handleInputChange(e, ind) } 
                       style={{ fontSize: 22, width: 100, height: 28 }} />

                <AddToCartIcon className='inline-block' 
                               style={{ fill: 'rgb(89,146,43)', marginRight: 10, marginLeft: 10, height: 20 }}
                               onClick={ () => this.props.addToCart(bagel) } />

                <RemoveFromCartIcon className='inline-block' 
                                    style={{ fill: 'rgb(240,91,79)', height: 20 }} 
                                    onClick={ () => this.props.removeFromCart(bagel, 1) } />

                <div className='list-item-secondary-section block'>
                    <RaisedButton label='Update'
                                  backgroundColor='rgb(3,68,211)'
                                  labelColor='rgb(233,218,196)'
                                  style={{ width: 50, height: 20, display: this.state.updateButtonInds[ind] ? 'block' : 'none' }}
                                  className='update-btn'
                                  onClick={ () => this.handleCartInputUpdate(bagel, `#cartInput${ind}`, ind) } />
                    <span style={{ marginRight: 120, display: 'block' }}>
                        ${(this.findBagelCount(bagel) * bagel.price).toFixed(2)}
                    </span>
                </div>
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
                        
                        <ListItem style={{ color: 'rgb(70,62,63)' }} className='row row-centered'>

                            <div className='list-item-left-section col-md-4'>
                                <span style={{ fontSize: 22 }}>{ bagel.type }</span>
                            </div>

                            <div className='list-item-primary-section col-md-4'>
                                { this.renderCartListItemPrimaryText(bagel, ind) }                                                             
                            </div>

                            <div className='list-item-right-section col-md-4'>
                                { this.props.dimensions.width > 992 ? 
                                        <RemoveIcon className='inline-block'
                                                    style={{ fill: 'rgb(240,91,79)' }}
                                                    onClick={ () => this.props.removeFromCart(bagel, this.findBagelCount(bagel)) } /> :
                                        <RaisedButton label={ `${this.findBagelCount(bagel)}` }
                                                      labelPosition='after'
                                                      backgroundColor='rgb(240,91,79)'
                                                      labelColor='rgb(233,218,196)'
                                                      style={{ height: 30 }}
                                                      onClick={ () => this.props.removeFromCart(bagel, this.findBagelCount(bagel)) }
                                                      icon={ <RemoveIcon className='inline-block' style={{ fill: 'rgb(233,218,196)' }} /> } /> }

                            </div>                            

                       </ListItem>           
                    </div>
                );
            }
        });

        return orderedCartList;
    }

    render() {
        return (
            <div className='cart-container text-center'>
                <h1 className='text-center cart-header-text'>Shopping Cart</h1>
                
                <Paper className='cart-paper' zDepth={ 1 }>
                    <List className='cart-list'>
                        { this.props.cart.length ? this.renderCartList() : <h3 className='salmon-text'>Cart is Empty</h3> }
                    </List>
                </Paper>

                <div className='grand-total-container' style={{ display: this.props.cart.length < 1 ? 'none' : 'block' }}>
                    <h3 className='text-left'>Grand Total: ${ this.findCartGrandTotal() }</h3>
                </div>

                <div style={{ width: '100%', textAlign: 'center', display: this.props.cart.length < 1 ? 'none' : 'block', marginBottom: 10 }}>
                    <Link to='/checkout'>
                        <RaisedButton className='bagel-item-btn'
                                      label='Checkout'
                                      icon={ <CartIcon /> }
                                      backgroundColor='rgb(70,62,63)'
                                      style={{ width: '97%' }} />
                    </Link>                                  
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart,
        dimensions: state.shared.dimensions
    };
}

export default connect(mapStateToProps, { addToCart, removeFromCart })(Cart);