import React, { PureComponent } from 'react';

class Checkout extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        // TODO: create checkout form showing all items to be purchased
        // with grand total, ask user for address to be delivered to
        // email(send stripe receipt to this email) and phone number of contact
        // desired date and time of delivery(should be able to choose from available time slots)
        // also should have buttons to go back to cart, go back to bagels, or cancel(clear form and redirect to bagels)
        // also redirect user to cart if this page is navigated to with an empty cart
        
        return (
            <div className='checkout-container'>
                <h1>Checkout</h1>
            </div>
        );
    }
}

export default Checkout;