import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import addToCart from '../../actions/addToCart';
import removeFromCart from '../../actions/removeFromCart';

class Cart extends PureComponent {
    render() {
        return (
          <div className='cart-container'>
            <h1>Cart</h1>
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