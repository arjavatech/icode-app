const cid = localStorage.getItem('companyID');
console.log(cid)


const customerId1 = localStorage.getItem('customId');

console.log(customerId1)
// let image = document.getElementById("img-sty")
async function loadImage() {
    const url = `https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/company/get/${cid}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error creating account: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log(responseData)
        let CLogo = localStorage.getItem("companyLogo");
        console.log(CLogo)
        let readerFile = new FileReader();
        const comLo = responseData.CLogo;
        let image = document.getElementById("logo-img");
        // document.getElementById("imageId").src = comLo;
        console.log(comLo);

        // if (comLo) {
        //     const logoImg = document.getElementById('logo-img');
        //     // logoImg.src = "C:\fakepath\Screenshot 2024-07-12 at 9.53.31 PM.png"; 
        //     logoImg.src = comLo; // Set the logo image source
        //     logoImg.onload = function() {
        //         console.log('Logo image loaded successfully');
        //     };
        //     logoImg.onerror = function() {
        //         console.error('Error loading logo image');
        //     };
        // } else {
        //     console.error('No logo URL found in response data');
        // }

        readerFile.onload = function (comLo) {
            image.src = comLo; // Set the image source to the file's data URL
            image.onload = function () {
                updateApiData();
                console.log('Logo image loaded successfully');
            };
            image.onerror = function () {
                console.error('Error loading logo image');
            };
        };
        readerFile.readAsDataURL(comLo);

    } catch (error) {
        console.error('Error in createAccount function:', error.message);
    }
}



document.addEventListener("DOMContentLoaded", function () {
    loadImage();
    const companyName = localStorage.getItem('companyName');
    const companyAddress = localStorage.getItem('companyAddress');
    const companyLogo = localStorage.getItem('companyLogo');
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const address = localStorage.getItem('address');
    const phone = localStorage.getItem('phone');
    const email = localStorage.getItem('email');
    // Retrieve the company logo from local storage
    // const companyLogo = localStorage.getItem('companyLogo');


    if (companyName) document.getElementById('companyName').value = companyName;
    if (companyAddress) document.getElementById('companyAddress').value = companyAddress;
    if (username) document.getElementById('username').value = username;
    if (password) document.getElementById('password').value = password;
    if (firstName) document.getElementById('fName').value = firstName;
    if (phone) document.getElementById('phoneNumber').value = phone;
    if (lastName) document.getElementById('lName').value = lastName;
    if (address) document.getElementById('address').value = address;
    if (email) document.getElementById('email').value = email;
    if (companyLogo) document.getElementById('logo-img').value = companyLogo;


    document.getElementById('settingsForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting

        // Validation
        let isValid = true;

        if (!validateField('email', 'Invalid email format', /^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            isValid = false;
        }

        if (!validPhoneno()) {
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

            updateApiData();
            document.getElementById('successMsg').innerHTML = 'success fully saved your changes';
            document.getElementById('successMsg').style = "color:green";
            document.getElementById('overlay').style.display = 'flex';
            setTimeout(function () {
                window.location.href = "profile.html";
            }, 3000);
        }
    });

    // const input = document.querySelector("#phoneNumber");
    // const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
    // const iti = window.intlTelInput(input, {
    //     initialCountry: "us",
    //     utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.13/build/js/utils.js"
    // });

    // input.addEventListener('keyup', () => {
    //     resetPhoneError();
    //     if (!input.value.trim()) {
    //         showPhoneError("This field is required");
    //     } else {
    //         const isValid = iti.isValidNumber();
    //         if (!isValid) {
    //             const errorCode = iti.getValidationError();
    //             const msg = errorMap[errorCode] || "Invalid number";
    //             showPhoneError(msg);
    //         }
    //     }
    // });

    // input.addEventListener('countrychange', resetPhoneError);

    // function validatePhoneNumber() {
    //     const errorPhoneNumber = document.getElementById('errorPhoneNumber');
    //     if (!iti.isValidNumber()) {
    //         const errorCode = iti.getValidationError();
    //         const msg = errorMap[errorCode] || "Invalid number";
    //         showPhoneError(msg);
    //         return false;
    //     }
    //     clearPhoneError();
    //     return true;
    // }

    // function showPhoneError(msg) {
    //     const errorPhoneNumber = document.getElementById('errorPhoneNumber');
    //     errorPhoneNumber.innerText = msg;
    //     errorPhoneNumber.classList.remove("hide");
    //     input.classList.add("error");
    // }

    // function clearPhoneError() {
    //     const errorPhoneNumber = document.getElementById('errorPhoneNumber');
    //     errorPhoneNumber.innerText = '';
    //     errorPhoneNumber.classList.add("hide");
    //     input.classList.remove("error");
    // }

    // function resetPhoneError() {
    //     clearPhoneError();
    // }
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

const customerAPIUrlBase = `https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/customer`;
const companyAPIUrlBase = `https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/company`;

function updateApiData() {
    const username = document.getElementById('username').value;
    const companyName = document.getElementById('companyName').value;
    const fname = document.getElementById('fName').value;
    const lname = document.getElementById('lName').value;
    const customerAddress = document.getElementById('address').value;
    const customerPhone = document.getElementById('phoneNumber').value;
    const customerEmail = document.getElementById('email').value;
    const companyAddress = document.getElementById("companyAddress").value;
    let companyLogo = document.getElementById("logo-img").value;
    const password = document.getElementById("password").value;

    companyLogo=localStorage.getItem("imageFile")
    

    console.log("ak")
    
    console.log(companyLogo);
    
    if (!cid || !customerId1) {
        console.error("UUID or CustomerID is missing in localStorage");
        return;
    }

    const customerApiUrl = `${customerAPIUrlBase}/update/${customerId1}`;
    const companyApiUrl = `${companyAPIUrlBase}/update/${cid}`;

    const customerData = {
        CustomerID: customerId1,
        CID: cid,
        FName: fname,
        LName: lname,
        Address: customerAddress,
        PhoneNumber: customerPhone,
        Email: customerEmail,
        IsActive: true
    };

    const companyData = {
        CID: cid,
        UserName: username,
        CName: companyName,
        CAddress: companyAddress,
        CLogo: companyLogo,
        Password: password,
        ReportType: "Weekly"
        // IsActive: true
    };

    Promise.all([
        fetch(customerApiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        }),
        fetch(companyApiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(companyData)
        })
    ])
        .then(responses => {
            return Promise.all(responses.map(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            }));
        })
        .then(data => {
        })
        .catch(error => {
            console.error('Error:', error);
            // outPut.textContent = 'Error updating data.';
        });
}

// 4889996e-0224-4265-a449-9169c6184825

// { CID: 'e57c8b8e-9570-4840-a7d0-7626cc63a340', UserName: 'best', CName: 'nrhbfhjb', CAddress: 'sdc', CLogo: 'sdc', … }
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


// Function to handle file input change event
function handleFileSelect(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('companyLogo').value = input.files[0].name;
            // document.getElementById('companyLogo').value = `<img src = "${input.files[0]}.name" alt="image">`;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// // Function to handle form submission
// document.getElementById('settingsForm').addEventListener('submit', function (e) {
//     e.preventDefault();
//     // Add your form submission logic here
// });

// Function to handle password update
// function updatePassword() {
//     var password = document.getElementById('password').value;
//     // Add your password update logic here
// }

function loadFile(event) {
    const logoImg = document.getElementById('logo-img');
    const file = event.target.files[0];
    localStorage.setItem("imageFile",file);

    if (file) {
        console.log(event.target.files[0]);
        const reader = new FileReader();

        reader.onload = function (e) {
            logoImg.src = e.target.result; // Set the image source to the file's data URL
            logoImg.onload = function () {
                console.log('Logo image loaded successfully');
            };
            logoImg.onerror = function () {
                console.error('Error loading logo image');
            };
        };

        reader.readAsDataURL(file); // Read the file as a data URL
    }
}



