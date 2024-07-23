import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// GET DATA FOR EMAIL POST ON LOAD OF PREVIEWSEND

function* fetchEmailDetails(action) {
    try {
      // Get the details:
      const boxId = action.payload;
      console.log(boxId);
      const detailsResponse = yield axios.get(`/api/email/${boxId}`);
      yield put({ type: 'SET_EMAIL_DETAILS', payload: detailsResponse.data })
    } catch (error) {
      console.log('fetchEmailDetails error (email.saga.js', error);
    }
  }

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
    yield takeLatest('FETCH_EMAIL_DETAILS', fetchEmailDetails);
};

export default emailSaga;