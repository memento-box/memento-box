function thankCollaboratorsReducer(state = [], action) {
    switch (action.type) {
        case 'ADD_COLLABORATOR_THANK_YOU':
            return [...state, action.payload];
        case 'DELETE_COLLABORATOR_THANK_YOU':
            return state.filter(collaborator => collaborator.id !== action.payload);
        default:
            return state;
    }
}

export default thankCollaboratorsReducer;