import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

/** VOICE NOTES **/
function* fetchVoice(action) {
    const fetchVoiceFromId = action.payload.id;
    try {
        const response = yield call(axios.get, `/api/content/voice/${fetchVoiceFromId}`);
        yield put({type:'SET_VOICE_NOTES', payload:response.data});
    } catch(err) {
        console.log('Error in fetch voice (saga):',err);
    };
};

function* uploadVoice(action) {
    try {
        yield call(axios.post, '/api/upload/voice', action.payload)
    } catch(err) {
        console.log('Error in upload voice (sagas)',err);
    };
};

/** PHOTOS **/
function* fetchPhotos(action) {
    try{

    } catch(err) {
        console.log('Error in fetch photos(sagas)',err);
    }
}
/** VIDEOS **/
function* fetchVideos(action) {
    try{

    } catch(err) {
        console.log('Error in fetch videos(sagas)',err);
    }
}
/** LETTERS **/
function* fetchLetters(action) {
    try{

    } catch(err) {
        console.log('Error in fetch letters(sagas)',err);
    }
}
/** CONTENT SAGA **/
function* contentSaga () {
    yield takeLatest('FETCH_VOICE', fetchVoice);
    yield takeLatest('UPLOAD_VOICE', uploadVoice);
    yield takeLatest('FETCH_PHOTOS', fetchPhotos);
    yield takeLatest('FETCH_VIDEOS', fetchVideos);
    yield takeLatest('FETCH_LETTERS', fetchLetters);
};