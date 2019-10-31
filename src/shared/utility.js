export const updateObject = (state, valuesToUpdate) => {
    return {
        ...state,
        ...valuesToUpdate
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return isValid;
    }

    if (rules.required) {
        isValid = isValid && value && value.trim() !== '';
    }

    if (rules.minLength) {
        isValid = isValid && value.length >= rules.minLength;
    }

    if (rules.maxLength) {
        isValid = isValid && value.length <= rules.maxLength;
    }

    return isValid;
};