// Validation
var isAlpha = /^[a-zA-Z\s]+$/;

function validCName() {
    const cname = document.getElementById('cname').value;
    const errorcName = document.getElementById('error-name');

    if (cname.trim() === '') {
        errorcName.textContent = 'Name is required';
        return false;
    }
    else if (!isAlpha.test(cname)) {
        errorcName.textContent = 'Only use letters, don\'t use digits';
        return false;
    } else {
        errorcName.textContent = '';
        return true;
    }
   
}


var isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validCEmail() {
    const cemail = document.getElementById('cemail').value;
    const errorcEmail = document.getElementById('error-email');

    if (cemail.trim() === '') {
        errorcEmail.textContent = 'Email is required';
        return false;
    }
    else if (!isEmail.test(cemail)) {
        errorcEmail.textContent = 'Email pattern is Invalid';
        return false;
    } else {
        errorcEmail.textContent = '';
        return true;
    }
    
}

function validCQueries() {
    const cQuestion = document.getElementById('question');
    const errorcQuestion = document.getElementById('error-textarea');
    const maxLength = 500; // Maximum character limit
    const currentLength = cQuestion.value.length;
    const quesvalue = cQuestion.value;

    if (quesvalue.trim() === '') {
        errorcQuestion.textContent = 'Queries is required';
        return false;
    }
    // Check if current length exceeds the maximum length
    else if (currentLength >= maxLength) {
        alert("sdfsd")
        errorcQuestion.textContent = 'Maximum character limit reached.';
        cQuestion.value = cQuestion.value.substring(0, maxLength);
        return false;
    } else {
        errorcQuestion.textContent = '';
        return true;
    }


}

// function validCAddtext() {
//     const caddtext = document.getElementById('addtext').value;
//     const errorcAddtext = document.getElementById('error-addtext');

//     if (caddtext.trim() === '') {
//         errorcAddtext.textContent = 'Additional Text is required';
//         return false;
//     } else {
//         errorcAddtext.textContent = '';
//         return true;
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

});

// Reset error messages when changing the country dial code
input.addEventListener('countrychange', reset);

  function validatePhoneNumber() {
    const countryCode = iti.getSelectedCountryData().dialCode;
    const phoneNumber = input.value;
    const errorPhoneNumber = document.getElementById('error-phone');

    if (!iti.isValidNumber()) {
        const errorCode = iti.getValidationError();
        const msg = errorMap[errorCode] || "Invalid number";
        errorPhoneNumber.textContent = msg;
        return false;
    }

    errorPhoneNumber.textContent = '';
    return true;
}
