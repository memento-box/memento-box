import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// GIFT EMAIL TO RECIPIENT: POST REQUEST
function* sendGift(action) {
    try {
        yield axios.post('/api/email/gift');
        
    } catch(error) {
        console.log('sendGift error (email.saga.js)', error);
    };
};

/** EMAIL SAGA **/
function* emailSaga () {
    yield takeLatest('SEND_GIFT', sendGift);
};

export default emailSaga;