async function selectDropDownByValue (elm, value) {
  await  elm.all(by.css('option[value="' + value.toString() + '"]')).click();
    
}
exports.selectDropDownByValue = selectDropDownByValue;

async function randomNumber (min, max) {
return Math.floor(Math.random() * (max - min)) + min
}
exports.randomNumber = randomNumber;