import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';

class Checkout extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if(!this.props.cart.length) {
            this.props.history.push('/cart');
        }
    }


    renderField(field) {
        const { meta: { touched, error } } = field;

        const fieldStyle = {
            errorStyle: {
                color: 'rgb(217, 83, 79)',
            },
            underlineStyle: {
                borderColor: 'rgb(119, 136, 153)',
            },
            floatingLabelStyle: {
                color: 'rgb(119, 136, 153)',
            },
            floatingLabelFocusStyle: {
                color: 'rgb(119, 136, 153)',
            }
        };

        return (
            <div style={{ paddingLeft: 12 }}>
                <label htmlFor={ Date.now() } className={ `${touched && error ? 'error-text' : ''} block` }>{ touched && error ? error : field.label }</label>                
                <input id={ Date.now() } placeholder={ field.label } className='styled-input' { ...field.input } />
            </div>
        );
    }

    onSubmit(values) {
        console.log('values', values);
    }

    render() {
        // TODO: create checkout form showing all items to be purchased
        // with grand total, ask user for address to be delivered to
        // email(send stripe receipt to this email) and phone number of contact
        // desired date and time of delivery(should be able to choose from available time slots)
        // also should have buttons to go back to cart, go back to bagels, or cancel(clear form and redirect to bagels)
        const { handleSubmit } = this.props;

        return (
            <div className='checkout-container'>
                <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                    <Field name='fullName' label='Full Name' component={ this.renderField } />
                    <Field name='contactEmail' label='Contact Email' component={ this.renderField } />
                    <Field name='contactPhoneNumber' label='Contact Phone Number' component={ this.renderField } />
                    <Field name='deliveryAddressLineOne' label='Delivery Address Line 1' component={ this.renderField } />
                    <Field name='deliveryAddressLineTwo' label='Address Line 2(optional unit number)' component={ this.renderField } />
                    <Field name='zipCode' label='Zip Code' component={ this.renderField } />
                    <Field name='town' label='Town' component={ this.renderField } />
                    <Field name='state' label='State' component={ this.renderField } />
                    <Field name='fullNameOnCard' label='Full Name on Card' component={ this.renderField } />
                    <Field name='cardNumber' label='Card Number' component={ this.renderField } />
                    <Field name='cardExpiration' label='Card Expiration' component={ this.renderField } />
                    <Field name='cardSecurityCode' label='Card Security Code' component={ this.renderField } />

                    <RaisedButton 
                        type='submit'
                        label='Submit Order'
                        backgroundColor='rgb(164, 198, 57)'
                        labelColor='rgb(255, 255, 255)'
                        style={{ margin: 12 }} />
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.fullName) {
        errors.fullName = 'Please enter your full name';
    }
    
    if (!values.contactEmail) {
        errors.contactEmail = 'Please enter your contact email';
    }

    if (!values.contactPhoneNumber) {
        errors.contactPhoneNumber = 'Please enter your contact phone number';
    }

    if (!values.deliveryAddressLineOne) {
        errors.deliveryAddressLineOne = 'Please enter your delivery address line 1';
    }

    if (!values.zipCode) {
        errors.zipCode = 'Please enter your delivery address zip code';
    }

    if (!values.town) {
        errors.town = 'Please enter your delivery address\'s town';
    }

    if (!values.state) {
        errors.state = 'Please enter your delivery address\'s state';
    }

    if (!values.fullNameOnCard) {
        errors.fullNameOnCard = 'Please enter the full name on your payment card';
    }

    if (!values.cardNumber) {
        errors.cardNumber = 'Please enter your payment card number';
    }

    if (!values.cardExpiration) {
        errors.cardExpiration = 'Please enter your payment card\'s expiration date(mm/yy)';
    }
    if (!values.cardSecurityCode) {
        errors.cardSecurityCode = 'Please enter your payment card\'s security code(3-4 digits on back of card)';
    }
 
    return errors;
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart
    };
}

export default reduxForm({
    validate,
    form: 'CheckoutForm'
})(withRouter(connect(mapStateToProps)(Checkout)));