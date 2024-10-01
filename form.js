let firstName = document.getElementById("fname");
let lastName = document.getElementById("lname");
let email = document.getElementById("email");
let phoneNumber = document.getElementById("phone");
let whatsApp = document.getElementById("whatsapp");
let address = document.getElementById("address");
let subject = document.getElementById("sub");
let message = document.getElementById("msg");

async function actionFun() {
    let isFirstNameValid = validName(document.getElementById("errorMsgFName"), firstName);
    let isLastNameValid = validName(document.getElementById("errorMsgLName"), lastName);
    let isValidEmail = validateEmail();
    let isValidatePhone = validatePhone(phoneNumber, document.getElementById("phoneError"));
    let isValidateWhatsApp = validatePhone(whatsApp, document.getElementById("whatsAppError"));
    let addressField = checkRequired(document.getElementById("addErr"), address);
    let subjectField = checkRequired(document.getElementById("subErr"), subject)
    let msgField = checkRequired(document.getElementById("msgErr"), message)

    if (isFirstNameValid && isLastNameValid
        && isValidEmail && isValidatePhone
        && isValidateWhatsApp && addressField && subjectField && msgField) {
            const apiLink = `https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/web_contact_us/create`;

            const userData = {
                FirstName: firstName.value, 
                LastName: lastName.value, 
                Email: email.value,
                WhatsappNumber: whatsApp.value, 
                Subject: subject.value, 
                PhoneNumber: phoneNumber.value, 
                Address: address.value,
                Message: message.value
            };
        
            try {
                const response = await fetch(apiLink, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });
        
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
        
                const data = await response.json();

                const modalElement = document.getElementById('addEntryModal');
                const modalInstance = new bootstrap.Modal(modalElement);
                modalInstance.show();
        
                if (!data.error) {
                    firstName.value = "";
                    lastName.value = "";
                    email.value = "";
                    phoneNumber.value = "";
                    whatsApp.value = "";
                    subject.value = "";
                    address.value = "";
                    message.value = "";
                }
            } catch (error) {
                console.error('Error:', error);
            }
    }
}

var isAlpha = /^[a-zA-Z\s]+$/;

// IsAlpha check
function validName(errorElement, inputElement) {
    if (inputElement.value.trim() === '') {
        errorElement.textContent = 'Name is required';
        return false;
    } else if (!isAlpha.test(inputElement.value)) {
        errorElement.textContent = 'Only use letters, don\'t use digits';
        return false;
    }
    errorElement.textContent = '';
    return true;
}

function validateEmail() {
    const email = document.getElementById('email').value;
    const errorEmail = document.getElementById('EmailError');
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

function formatPhoneNumber(id) {
    const inputField = document.getElementById(id);
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

function validatePhone(inputElement, errorElement) {
    const pNumber = inputElement.value;
    const phoneRegex = /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/;

    if (pNumber === "") {
        errorElement.textContent = 'This is required field';
        return false;
    } else if (!phoneRegex.test(pNumber)) {
        errorElement.textContent = 'Invalid phone number format';
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}


function checkRequired(errorElement, inputElement) {
    if (inputElement.value.trim() === '') {
        errorElement.textContent = 'This is required field';
        return false;
    }
    errorElement.textContent = '';
    return true;
}


document.getElementById("subButton").addEventListener('click', actionFun);
