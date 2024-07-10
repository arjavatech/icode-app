

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

// API link 
// Signup second page link
const apiUrlBase = 'https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/customer';
// UUID => cid
// const cid = localStorage.getItem('uuid');
// const signupPageCustomerId = localStorage.getItem('customerId');
const cid = uuid.v4();
// const cid = '68f9bafc-2390-11ef-82b6-02d83582ee22';
// Signup first page link
const firstSignupPageapiUrlBase = `https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/company`;

async function validateForm() {
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isAddressValid = validateAddress();
    const isPhoneNumberValid = validatePhoneNumber();
    // const isCentreNameValid = validateCentreName();
    const isEmailValid = validateEmail();

    if (isFirstNameValid && isLastNameValid && isAddressValid && isPhoneNumberValid && isEmailValid) {
        document.querySelector('.progress-bar').style.width = '100%';

        // const username = localStorage.getItem('username');
        // const password = localStorage.getItem('password');

        // const userExists = await checkUserExists(username, password);

        // if (userExists) {
        //     alert('Username and password already exist');
        //     return;
        // }
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

        // localStorage.setItem('firstName', firstName);
        // localStorage.setItem('lastName', lastName);
        // localStorage.setItem('address', address);
        // localStorage.setItem('phone', phone);   
        // localStorage.setItem('email', email);

        //COMPANY API CALL
        craeteFirstPageSignupAPiData();
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


async function craeteFirstPageSignupAPiData() {
    const firstSignupPageapiUrl = `${firstSignupPageapiUrlBase}/create`;
    const cname = localStorage.getItem('companyName');
    const clogo = localStorage.getItem('companyLogo');
    const caddress = localStorage.getItem('companyAddress');
    const username = localStorage.getItem('username');
  
    // Call the asynchronous checkPassword function to get the encrypted password
    const passwordEncrypted = await checkPassword();
  
    const userData = {
      CID: cid,
      CName: cname,
      CLogo: clogo,
      CAddress: caddress,
      UserName: username,
      Password: passwordEncrypted,
    };
  
    try {
      const response = await fetch(firstSignupPageapiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      else{
      const data = await response.json();
  
      if (!data.error) {
        // Call Customer api
        createApiData();

            setTimeout(() => {
                window.location.href = "index.html"; 
            }, 1000);        
      }
      else{
        alert(data.error);
        setTimeout(() => {
            window.location.href = "singup.html"; 
          }, 100);
      }
    }
    //   console.log(data);
    } catch (error) {
    //   console.error('Error:', error);
    }
  }

//Create encrypt datas

async function encrypt(data, key) {
    // Convert data to ArrayBuffer (required by Web Crypto API)
    const dataBuffer = new TextEncoder().encode(data);
  
    // Import the encryption key (assuming it's already generated)
    const algorithm = { name: 'AES-GCM', iv: generateRandomBytes(12) }; // 12 bytes for IV
    const importedKey = await window.crypto.subtle.importKey(
      'raw', key, algorithm, false, ['encrypt']
    );
  
    // Encrypt the data
    const encryptedData = await window.crypto.subtle.encrypt(
      algorithm, importedKey, dataBuffer
    );
  
    // Combine IV and encrypted data (concatenate into a single ArrayBuffer)
    const iv = algorithm.iv;
    const encryptedDataWithIV = new Uint8Array(iv.byteLength + encryptedData.byteLength);
    encryptedDataWithIV.set(iv);
    encryptedDataWithIV.set(new Uint8Array(encryptedData), iv.byteLength);
  
    // Convert the combined buffer to Base64 for easier storage/transmission
    return btoa(String.fromCharCode(...new Uint8Array(encryptedDataWithIV)));
  }



// Helper function to generate random bytes for IV
function generateRandomBytes(length) {
    const randomValues = new Uint8Array(length);
    window.crypto.getRandomValues(randomValues);
    return randomValues;
}

// Generate a random key for encryption/decryption (should be stored securely)
const key = new Uint8Array([16, 147, 220, 113, 166, 142, 22, 93, 241, 91, 13, 252, 112, 122, 119, 95]);
localStorage.setItem('key',key);

//Create encrypt data in password
async function checkPassword() {
    const password = localStorage.getItem('password');
    // const output = document.getElementById('output');

    try {
        // Encrypt the password
        const encryptedPassword = await encrypt(password, key);

        // Decrypt the password
        // const decryptedPassword = await decrypt(encryptedPassword, key);
        // console.log('Decrypted Password:', decryptedPassword);
        
        return encryptedPassword.toString();
        // Display the encrypted and decrypted passwords
        // output.textContent = `Encrypted Password: ${encryptedPassword}\nDecrypted Password: ${decryptedPassword}`;
    } catch (error) {
        console.error('Error:', error);
        // output.textContent = 'Error processing the password.';
    }
}
//CUSTOMER
// Push the Data in database
function createApiData() {
    const customerId = uuid.v4();
    // document.getElementById('uuid').innerText = myUUID;
    const apiUrl = `${apiUrlBase}/create`;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    // const centreName = document.getElementById("centreName").value;

    const userData = {
        CustomerID: customerId.toString(), // Example value
        CID: cid, // Example value
        FName: firstName,
        LName: lastName,
        Address: address,
        PhoneNumber: phone,
        // centername: centreName,
        Email: email,
        IsActive: true // Assuming this field is required and should be set to true
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
