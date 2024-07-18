

// const input = document.querySelector("#phone");
// const errorMsg = document.querySelector("#error-msg");

// const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

// const iti = window.intlTelInput(input, {
//     initialCountry: "us",
//     utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.13/build/js/utils.js"
// });

// const reset = () => {
//     input.classList.remove("error");
//     errorMsg.innerHTML = "";
//     errorMsg.classList.add("hide");
// };

// const showError = (msg) => {
//     input.classList.add("error");
//     errorMsg.innerHTML = msg;
//     errorMsg.classList.remove("hide");
// };

// input.addEventListener('keyup', () => {
//     reset();
//     if (!input.value.trim()) {
//         showError("Required");
//     } else {
//         const isValid = iti.isValidNumber();
//         if (!isValid) {
//             const errorCode = iti.getValidationError();
//             const msg = errorMap[errorCode] || "Invalid number";
//             showError(msg);
//         }
//     }
// });

// // Reset error messages when changing the country dial code
// input.addEventListener('countrychange', reset);


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

function validatePhoneNumber() {
    const countryCode = iti.getSelectedCountryData().dialCode;
    const phoneNumber = input.value;
    const errorPhoneNumber = document.getElementById('error-msg');

    if (!iti.isValidNumber()) {
        const errorCode = iti.getValidationError();
        const msg = errorMap[errorCode] || "Invalid number";
        errorPhoneNumber.textContent = msg;
        return false;
    }

    errorPhoneNumber.textContent = '';
    return true;
}

// function validateCentreName() {
//     const centreName = document.getElementById('centreName').value;
//     const errorCentreName = document.getElementById('errorCentreName');
//     if (centreName.trim() === '') {
//         errorCentreName.textContent = 'Centre name is required';
//         return false;
//     } else if (!isAlpha.test(centreName)) {
//         errorCentreName.textContent = 'Only use letters and spaces';
//         return false;
//     }
//     errorCentreName.textContent = '';
//     return true;
// }

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



async function validateForm() {
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isAddressValid = validateAddress();
    const isPhoneNumberValid = validPhoneno();
    // const isCentreNameValid = validateCentreName();
    const isEmailValid = validateEmail();

    if (isFirstNameValid && isLastNameValid && isAddressValid && isPhoneNumberValid && isEmailValid) {
        document.querySelector('.progress-bar').style.width = '100%';

    // const firstName = document.getElementById('firstName').value;
    // const lastName = document.getElementById('lastName').value;
    // const address = document.getElementById('address').value;
    // const phone = document.getElementById('phoneNumber').value;
    // const email = document.getElementById('email').value;

    
        //CALL PAYMENT PROCESS 
        createCheckoutSession();

    } else {
        alert('Please fix the errors in the form');
    }
}

// Check to signup username == another person username so this concept avoid this 
// async function checkUserExists(username, password, email, phoneNumber) {
//     const checkUserApiUrl = `${firstSignupPageapiUrlBase}/checkuser`;

//     const userData = {
//         username: username,
//         password: password,
//         email: email,
//         phoneNumber: phoneNumber
//     };

//     return fetch(checkUserApiUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userData)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`Error: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         return data.exists; // Assuming your API returns { exists: true/false }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         return false;
//     });
// }


// First signup page api call
// Company details
// function craeteFirstPageSignupAPiData(){
//     const firstSignupPageapiUrl = `${firstSignupPageapiUrlBase}/create`;
//     const cname = localStorage.getItem('companyName');
//     const clogo = localStorage.getItem('companyLogo');
//     const caddress = localStorage.getItem('companyAddress');
//     const username = localStorage.getItem('username');
//     // const passwordEncrpyt = checkPassword();

//     // console.log(passwordEncrpyt);
//     const password = localStorage.getItem('password');

//     const userData = {
//         CID: cid, 
//         CName: cname,
//         CLogo: clogo,
//         CAddress: caddress,
//         UserName: username,
//         Password: password, 
//     };

//     fetch(firstSignupPageapiUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userData)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`Error: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         if(!data.error){
//             //Call Customer api
//             createApiData();
//         }
//         console.log(data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }



function validPhoneno() {
    const input = document.querySelector("#phoneNumber");
    const phoneError = document.querySelector("#showMsg3");
    // const employePin = document.getElementById("instructor");
    const phoneNumber = input.value;

    // employePin.value = (input.value).substring((input.value).length - 4);

    const phoneRegex = /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/;

    if (phoneNumber === "") {
        phoneError.textContent = 'Enter phone number.';
        return false;
    } else if (!phoneRegex.test(phoneNumber)) {
        phoneError.textContent = 'Invalid phone number.';
        return false;
    } else {
        phoneError.textContent = '';
        return true;
    }


}

function formatPhoneNumber() {
    const inputField = document.getElementById('phoneNumber');
    let value = inputField.value;
    // Remove all non-digit characters
    value = value.replace(/\D/g, '');
    // Format the phone number
    if (value.length > 3 && value.length <= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else if (value.length > 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length > 3) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }
    inputField.value = value;
}


async function createCheckoutSession() {
    try {
        const response = await fetch('http://localhost:3000/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(errorDetails.error);
        }

        const session = await response.json();
        console.log('Checkout session:', session);
        const stripe = Stripe('pk_test_51OB8JlIPoM7JHRT2DlaE8KmPRFkgeSXkqf4eQZxEahu0Lbno3vHzCTH5J4rDAfw53PjdWlLteNJNzPVdahkzTb8100DA6sqAp4');
        await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        alert('Failed to create checkout session: ' + error.message);
    }
}