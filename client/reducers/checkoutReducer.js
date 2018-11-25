import validator from 'validator';

import { 
    UPDATE_CONTACT_DETAILS, 
    UPDATE_DELIVERY_DETAILS,
    UPDATE_PAYMENT_DETAILS,
    UPDATE_CONTACT_BLUR,
    UPDATE_DELIVERY_BLUR,
    UPDATE_PAYMENT_BLUR
} from '../actions/types';

const initialState = {
    contactDetails: {},
    contactDetailsErrors: {},
    contactDetailsBlur: {},
    contactDetailsValid: false,
    deliveryDetails: {},
    deliveryDetailsBlur: {},
    deliveryDetailsErrors: {},
    deliveryDetailsValid: false,
    paymentDetails: {},
    paymentDetailsBlur: {},
    paymentDetailsErrors: {},
    paymentDetailsValid: false,
};

function contactDetailsValid(contactDetails) {
    let valid = true;
    let errors = {};

    if(!contactDetails.firstName || !contactDetails.firstName.trim().length) {
        valid = false;
        errors.firstName = 'First Name Required';
    }

    if(!contactDetails.lastName || !contactDetails.lastName.trim().length) {
        valid = false;
        errors.lastName = 'Last Name Required';
    }

    if(!contactDetails.phoneNumber || !contactDetails.phoneNumber.trim().length) {
        valid = false;
        errors.phoneNumber = 'Phone Number Required';
    }
    
    if(!contactDetails.email || 
       !contactDetails.email.trim().length || 
       (contactDetails.email && contactDetails.email.trim().length && !validator.isEmail(contactDetails.email))) {
        valid = false;

        if(contactDetails.email && contactDetails.email.trim().length && validator.isEmail(contactDetails.email)) {
            errors.email = 'Email Required';
        } else {
            errors.email = 'Valid Email Required';
        }
    }

    return { valid, errors };
}

function deliveryDetailsValid(deliveryDetails) {
    let valid = true;
    let errors = {};

    if(!deliveryDetails.addressLineOne || !deliveryDetails.addressLineOne.trim().length) {
        valid = false;
        errors.addressLineOne = 'Address Required';
    }

    if(!deliveryDetails.city || !deliveryDetails.city.trim().length) {
        valid = false;
        errors.city = 'City Required';
    }

    if(!deliveryDetails.state || !deliveryDetails.state.trim().length) {
        valid = false;
        errors.state = 'State Required';
    }

    if(!deliveryDetails.zipCode || !deliveryDetails.zipCode.trim().length) {
        valid = false;
        errors.zipCode = 'Zip Code Required';
    }

    return { valid, errors };
}

function paymentDetailsValid(paymentDetails) {
    let valid = true;
    let errors = {};

    if(!paymentDetails.fullName || !paymentDetails.fullName.trim().length) {
        valid = false;
        errors.fullName = 'Full Name Required';
    }

    if(!paymentDetails.cardNumber || !paymentDetails.cardNumber.trim().length) {
        valid = false;
        errors.cardNumber = 'Card Number Required';
    }

    if(!paymentDetails.cardType || !paymentDetails.cardType.trim().length) {
        valid = false;
        errors.cardType = 'Card Type Required';
    }

    if(!paymentDetails.cardExpiration || !paymentDetails.cardExpiration.trim().length) {
        valid = false;
        errors.cardExpiration = 'Card Expiration Required';
    }

    if(!paymentDetails.cardSecurityCode || !paymentDetails.cardSecurityCode.trim().length) {
        valid = false;
        errors.cardSecurityCode = 'Security Code Required';
    }

    return { valid, errors };
}

export default function (state = initialState , action) {
    switch (action.type) {
        case UPDATE_CONTACT_DETAILS:
            let newContactState = { ...state.contactDetails };
            newContactState = { ...newContactState, ...action.payload };
            
            return { 
                ...state, 
                contactDetails: newContactState,
                contactDetailsErrors: contactDetailsValid(newContactState).errors,
                contactDetailsValid: contactDetailsValid(newContactState).valid,
            };

        case UPDATE_CONTACT_BLUR:
            let newContactBlurState = { 
                ...state.contactDetailsBlur, 
                [action.payload]: true 
            };
            
            return { 
                ...state, 
                contactDetailsBlur: newContactBlurState
            };

        case UPDATE_DELIVERY_BLUR:
            let newDeliveryBlurState = { 
                ...state.deliveryDetailsBlur, 
                [action.payload]: true 
            };
            
            return { 
                ...state, 
                deliveryDetailsBlur: newDeliveryBlurState
            };

        case UPDATE_PAYMENT_BLUR:
            let newPaymentBlurState = { 
                ...state.paymentDetailsBlur, 
                [action.payload]: true 
            };
            
            return { 
                ...state, 
                paymentDetailsBlur: newPaymentBlurState
            };

        case UPDATE_DELIVERY_DETAILS:
            let newDeliveryState = { ...state.deliveryDetails };
            newDeliveryState = { ...newDeliveryState, ...action.payload };

            return { 
                ...state, 
                deliveryDetails: newDeliveryState,
                deliveryDetailsErrors: deliveryDetailsValid(newDeliveryState).errors,
                deliveryDetailsValid: deliveryDetailsValid(newDeliveryState).valid,
            };

        case UPDATE_PAYMENT_DETAILS:
            let newPaymentState = { ...state.paymentDetails };
            newPaymentState = { ...newPaymentState, ...action.payload };

            return { 
                ...state, 
                paymentDetails: newPaymentState,
                paymentDetailsErrors: paymentDetailsValid(newPaymentState).errors,
                paymentDetailsValid: paymentDetailsValid(newPaymentState).valid,
            };

        default:
            return { ...state };
    }
};