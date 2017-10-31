import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Cart extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='reviews-container'>
                <h1>Cart { this.props.cart.length } bagels</h1>
                <p>{ JSON.stringify(this.props.cart) }</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart
    };
}

export default connect(mapStateToProps)(Cart);