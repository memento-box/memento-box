import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// GIFT EMAIL TO RECIPIENT: POST REQUEST
function* sendGift(action) {
    console.log('in sendGift (email.saga.js)');
    console.log('payload:', action.payload);
    try {
        console.log('in try');
        yield axios.post('/api/email/gift', action.payload);
    } catch(error) {
        console.log('sendGift error (email.saga.js)', error);
    };
};

/** EMAIL SAGA **/
function* emailSaga () {
    yield takeLatest('SEND_GIFT', sendGift);
};

export default emailSaga;