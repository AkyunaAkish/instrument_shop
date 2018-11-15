import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import addToCart from '../../actions/addToCart';
import removeFromCart from '../../actions/removeFromCart';

import CartTable from './components/CartTable';

class Cart extends PureComponent {
    render() {
        return (
          <div className='cart-container'>
            <h1>Shopping Cart</h1>
            <CartTable cart={ this.props.cart || {} } />
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