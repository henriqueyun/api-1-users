const MONGO_ID_LENGTH = 24;
const userFields = ["name", "email", "phone"];

module.exports = {
    isUserValid: (user) => {
        const errors = [];
        if (!userFields.every(field => field in user)) {
            const fields = userFields.join(",").slice(0, -1);
            errors.push(`user must have ${fields}`);
        }

        if (!userFields.every(field => !!user[field])) {
            errors.push("user fields with invalid values");
        }

        return errors;
    },
    isIdValid: (id) => {
        const errors = [];
        if (id.length !== MONGO_ID_LENGTH) {
            errors.push("user id should have 24 characters");
        }
        return errors;
    },
    areChangesValid: (changes) => {
        const errors = [];
        if (!userFields.some(field => changes[field])) {
            errors.push("user changes should not be empty");
        }

        const changeFields = Object.keys(changes);
        if (!changeFields.every(field => userFields.includes(field))) {
            errors.push("user changes should contains only user fields");
        }
        return errors;
    }
};
