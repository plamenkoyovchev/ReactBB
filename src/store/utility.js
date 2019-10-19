export const updateObject = (state, valuesToUpdate) => {
    return {
        ...state,
        ...valuesToUpdate
    };
};