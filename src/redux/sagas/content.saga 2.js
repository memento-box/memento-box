import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

/** CONTENT COUNT **/
function* fetchCount(action) {
    const boxId = action.payload;
    try {
        const response = yield call(axios.get, `/api/content/count/${boxId}`);
        console.log('Saga:',response.data);
        yield put({type:'SET_COUNT', payload:response.data});
    } catch(err) {
        console.log('Error in fetch count (saga):', err);
    };
};

/** VOICE NOTES **/
function* fetchVoice(action) {
    const fetchVoiceFromId = action.payload;
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
/** BOX CONTENT **/
function* fetchContent(action) {
    const box_id = action.payload;
    try{
        yield put({type:'FETCH_VOICE', payload:box_id});
        yield put({type:'FETCH_PHOTOS', payload:box_id});
        yield put({type:'FETCH_VIDEOS', payload:box_id});
        yield put({type:'FETCH_LETTERS', payload:box_id});
    } catch(err) {
        console.log('Error fetching box content(sagas):',err);
    }
}
/** CONTENT SAGA **/
export default function* contentSaga () {
    yield takeLatest('FETCH_VOICE', fetchVoice);
    yield takeLatest('UPLOAD_VOICE', uploadVoice);
    yield takeLatest('FETCH_PHOTOS', fetchPhotos);
    yield takeLatest('FETCH_VIDEOS', fetchVideos);
    yield takeLatest('FETCH_LETTERS', fetchLetters);
    yield takeLatest('FETCH_BOX_CONTENT', fetchContent);
    yield takeLatest('FETCH_COUNT', fetchCount);
};