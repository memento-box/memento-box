import { combineReducers } from 'redux';

const initialState = {
    photos:[],
    videos:[],
    letters:[],
    voiceNotes:[],
};

const initialCountState = {
    photos:0,
    videos:0,
    letters:0,
    voiceNotes:0,
}

const itemReducer = (state={...initialState}, action) => {
    let content = action.payload;
    switch (action.type) {
        case 'SET_PHOTOS':
            return {...state, photos:content};
        case 'SET_VIDEOS':
            return {...state, videos:content}
        case 'SET_LETTERS':
            return {...state, letters:content};
        case 'SET_VOICE_NOTES':
            return {...state, voiceNotes:content};
        default:
            return state;
    }
};

const countReducer = (state ={...initialCountState}, action) => {
    
    switch (action.type) {
        case 'SET_COUNT':
            console.log(action.payload[0]);
            const {photo, video, letter, voice} = action.payload[0].result;
            return {...state, photos:photo, videos:video, letters:letter, voiceNotes:voice};
        default:
            return state;
    }
}
const contentReducer = combineReducers({
    item:itemReducer,
    count:countReducer,
})

export default contentReducer;