
$('#sendDataBtn').on('click', function () {
    let currentMsgVal = $('#currentText').val().split(''); // массив с исходным сообщением
    let secretMsgVal = $('#secretMessage').val().split('');// массив со встраеваемым сообщением
    transformMsg(currentMsgVal);
    transformMsg(secretMsgVal);
    console.log("Исходное сообщение:" + currentMsgVal);
    console.log("Встраиваемое сообщение:" + secretMsgVal);
    $('#resultText').val(createResultMsg(injectMsg(currentMsgVal, secretMsgVal)).join('')) ; // вывод результата в поле "Результат"
})

let transformMsg = (currentMsgVal) => { // преобразование символов в двоичную систему

    $.each(currentMsgVal, function (i, val) {

        if (currentMsgVal[i] == " ") {
            currentMsgVal[i] = "00000001";
        } else {
            currentMsgVal[i] = (val.charCodeAt() - 1070).toString(2);

            while (currentMsgVal[i].length < 8) {
                currentMsgVal[i] = '0' + currentMsgVal[i];
            }
        }
    })

}

let injectMsg = (currentMsgVal, secretMsgVal) => { //встраивание сообщения
    let counter = 0;
    let newMsg = [];
    secretMsgVal.forEach(item => {

        let str1 = item.charAt(0) + item.charAt(1);
        let str2 = item.charAt(2) + item.charAt(3);
        let str3 = item.charAt(4) + item.charAt(5);
        let str4 = item.charAt(6) + item.charAt(7);
        currentMsgVal[counter * 4] = currentMsgVal[counter * 4].substr(0, 6) + str1;
        currentMsgVal[1 + counter * 4] = currentMsgVal[1 + counter * 4].substr(0, 6) + str2;
        currentMsgVal[2 + counter * 4] = currentMsgVal[2 + counter * 4].substr(0, 6) + str3;
        currentMsgVal[3 + counter * 4] = currentMsgVal[3 + counter * 4].substr(0, 6) + str4;
        counter++;

    })

    return currentMsgVal;
}

let createResultMsg = (binaryResultMsg) => { // приведение нового сообщения к буквенному виду
    let i = 0;
    binaryResultMsg.forEach(item => {
        let counter = 0;
        for (let i = 0; i < item.length; i++) {
            if (item.charAt(i) != '1') {
               counter++;
            }else {
                break;
            }
        }
        if(counter == 8) {
            binaryResultMsg[i] = " ";
        }else {
            item = parseInt((item.substr(counter,8)),2);
            binaryResultMsg[i] = transformNumbersToLetters(item);
        }       
        i++;
    })
    return binaryResultMsg;

}

let transformNumbersToLetters = (item) => {
    return String.fromCharCode(item+1070);
}