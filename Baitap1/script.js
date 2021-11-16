const specialCharacter = /\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\-|\+|\=|\{|\[|\}|\]|\||\\|\:|\;|\"|\'|\<|\,|\>|\.|\?|\//;
const reader = new FileReader();

// function reset 
function functionReset() {
    document.getElementById("formR").reset();
    location.reload();
}

// alert refuse
function refuse(inputName, labelName) {
    labelName.innerHTML = "&#8861;";
    labelName.style.color = "red";
    inputName.style.border = "1px solid red";
}

// alert agree
function agree(inputName, labelName) {
    labelName.innerHTML = "&checkmark;";
    labelName.style.color = "lightgreen";
    inputName.style.border = "1px solid lightgreen";
}

//function load image
function convertImg(image) {
    const imageUpload = document.getElementById(image);
    reader.addEventListener("load", function () {
        // convert image file to base64 string
        imageUpload.src = reader.result;
    }, false);
}
function imageLoad() {
    const titleImg = document.getElementsByClassName("centered")[0];
    const imgLoad = document.getElementById("imgLoad").files[0];
    const image = convertImg("imageUpload");
    reader.readAsDataURL(imgLoad);
    titleImg.style.display = "none";
}

//check email
function checkEmail() {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let inputEmail = document.getElementById("inputEmail");
    let emailAlert = document.getElementById("emailAlert");
    let checkRegex = regexEmail.test(inputEmail.value);

    if (checkRegex) {
        agree(inputEmail, emailAlert);
        return true;
    } else {
        refuse(inputEmail, emailAlert);
        return false;
    }
}

//function check date
function checkDate() {
    const regexDate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    let inputDate = document.getElementById("inputDate");
    let dateAlert = document.getElementById("dateAlert");
    let checkDate = regexDate.test(inputDate.value);

    if (checkDate) {
        agree(inputDate, dateAlert);
        return true;
    } else {
        refuse(inputDate, dateAlert);
        return false;
    }

}
//function check input name
function checkInputName() {
    const lowercaseRegex = /[a-z]|á|à|ạ|ã|ả|ă|ắ|ằ|ẳ|ặ|ẵ|â|ấ|ầ|ẫ|ẩ|ậ|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ể|ễ|ệ|ì|í|ĩ|ị|ỉ|ò|ó|ỏ|õ|ọ|ô|ố|ồ|ộ|ổ|ỗ|ơ|ớ|ờ|ở|ợ|ỡ|ú|ù|ủ|ụ|ũ|ư|ứ|ừ|ữ|ử|ự|ý|ỳ|ỹ|ỵ|ỷ|đ/g;
    const uppercaseRegex = /[A-Z]|Á|À|Ạ|Ã|Ả|Ă|Ắ|Ằ|Ẳ|Ặ|Ẵ|Â|Ấ|Ầ|Ẫ|Ẩ|Ậ|É|È|Ẽ|Ẻ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ|Ì|Í|Ĩ|Ị|Ỉ|Ò|Ó|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ộ|Ổ|Ỗ|Ơ|Ớ|Ờ|Ở|Ợ|Ỡ|Ú|Ù|Ủ|Ụ|Ũ|Ư|Ứ|Ừ|Ữ|Ử|Ự|Ý|Ỳ|Ỹ|Ỵ|Ỷ|Đ/g;
    const findNumber = /[0-9]/g;
    let inputName = document.getElementById("inputName");
    let alertName = document.getElementById("alertName");
    var text = inputName.value.trim();
    var checkValue;

    if (inputName.value == "") {
        inputName.style.border = "1px solid red";
        alertName.innerHTML = "&#8861;";
        alertName.style.color = "red";
        return false;
    } else {
        for (let i = 0; i < text.length; i++) {
            if (text[i] != /\s/g && text[i] == text[i].match(findNumber) || text[i] == text[i].match(specialCharacter)) {
                checkValue = "false";
                break;
            } else { checkValue = "true"; }
        }
        if (checkValue == "false") {
            refuse(inputName, alertName);
            return false;
        } else {
            agree(inputName, alertName);

            text = text.toLowerCase();
            text = text.slice(0, 1).toUpperCase() + text.slice(1, text.length);
            for (let i = 0; i < text.length; i++) {
                if (text[i] == " " && text[i + 1] != " ") {
                    text = text.replace(
                        text[i] + text[i + 1],
                        text[i] + text[i + 1].toUpperCase()
                    );
                }
                if (text[i] == " " && text[i + 1] != lowercaseRegex) {
                    text = text.replace(text[i], "");
                    i--;
                }
            }
            const x = text.match(uppercaseRegex);
            const array = text.split(uppercaseRegex);
            let array2 = "";
            for (var i = 0; i < text.length; i++) {
                if (text[i] == text[i].toUpperCase()) {
                    array2 += text[i];
                }
            }
            array3 = array2.split("");
            var newarray = "";
            for (let i = 0; i < array2.length; i++) {
                newarray = newarray + array[i] + " " + array3[i];
            }
            newarray += array[array.length - 1];
            inputName.value = newarray.trim();
            return true;
        }
    }
}

// check phone number 
function checkPhone() {
    let inputPhone = document.getElementById("inputPhone");
    let alertPhone = document.getElementById("alertPhone");

    if (inputPhone.value[0] != 0 || inputPhone.value.length != 10) {
        refuse(inputPhone, alertPhone);
        return false;
    } else {
        agree(inputPhone, alertPhone);
        return true;
    }
}

//check pass 
function checkPass() {
    const regexPass = /^[\W](?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}|$/;
    let passWord = document.getElementById("passWord");
    let alertPassword = document.getElementById("alertPassword");
    let testPass = regexPass.test(passWord.value);
    let checkCharacter = passWord.value.search(specialCharacter);

    if (testPass && checkCharacter != -1) {
        agree(passWord, alertPassword);
        return true;
    } else {
        refuse(passWord, alertPassword);
        return false;
    }
}

//comfirm password
function comfirmPassword() {
    let passWord = document.getElementById("passWord");
    let comfirm = document.getElementById("comfirmPass");
    let comfirmAlert = document.getElementById("comfirmAlert");
    var valuePass = passWord.value;
    var valueComfirm = comfirm.value;

    if (comfirm.value != "") {
        if (valuePass == valueComfirm) {
            agree(comfirm, comfirmAlert);
            return true;
        } else {
            refuse(comfirm, comfirmAlert);
            return false;
        }
    } else {
        refuse(comfirm, comfirmAlert);
        return false;
    }
}

//function Button Add
function addData() {
    const titleImg = document.getElementsByClassName('centered')[1];
    let inputData = document.getElementsByClassName("inputData");
    let data = document.getElementsByClassName("data");
    let imgAdd = document.getElementById("imageAdd");
    let labelAlert = document.getElementsByClassName("labelAlert");
    const checkName = checkInputName().toString();
    const checkMail = checkEmail().toString();
    const checkDatetime = checkDate().toString();
    const checkPassword = checkPass().toString();
    const checkComfirm = comfirmPassword().toString();

    if (checkName == "false" || checkMail == "false" || checkDatetime == "false" || checkPassword == "false" || checkComfirm == "false") {
        for (let i = 0; i < labelAlert.length; i++) {
            if (inputData[i].value == "") {
                labelAlert[i].style.color = "red";
                labelAlert[i].innerHTML = "Chưa nhập.";
                inputData[i].style.border = "1px solid red";
            }
        }
    } else {
        btnAdd.disabled = false;
        imgAdd.src = reader.result;
        if (imgAdd.src == reader.result) {
            titleImg.style.display = "none";
        }
        for (let i = 0; i < data.length; i++) {
            if (i == 2) {
                data[i].innerHTML = inputData[i].value.slice(0, 3) + "-" + inputData[i].value.slice(3, 6) + "-" + inputData[i].value.slice(6);
            } else {
                data[i].innerHTML = inputData[i].value;
            }
        }
    }
}

//press keyboard shift, delete
document.onkeyup = function (e) {
    const shiftButton = "Shift";
    const deleteButton = 46;

    switch (e.which) {
        case shiftButton:
            addData();
            break;
        case deleteButton:
            functionReset();
            break;
    }
}
