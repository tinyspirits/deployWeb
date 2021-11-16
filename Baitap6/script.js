function selectAll() { //chọn tất cả row
    const check = document.getElementById("selectAllRow");
    const checkValue = document.getElementsByClassName("checkboxInput");

    for (let i = 0; i < checkValue.length; i++) {
        if (check.checked == true) {
            checkValue[i].checked = true;
        } else {
            checkValue[i].checked = false;
        }
    }
}

//check validate
const nameRegex = /([A-Za-z_]|[<br>])$/gi;
const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})|[<br>])$/;

function checkValidate(regex, text) {
    if (regex.test(text) == true) {
        return true;
    }
    return false;
}

//function Add
function addRow() {
    const check = document.getElementById("selectAllRow");
    const titleRow = document.getElementsByClassName("titleRow");
    const createRow = document.createElement("TR");
    const createRowTd = document.createElement("TD");

    for (let i = 0; i <= titleRow.length; i++) { // lấy tới cuối mảng
        if (i == 0) {
            let inputTag = document.createElement("INPUT");
            createRow.appendChild(createRowTd);
            createRowTd.appendChild(inputTag);
            inputTag.setAttribute("class", "checkboxInput");
            inputTag.type = "checkbox";
            if (check.checked == true) {
                inputTag.checked = true;
            }
        } else {
            let createRowTd = document.createElement("TD");
            createRowTd.innerHTML = "";
            createRow.appendChild(createRowTd);
            console.log(titleRow[i - 1].innerHTML);
            createRowTd.addEventListener("dblclick", edit);
            createRowTd.addEventListener('focusout', (event) => {
                if (titleRow[i - 1].innerHTML == "Name") {
                    if (checkValidate(nameRegex, createRowTd.innerHTML) == false) {
                        alert("Chưa nhập đúng định dạng");
                        createRowTd.innerHTML = "";
                    }
                }
                if ((titleRow[i - 1].innerHTML == "Phone")) {
                    if (checkValidate(phoneRegex, createRowTd.innerHTML) == false) {
                        alert("Chưa nhập đúng định dạng");
                        createRowTd.innerHTML = "";
                    }
                }
                if ((titleRow[i - 1].innerHTML == "Email")) {
                    if (checkValidate(emailRegex, createRowTd.innerHTML) == false) {
                        alert("Chưa nhập đúng định dạng");
                        createRowTd.innerHTML = "";
                    }
                }
                createRowTd.contentEditable = false;
            });

            if (i == titleRow.length) {
                let createButton = document.createElement("input");
                createButton.type = "submit";
                createButton.setAttribute("class", "deleteButton");

                createButton.onclick = function () {
                    const deleteButton = document.getElementsByClassName("deleteButton");

                    for (let i = 0; i < deleteButton.length; i++) {
                        createRow.setAttribute("id", ("delete" + i));
                        document.getElementById("delete" + i).remove();
                        break;
                    }
                }
                createButton.value = "Delete";
                createRowTd.appendChild(createButton);
            }
            function edit() {
                if (i == titleRow.length) {
                    createRowTd.contentEditable = false;
                } else {
                    createRowTd.contentEditable = true;
                    createRowTd.focus();
                }
            }
        }
    }
    document.getElementById("tableData").appendChild(createRow);
}

//function Delete
function deleteRow() {
    const check = document.getElementById("selectAllRow");
    const checkboxInput = document.getElementsByClassName("checkboxInput");

    for (let i = 0; i < checkboxInput.length; ++i) {
        if (checkboxInput[i].checked == true) {
            document.getElementById("tableData").deleteRow(i + 1);
            check.checked = false;
            i--;
        } else {
            check.checked = false;
        }
    }
}
