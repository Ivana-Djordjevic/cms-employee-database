//to ensure user cannot enter a null value
const validateMessage = (answer) => {
    if (!answer) {
        return 'Please enter a value';
    }
    return true;
};

module.exports =  {validateMessage};
