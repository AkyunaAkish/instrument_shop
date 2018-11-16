import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import { Thumbnail } from 'react-bootstrap';

import addToCart from '../../actions/addToCart';
import removeFromCart from '../../actions/removeFromCart';

import AddToCartIcon from 'material-ui/svg-icons/action/add-shopping-cart';
import RemoveFromCartIcon from 'material-ui/svg-icons/action/remove-shopping-cart';

class BagelGrid extends PureComponent {
    constructor(props) {
        super(props);
    }

    renderAmountInCart(bagel) {
        if(Object.keys(this.props.cart).length && this.props.cart[bagel.type] && this.props.cart[bagel.type].amt) {
            return (
                <i className='text-success'>
                    <u onClick={ () => this.props.history.push('/cart') } className='pointer'># in cart ({ this.props.cart[bagel.type].amt })</u> 
                    <RemoveFromCartIcon className='inline-block pointer'
                                        style={{ fill: 'rgb(240,91,79)', height: 15 }} 
                                        onClick={ () => this.props.removeFromCart(bagel, 1) } />
                </i>
            );
        } else {
            return <span style={{ display: 'none' }}></span>;
        }
    }
    renderBagels() {
        return this.props.bagels.map((bagel, ind) => {
            return (
                <Thumbnail key={ ind } className='bagel-grid-item text-left shadow' src={ bagel.img }>
                    <h3>{ bagel.type }</h3>
                    <h5>{ `$${bagel.price.toFixed(2)}` } { this.renderAmountInCart(bagel) }</h5>

                    <div>
                        <RaisedButton className='bagel-item-btn'
                                      label={ `Add to Cart ` }
                                      backgroundColor='rgb(70,62,63)'
                                      style={{ marginRight: 10 }}
                                      icon={ <AddToCartIcon style={{ fill: 'rgb(89,146,43)' }} /> }
                                      onClick={ () => this.props.addToCart(bagel, 1) } />
                    </div>
                </Thumbnail>
            );
        });
    }

    render() {
        return (
            <div className='bagel-grid-container margin-center'>
                { this.renderBagels() }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart
    };
}

export default withRouter(connect(mapStateToProps, { addToCart, removeFromCart })(BagelGrid));