import validator from 'validator';

import { 
    UPDATE_CONTACT_DETAILS, 
    UPDATE_DELIVERY_DETAILS,
    UPDATE_PAYMENT_DETAILS,
} from '../actions/types';

const initialState = {
    contactDetails: {},
    contactDetailsValid: false,
    deliveryDetails: {},
    deliveryDetailsValid: false,
    paymentDetails: {},
    paymentDetailsValid: false,
};

function contactDetailsValid(contactDetails) {
    let valid = true;

    if(!contactDetails.firstName || !contactDetails.firstName.trim().length) {
        valid = false;
    }

    if(!contactDetails.lastName || !contactDetails.lastName.trim().length) {
        valid = false;
    }

    if(!contactDetails.phoneNumber || !contactDetails.phoneNumber.trim().length) {
        valid = false;
    }

    if(!contactDetails.email || 
       !contactDetails.email.trim().length || 
       !validator.isEmail(contactDetails.email)) {
        valid = false;
    }

    return valid;
}

function deliveryDetailsValid(deliveryDetails) {
    let valid = true;

    if(!deliveryDetails.addressLineOne || !deliveryDetails.addressLineOne.trim().length) {
        valid = false;
    }

    if(!deliveryDetails.city || !deliveryDetails.city.trim().length) {
        valid = false;
    }

    if(!deliveryDetails.state || !deliveryDetails.state.trim().length) {
        valid = false;
    }

    if(!deliveryDetails.zipCode || !deliveryDetails.zipCode.trim().length) {
        valid = false;
    }

    return valid;
}

function paymentDetailsValid(paymentDetails) {
    let valid = true;

    if(!paymentDetails.fullName || !paymentDetails.fullName.trim().length) {
        valid = false;
    }

    if(!paymentDetails.cardNumber || !paymentDetails.cardNumber.trim().length) {
        valid = false;
    }

    if(!paymentDetails.cardType || !paymentDetails.cardType.trim().length) {
        valid = false;
    }

    if(!paymentDetails.cardExpiration || !paymentDetails.cardExpiration.trim().length) {
        valid = false;
    }

    if(!paymentDetails.cardSecurityCode || !paymentDetails.cardSecurityCode.trim().length) {
        valid = false;
    }

    return valid;
}

export default function (state = initialState , action) {
    switch (action.type) {
        case UPDATE_CONTACT_DETAILS:
            let newContactState = { ...state.contactDetails };
            newContactState = { ...newContactState, ...action.payload };
            
            return { 
                ...state, 
                contactDetails: newContactState,
                contactDetailsValid: contactDetailsValid(newContactState)
            };

        case UPDATE_DELIVERY_DETAILS:
            let newDeliveryState = { ...state.deliveryDetails };
            newDeliveryState = { ...newDeliveryState, ...action.payload };

            return { 
                ...state, 
                deliveryDetails: newDeliveryState,
                deliveryDetailsValid: deliveryDetailsValid(newDeliveryState)
            };

        case UPDATE_PAYMENT_DETAILS:
            let newPaymentState = { ...state.paymentDetails };
            newPaymentState = { ...newPaymentState, ...action.payload };

            return { 
                ...state, 
                paymentDetails: newPaymentState,
                paymentDetailsValid: paymentDetailsValid(newPaymentState) 
            };

        default:
            return { ...state };
    }
};