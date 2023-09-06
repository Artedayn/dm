import { IProduct } from '../typings/interfaces';
export const generateInvoice101 = (info: IProduct) => {
  return `<p>Создан счет для продукта <b>${info.name}</b>(${info.type}) на ${info.interval} месяцев! <a href="${info.bill}commandmentNr=${info.commandmentNr}
    &dateOn=${info.dateOn}&productBillCode=${info.productCode}&productType=${info.productType}&interval=${info.interval}&dateStart=${info.dateStart}
    &dateTo=${info.dateTo}&postfix=${info.postfix}&bitrix=${info.bitrix}&TipID=${info.tipID}&priceName=${info.priceName}&productNewNum=${info.productNewNum}" 
    target="_blank">Распечатать ЭТОТ СЧЕТ (откроется в новом окне)</a></p>`;
};

export const generateInvoice102 = (info: IProduct) => {
  return `<p style='color:orange;'>Предупреждение! Счет НЕ СФОРМИРОВАН для продукта <b>${info.name}</b>(${info.type}) на ${info.interval} месяцев!`;
};

export const generateInvoice103 = (info: IProduct) => {
  return `<p style='color:red;'>ОШИБКА!!! Счет НЕ СФОРМИРОВАН для продукта <b>${info.name}</b>(${info.type}) на ${info.interval} месяцев, НО тем не менее старый счет с идентичными параметрами БЫЛ УДАЛЕН!!!</p>`;
};

export const generateInvoice104 = (info: IProduct) => {
  return `<p style='color:red;'>Вы ввели неверный пароль! Попробуйте еще раз... (при пакетной генерации требуется обновление страницы!)</p>`;
};

// if (myXHR.responseText == "101") {
//     let prodCode = product.code === 0 ? parseInt(document.getElementById("publicationCodeR").value) : product.code;
//     outcome.innerHTML += "<p>Создан счет для продукта <b>" + product.name + "</b> (" + productType.name + ") на " + interval + "месяцев! " +
//         '<a href= "' + getBill() + 'commandmentNr=' + encodeURIComponent(commandmentName.value) +
//         '&dateOn=' + dateOn.value + '&productBillCode=' +  prodCode +
//         '&productType=' + productType.id + '&interval=' + interval + '&dateStart=' + dateStart.value + '&dateTo=' + dateTo.value +
//         '&postfix=' + postfix.value + '&bitrix=' + bitrix.value + '&TipID=' + TipIDValue + '&priceName=' + priceNameVal + '&productNewNum=' + productNewNumber.value +
//         '" target="_blank">Распечатать ЭТОТ СЧЕТ (откроется в новом окне)</a></p>';
// }

// If Error (102)
// if (myXHR.responseText == "102") {
//     outcome.innerHTML += "<p style='color:orange;'>Предупреждение! Счет НЕ СФОРМИРОВАН для продукта <b>" + product.name + "</b> (" +
//         productType.name + ") на " + interval + "месяцев!</p>";

// }

// If Error and old bill removed (103)
// if (myXHR.responseText == "103") {
//     outcome.innerHTML += "<p style='color:red;'>ОШИБКА!!! Счет НЕ СФОРМИРОВАН для продукта <b>" + product.name + "</b> ("
//         + productType.name + ") на " + interval + "месяцев, НО тем не менее старый счет с идентичными параметрами БЫЛ УДАЛЕН!!!</p>";
// }

// // Error 104 - invalid password - Show Error and exit...
// if (myXHR.responseText == "104") {
//     outcome.innerHTML += "<p style='color:red;'>Вы ввели неверный пароль! Попробуйте еще раз... (при пакетной генерации требуется обновление страницы!)</p>";
//     return;
// }
