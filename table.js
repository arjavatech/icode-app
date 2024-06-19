var currentRow;

function addRowAndValue() {
    const isValidFName = validFName();
    const isValidLName = validLName();
    const isValidPhoneNumber = validatePhoneNumber();
    // const isvalidInstructerPin = validateInstructerPin();
    if(isValidFName && isValidLName && isValidPhoneNumber){
    if (currentRow) {
        updateRow();
        currentRow = null;
    } else {
        var tableBody = document.getElementById("tBody");
        var newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td class="instructor"></td>
            <td class="fName"></td>
            <td class="lName"></td>
            <td class="phoneNumber"></td>
            <td>
                <button class="btn bg-white icon-button" onclick="deleteRow(this)"><i class="fa fa-trash trash" aria-hidden="true"></i></button>
                <button class="btn bg-white icon-button" onclick="editRow(this)" data-toggle="modal" data-target="#myModal"><i class="fa fa-pencil pen" aria-hidden="true"></i></button>
            </td>
        `;

        tableBody.appendChild(newRow);
        newRow.querySelector(".instructor").innerHTML = document.getElementById("instructor").value;
        newRow.querySelector(".fName").innerHTML = document.getElementById("fName").value;
        newRow.querySelector(".lName").innerHTML = document.getElementById("lName").value;
        newRow.querySelector(".phoneNumber").innerHTML = document.getElementById("phoneNumber").value;
    }

    // Clear the input fields after adding/updating a row
    document.getElementById("instructor").value = '';
    document.getElementById("fName").value = '';
    document.getElementById("lName").value = '';
    document.getElementById("phoneNumber").value = '';
}
else{
    alert('Please fix the errors in the form');
}
}

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function editRow(button) {
    currentRow = button.parentNode.parentNode;
    document.getElementById("instructor").value = currentRow.querySelector(".instructor").innerText;
    document.getElementById("fName").value = currentRow.querySelector(".fName").innerText;
    document.getElementById("lName").value = currentRow.querySelector(".lName").innerText;
    document.getElementById("phoneNumber").value = currentRow.querySelector(".phoneNumber").innerText;
}

function updateRow() {
    if (currentRow) {
        currentRow.querySelector(".instructor").innerText = document.getElementById("instructor").value;
        currentRow.querySelector(".fName").innerText = document.getElementById("fName").value;
        currentRow.querySelector(".lName").innerText = document.getElementById("lName").value;
        currentRow.querySelector(".phoneNumber").innerText = document.getElementById("phoneNumber").value;
    }
}
// Validation
var isAlpha = /^[a-zA-Z\s]+$/;

function validFName() {
  const fname = document.getElementById('fName').value;
  const errorFName = document.getElementById('showMsg1');
  if (fname.trim() === '') {
    errorFName.textContent = 'First name is required';
      return false;
  }
  else if(!isAlpha.test(fname)){
    errorFName.textContent = 'Only use letters, don\'t use digits';
    return false;
  }
  errorFName.textContent = '';
  return true;
}

// const isAlpha = str => /^[a-zA-Z]*$/.test(str);
// function validFName(fname) {
//     if (!isAlpha(fname.value)) {
//         document.getElementById("showMsg1").innerHTML = "This is dont use digit";
//     }
//     else {
//         document.getElementById("showMsg1").innerHTML = "";
//     }
// }

const input = document.querySelector("#phoneNumber");
const errorMsg = document.querySelector("#showMsg3");
const employePin = document.getElementById("instructor");

const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

const iti = window.intlTelInput(input, {
    initialCountry: "us",
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.13/build/js/utils.js"
});

const reset = () => {
    input.classList.remove("error");
    errorMsg.innerHTML = "";
    errorMsg.classList.add("hide");
};

const showError = (msg) => {
    input.classList.add("error");
    errorMsg.innerHTML = msg;
    errorMsg.classList.remove("hide");
};

input.addEventListener('keyup', () => {
    reset();
    if (!input.value.trim()) {
        showError("Required");
    } else {
        const isValid = iti.isValidNumber();
        if (!isValid) {
            const errorCode = iti.getValidationError();
            const msg = errorMap[errorCode] || "Invalid number";
            showError(msg);
        }
    }
    employePin.value = (input.value).substring((input.value).length - 4);
    console.log((input.value).substring((input.value).length - 4));
});

// Reset error messages when changing the country dial code
input.addEventListener('countrychange', reset);

function validLName() {
    const lname = document.getElementById('lName').value;
    const errorLName = document.getElementById('showMsg2');
    if (lname.trim() === '') {
        errorLName.textContent = 'Last name is required';
        return false;
    }
    else if(!isAlpha.test(lname)){
        errorLName.textContent = 'Only use letters, don\'t use digits';
      return false;
    }
    errorLName.textContent = '';
    return true;
  }

  function validatePhoneNumber() {
    const countryCode = iti.getSelectedCountryData().dialCode;
    const phoneNumber = input.value;
    const errorPhoneNumber = document.getElementById('showMsg3');
    

    if (!iti.isValidNumber()) {
        const errorCode = iti.getValidationError();
        const msg = errorMap[errorCode] || "Invalid number";
        errorPhoneNumber.textContent = msg;
        return false;
    }

    errorPhoneNumber.textContent = '';
    return true;
}


// function validateInstructerPin(){
//     const instructerPin = document.getElementById('instructor').value;
//     const errorInstructerPin = document.getElementById('showMsg');
//     if (instructerPin.trim() === '') {
//         errorInstructerPin.textContent = 'Instructer pin is required';
//         return false;
//     }
//     else if(isAlpha.test(instructerPin)){
//         errorInstructerPin.textContent = 'Only use digits, don\'t use letters';
//       return false;
//     }
//     errorInstructerPin.textContent = '';
//     return true;
// }