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

export default function (state = initialState , action) {
    
    switch (action.type) {
        case UPDATE_CONTACT_DETAILS:
            let newContactState = { ...state.contactDetails };
            newContactState = { ...newContactState, ...action.payload };
            
            return { ...state, contactDetails: newContactState };

        case UPDATE_DELIVERY_DETAILS:
            let newDeliveryState = { ...state.deliveryDetails };
            newDeliveryState = { ...newDeliveryState, ...action.payload };

            return { ...state, deliveryDetails: newDeliveryState };

        case UPDATE_PAYMENT_DETAILS:
            let newPaymentState = { ...state.paymentDetails };
            newPaymentState = { ...newPaymentState, ...action.payload };

            return { ...state, paymentDetails: newPaymentState };

        default:
            return { ...state };
    }
};