//import { promise } from 'protractor';

async function selectDropDownByValue (elm, value) {
  await  elm.all(by.css('option[value="' + value.toString() + '"]')).click();
    
}
exports.selectDropDownByValue = selectDropDownByValue;

async function randomNumber (min, max) {
return Math.floor(Math.random() * (max - min)) + min
}
exports.randomNumber = randomNumber;


// async function isClickable(el) {
//     return new promise.Promise(resolve => {
//       let interval = setInterval(() => {
//         el.click().then(() => {
//           clearInterval(interval);
//           setTimeout(() => {
//             resolve(true);
//           }, 500);
//         }, () => { });
//       }, 100);
//     });
//   }
//   exports.isClickable = isClickable;