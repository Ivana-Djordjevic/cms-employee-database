//to view console logs on cyan blue
function cyanBlueText(text) {
    console.log('\x1b[36m%s\x1b[0m', text);
};

module.exports = cyanBlueText;
  