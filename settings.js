document.addEventListener("DOMContentLoaded", function() {
    const companyName = localStorage.getItem('companyName');
    const companyAddress = localStorage.getItem('companyAddress');
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const address = localStorage.getItem('address');
    const phone = localStorage.getItem('phone');
    const email = localStorage.getItem('email');

    if (companyName) document.getElementById('companyName').value = companyName;
    if (companyAddress) document.getElementById('companyAddress').value = companyAddress;
    if (username) document.getElementById('username').value = username;
    if (password) document.getElementById('password').value = password;
    if (firstName) document.getElementById('fName').value = firstName;
    if (phone) document.getElementById('phoneNumber').value = phone;
    if (lastName) document.getElementById('lName').value = lastName;
    if (address) document.getElementById('address').value = address;
    if (email) document.getElementById('email').value = email;

    document.getElementById('settingsForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Validation
        let isValid = true;

        if (!validateField('email', 'Invalid email format', /^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            isValid = false;
        }

        if (!validatePhoneNumber()) {
            isValid = false;
        }

        if (!validateField('fName', 'Only use letters and spaces', /^[a-zA-Z\s]+$/)) {
            isValid = false;
        }

        if (!validateField('lName', 'Only use letters and spaces', /^[a-zA-Z\s]+$/)) {
            isValid = false;
        }

        if (!validatePassword()) {
            isValid = false;
        }

        if (isValid) {
            // Save data to localStorage
            localStorage.setItem('companyName', document.getElementById('companyName').value);
            localStorage.setItem('companyAddress', document.getElementById('companyAddress').value);
            localStorage.setItem('username', document.getElementById('username').value);
            localStorage.setItem('password', document.getElementById('password').value);
            localStorage.setItem('firstName', document.getElementById('fName').value);
            localStorage.setItem('lastName', document.getElementById('lName').value);
            localStorage.setItem('address', document.getElementById('address').value);
            localStorage.setItem('phone', document.getElementById('phoneNumber').value);
            localStorage.setItem('email', document.getElementById('email').value);

            alert('Settings saved successfully!');
        }
    });

    const input = document.querySelector("#phoneNumber");
    const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
    const iti = window.intlTelInput(input, {
        initialCountry: "us",
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.13/build/js/utils.js"
    });

    input.addEventListener('keyup', () => {
        resetPhoneError();
        if (!input.value.trim()) {
            showPhoneError("This field is required");
        } else {
            const isValid = iti.isValidNumber();
            if (!isValid) {
                const errorCode = iti.getValidationError();
                const msg = errorMap[errorCode] || "Invalid number";
                showPhoneError(msg);
            }
        }
    });

    input.addEventListener('countrychange', resetPhoneError);

    function validatePhoneNumber() {
        const errorPhoneNumber = document.getElementById('errorPhoneNumber');
        if (!iti.isValidNumber()) {
            const errorCode = iti.getValidationError();
            const msg = errorMap[errorCode] || "Invalid number";
            showPhoneError(msg);
            return false;
        }
        clearPhoneError();
        return true;
    }

    function showPhoneError(msg) {
        const errorPhoneNumber = document.getElementById('errorPhoneNumber');
        errorPhoneNumber.innerText = msg;
        errorPhoneNumber.classList.remove("hide");
        input.classList.add("error");
    }

    function clearPhoneError() {
        const errorPhoneNumber = document.getElementById('errorPhoneNumber');
        errorPhoneNumber.innerText = '';
        errorPhoneNumber.classList.add("hide");
        input.classList.remove("error");
    }

    function resetPhoneError() {
        clearPhoneError();
    }
});

function validateField(id, errorMessage, pattern) {
    const value = document.getElementById(id).value;
    const errorField = document.getElementById('error' + id.charAt(0).toUpperCase() + id.slice(1));
    if (value.trim() === '') {
        showError(document.getElementById(id), 'This field is required');
        return false;
    } else if (!pattern.test(value)) {
        showError(document.getElementById(id), errorMessage);
        return false;
    }
    clearError(document.getElementById(id));
    return true;
}

function validatePassword() {
    const password = document.getElementById('password').value;
    const errorPassword = document.getElementById('errorPassword');
    if (password.trim() === '') {
        showError(document.getElementById('password'), 'Password is required');
        return false;
    } else if (password.length < 8) {
        showError(document.getElementById('password'), 'Password must be at least 8 characters');
        return false;
    }
    clearError(document.getElementById('password'));
    return true;
}

function showError(input, message) {
    clearError(input);
    let error = document.createElement('span');
    error.className = 'error';
    error.innerText = message;
    input.parentElement.appendChild(error);
}

function clearError(input) {
    let error = input.parentElement.querySelector('.error');
    if (error) {
        error.remove();
    }
}