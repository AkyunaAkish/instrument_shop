import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import addToCart from '../../actions/addToCart';
import removeFromCart from '../../actions/removeFromCart';

import CartTable from './components/CartTable';

class Cart extends PureComponent {
    componentWillMount() {
        this.handleEmptyCart();
    }

    handleEmptyCart() {
        let isEmpty = true;

        if (Object.keys(this.props.cart).length) {
            for(let key in this.props.cart) {
                if(this.props.cart[key] && 
                   this.props.cart[key].amt) {
                    isEmpty = false;
                    break;
                }
            }
        }

        if (isEmpty) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className='cart-container'>
                <div className='margin-bottom-lg'>
                    <Button variant='contained' 
                            classes={{ root: 'dark-btn' }}
                            onClick={ () => this.props.history.push('/') }>
                        Back
                    </Button>
                </div>
                
                <h1>Shopping Cart</h1>

                <CartTable cart={ this.props.cart || {} } 
                           handleEmptyCart={ () => this.handleEmptyCart() } />

                <div className='margin-top-lg'>
                    <Button variant='contained' 
                            classes={{ root: 'dark-btn' }}
                            onClick={ () => this.props.history.push('/checkout') }>
                        Proceed to Checkout
                    </Button>
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

export default connect(mapStateToProps, { addToCart, removeFromCart })(withRouter(Cart));