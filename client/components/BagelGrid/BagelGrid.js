import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import { Thumbnail } from 'react-bootstrap';

import addToCart from '../../actions/addToCart';
import removeFromCart from '../../actions/removeFromCart';

import RemoveFromCartIcon from 'material-ui/svg-icons/action/remove-shopping-cart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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
                        <Button variant='contained' 
                                classes={{ root: 'bagel-item-btn' }}
                                onClick={ () => this.props.addToCart(bagel, 1) }>
                                <ShoppingCartIcon className='small-icon' />
                                Add to Cart
                        </Button>
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