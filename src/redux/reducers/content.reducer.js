
const initialState = {
    photos:[],
    videos:[],
    letters:[],
    voiceNotes:[],
};

const contentReducer = (state={...initialState}, action) => {
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

export default contentReducer;