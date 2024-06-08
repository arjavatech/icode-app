const input = document.querySelector("#phone");
const errorMsg = document.querySelector("#error-msg");

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


const isAlpha = /^[a-zA-Z\s]+$/; // Allow letters and spaces

function validateFirstName() {
    const firstName = document.getElementById('firstName').value;
    const errorFirstName = document.getElementById('errorFirstName');
    if (firstName.trim() === '') {
        errorFirstName.textContent = 'First name is required';
        return false;
    } else if (!isAlpha.test(firstName)) {
        errorFirstName.textContent = 'Only use letters and spaces';
        return false;
    }
    errorFirstName.textContent = '';
    return true;
}

function validateLastName() {
    const lastName = document.getElementById('lastName').value;
    const errorLastName = document.getElementById('errorLastName');
    if (lastName.trim() === '') {
        errorLastName.textContent = 'Last name is required';
        return false;
    } else if (!isAlpha.test(lastName)) {
        errorLastName.textContent = 'Only use letters and spaces';
        return false;
    }
    errorLastName.textContent = '';
    return true;
}

function validateAddress() {
    const address = document.getElementById('address').value;
    const errorAddress = document.getElementById('errorAddress');
    if (address.trim() === '') {
        errorAddress.textContent = 'Address is required';
        return false;
    }
    errorAddress.textContent = '';
    return true;
}

// function validatePhoneNumber() {
//     const countryCode = countryCodeSelect.value;
//     const phoneNumber = document.getElementById('phoneNumber').value;
//     const errorPhoneNumber = document.getElementById('errorPhoneNumber');

//     try {
//         const phoneNumberObj = libphonenumber.parsePhoneNumber(`+${countryCode}${phoneNumber}`);

//         if (!phoneNumberObj.isValid()) {
//             throw new Error('Invalid phone number');
//         }

//         errorPhoneNumber.textContent = '';
//         return true;
//     } catch (error) {
//         errorPhoneNumber.textContent = 'Invalid phone number format';
//         return false;
//     }
// }


function validateCentreName() {
    const centreName = document.getElementById('centreName').value;
    const errorCentreName = document.getElementById('errorCentreName');
    if (centreName.trim() === '') {
        errorCentreName.textContent = 'Centre name is required';
        return false;
    } else if (!isAlpha.test(centreName)) {
        errorCentreName.textContent = 'Only use letters and spaces';
        return false;
    }
    errorCentreName.textContent = '';
    return true;
}

function validateEmail() {
    const email = document.getElementById('email').value;
    const errorEmail = document.getElementById('errorEmail');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
        errorEmail.textContent = 'Email is required';
        return false;
    } else if (!emailPattern.test(email)) {
        errorEmail.textContent = 'Invalid email format';
        return false;
    }
    errorEmail.textContent = '';
    return true;
}

function validateForm() {
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isAddressValid = validateAddress();
    const isPhoneNumberValid = validatePhoneNumber();
    const isCentreNameValid = validateCentreName();
    const isEmailValid = validateEmail();

    if (isFirstNameValid && isLastNameValid && isAddressValid && isPhoneNumberValid && isCentreNameValid && isEmailValid) {
        document.querySelector('.progress-bar').style.width = '100%';
        alert('Form is valid. Proceeding to payment.');
    } else {
        alert('Please fix the errors in the form');
    }
}
