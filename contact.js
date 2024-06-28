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
        errorcQuestion.textContent = 'Maximum character limit reached.';
        cQuestion.value = cQuestion.value.substring(0, maxLength);
        return false;
    } else {
        errorcQuestion.textContent = '';
        return true;
    }


}

function validatePhoneNumber() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const phoneError = document.getElementById('error-phone');
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


// Function to validate the entire form
function validateForm() {
    const isNameValid = validCName();
    // const isPhoneNumberValid = validatePhoneNumber();
    const isEmailValid = validCEmail();
    const isValidMessage = validCQueries();

    if (isNameValid && isEmailValid && isValidMessage) {
        callContactUsCreateAPiData()
        alert('Your contact information is sent to our support team.');
    } else {
        alert('Please fix the errors in the form');
    }
}

async function callContactUsCreateAPiData() {
    const apiLink = `https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/contact-us/create`;

    const requestID = uuid.v4();
    const cid = localStorage.getItem('companyID');
    const name = document.getElementById("cname").value;
    const requestorEmail = document.getElementById("cemail").value;
    const concernsQuestions = document.getElementById("question").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const status = "pending";

    const userData = {
        RequestID: requestID,
        CID: cid,
        Name: name,
        RequestorEmail: requestorEmail,
        ConcernsQuestions: concernsQuestions,
        PhoneNumber: phoneNumber,
        Status: status
    };

    console.log(userData);

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

        else {
            const data = await response.json();

            if (!data.error) {
                document.getElementById("cname").value = "";
                document.getElementById("cemail").value = "";
                document.getElementById("question").value = "";
                document.getElementById("phoneNumber").value = "";

            }
            else {
                alert(data.error);

            }
        }
        //   console.log(data);
    } catch (error) {
        //   console.error('Error:', error);
    }
}