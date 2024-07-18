

// // const input = document.querySelector("#phone");
// // const errorMsg = document.querySelector("#error-msg");

// // const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

// // const iti = window.intlTelInput(input, {
// //     initialCountry: "us",
// //     utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.13/build/js/utils.js"
// // });

// // const reset = () => {
// //     input.classList.remove("error");
// //     errorMsg.innerHTML = "";
// //     errorMsg.classList.add("hide");
// // };

// // const showError = (msg) => {
// //     input.classList.add("error");
// //     errorMsg.innerHTML = msg;
// //     errorMsg.classList.remove("hide");
// // };

// // input.addEventListener('keyup', () => {
// //     reset();
// //     if (!input.value.trim()) {
// //         showError("Required");
// //     } else {
// //         const isValid = iti.isValidNumber();
// //         if (!isValid) {
// //             const errorCode = iti.getValidationError();
// //             const msg = errorMap[errorCode] || "Invalid number";
// //             showError(msg);
// //         }
// //     }
// // });

// // // Reset error messages when changing the country dial code
// // input.addEventListener('countrychange', reset);


// const isAlpha = /^[a-zA-Z\s]+$/; // Allow letters and spaces

// function validateFirstName() {
//     const firstName = document.getElementById('firstName').value;
//     const errorFirstName = document.getElementById('errorFirstName');
//     if (firstName.trim() === '') {
//         errorFirstName.textContent = 'First name is required';
//         return false;
//     } else if (!isAlpha.test(firstName)) {
//         errorFirstName.textContent = 'Only use letters and spaces';
//         return false;
//     }
//     errorFirstName.textContent = '';
//     return true;
// }

// function validateLastName() {
//     const lastName = document.getElementById('lastName').value;
//     const errorLastName = document.getElementById('errorLastName');
//     if (lastName.trim() === '') {
//         errorLastName.textContent = 'Last name is required';
//         return false;
//     } else if (!isAlpha.test(lastName)) {
//         errorLastName.textContent = 'Only use letters and spaces';
//         return false;
//     }
//     errorLastName.textContent = '';
//     return true;
// }

// function validateAddress() {
//     const address = document.getElementById('address').value;
//     const errorAddress = document.getElementById('errorAddress');
//     if (address.trim() === '') {
//         errorAddress.textContent = 'Address is required';
//         return false;
//     }
//     errorAddress.textContent = '';
//     return true;
// }

// // function validatePhoneNumber() {
// //     const countryCode = countryCodeSelect.value;
// //     const phoneNumber = document.getElementById('phoneNumber').value;
// //     const errorPhoneNumber = document.getElementById('errorPhoneNumber');

// //     try {
// //         const phoneNumberObj = libphonenumber.parsePhoneNumber(`+${countryCode}${phoneNumber}`);

// //         if (!phoneNumberObj.isValid()) {
// //             throw new Error('Invalid phone number');
// //         }

// //         errorPhoneNumber.textContent = '';
// //         return true;
// //     } catch (error) {
// //         errorPhoneNumber.textContent = 'Invalid phone number format';
// //         return false;
// //     }
// // }

// function validatePhoneNumber() {
//     const countryCode = iti.getSelectedCountryData().dialCode;
//     const phoneNumber = input.value;
//     const errorPhoneNumber = document.getElementById('error-msg');

//     if (!iti.isValidNumber()) {
//         const errorCode = iti.getValidationError();
//         const msg = errorMap[errorCode] || "Invalid number";
//         errorPhoneNumber.textContent = msg;
//         return false;
//     }

//     errorPhoneNumber.textContent = '';
//     return true;
// }

// // function validateCentreName() {
// //     const centreName = document.getElementById('centreName').value;
// //     const errorCentreName = document.getElementById('errorCentreName');
// //     if (centreName.trim() === '') {
// //         errorCentreName.textContent = 'Centre name is required';
// //         return false;
// //     } else if (!isAlpha.test(centreName)) {
// //         errorCentreName.textContent = 'Only use letters and spaces';
// //         return false;
// //     }
// //     errorCentreName.textContent = '';
// //     return true;
// // }

// function validateEmail() {
//     const email = document.getElementById('email').value;
//     const errorEmail = document.getElementById('errorEmail');
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (email.trim() === '') {
//         errorEmail.textContent = 'Email is required';
//         return false;
//     } else if (!emailPattern.test(email)) {
//         errorEmail.textContent = 'Invalid email format';
//         return false;
//     }
//     errorEmail.textContent = '';
//     return true;
// }



// async function validateForm() {
//     const isFirstNameValid = validateFirstName();
//     const isLastNameValid = validateLastName();
//     const isAddressValid = validateAddress();
//     const isPhoneNumberValid = validPhoneno();
//     // const isCentreNameValid = validateCentreName();
//     const isEmailValid = validateEmail();

//     if (isFirstNameValid && isLastNameValid && isAddressValid && isPhoneNumberValid && isEmailValid) {
//         document.querySelector('.progress-bar').style.width = '100%';

//     // const firstName = document.getElementById('firstName').value;
//     // const lastName = document.getElementById('lastName').value;
//     // const address = document.getElementById('address').value;
//     // const phone = document.getElementById('phoneNumber').value;
//     // const email = document.getElementById('email').value;

    
//         //CALL PAYMENT PROCESS 
//         // createCheckoutSession();
//         await createFirstPageSignupAPiData();

//     } else {
//         alert('Please fix the errors in the form');
//     }
// }

// // Check to signup username == another person username so this concept avoid this 
// // async function checkUserExists(username, password, email, phoneNumber) {
// //     const checkUserApiUrl = `${firstSignupPageapiUrlBase}/checkuser`;

// //     const userData = {
// //         username: username,
// //         password: password,
// //         email: email,
// //         phoneNumber: phoneNumber
// //     };

// //     return fetch(checkUserApiUrl, {
// //         method: 'POST',
// //         headers: {
// //             'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify(userData)
// //     })
// //     .then(response => {
// //         if (!response.ok) {
// //             throw new Error(`Error: ${response.status}`);
// //         }
// //         return response.json();
// //     })
// //     .then(data => {
// //         return data.exists; // Assuming your API returns { exists: true/false }
// //     })
// //     .catch(error => {
// //         console.error('Error:', error);
// //         return false;
// //     });
// // }


// // First signup page api call
// // Company details
// // function craeteFirstPageSignupAPiData(){
// //     const firstSignupPageapiUrl = `${firstSignupPageapiUrlBase}/create`;
// //     const cname = localStorage.getItem('companyName');
// //     const clogo = localStorage.getItem('companyLogo');
// //     const caddress = localStorage.getItem('companyAddress');
// //     const username = localStorage.getItem('username');
// //     // const passwordEncrpyt = checkPassword();

// //     // console.log(passwordEncrpyt);
// //     const password = localStorage.getItem('password');

// //     const userData = {
// //         CID: cid, 
// //         CName: cname,
// //         CLogo: clogo,
// //         CAddress: caddress,
// //         UserName: username,
// //         Password: password, 
// //     };

// //     fetch(firstSignupPageapiUrl, {
// //         method: 'POST',
// //         headers: {
// //             'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify(userData)
// //     })
// //     .then(response => {
// //         if (!response.ok) {
// //             throw new Error(`Error: ${response.status}`);
// //         }
// //         return response.json();
// //     })
// //     .then(data => {
// //         if(!data.error){
// //             //Call Customer api
// //             createApiData();
// //         }
// //         console.log(data);
// //     })
// //     .catch(error => {
// //         console.error('Error:', error);
// //     });
// // }



// function validPhoneno() {
//     const input = document.querySelector("#phoneNumber");
//     const phoneError = document.querySelector("#showMsg3");
//     // const employePin = document.getElementById("instructor");
//     const phoneNumber = input.value;

//     // employePin.value = (input.value).substring((input.value).length - 4);

//     const phoneRegex = /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/;

//     if (phoneNumber === "") {
//         phoneError.textContent = 'Enter phone number.';
//         return false;
//     } else if (!phoneRegex.test(phoneNumber)) {
//         phoneError.textContent = 'Invalid phone number.';
//         return false;
//     } else {
//         phoneError.textContent = '';
//         return true;
//     }


// }

// function formatPhoneNumber() {
//     const inputField = document.getElementById('phoneNumber');
//     let value = inputField.value;
//     // Remove all non-digit characters
//     value = value.replace(/\D/g, '');
//     // Format the phone number
//     if (value.length > 3 && value.length <= 6) {
//         value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
//     } else if (value.length > 6) {
//         value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
//     } else if (value.length > 3) {
//         value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
//     }
//     inputField.value = value;
// }


// async function createCheckoutSession() {
//     try {
//         const response = await fetch('http://localhost:3000/create-checkout-session', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({})
//         });

//         if (!response.ok) {
//             const errorDetails = await response.json();
//             throw new Error(errorDetails.error);
//         }

//         const session = await response.json();
//         console.log('Checkout session:', session);
//         const stripe = Stripe('pk_test_51OB8JlIPoM7JHRT2DlaE8KmPRFkgeSXkqf4eQZxEahu0Lbno3vHzCTH5J4rDAfw53PjdWlLteNJNzPVdahkzTb8100DA6sqAp4');
//         await stripe.redirectToCheckout({ sessionId: session.id });
//     } catch (error) {
//         console.error('Error creating checkout session:', error);
//         alert('Failed to create checkout session: ' + error.message);
//     }
// }

// // API link 


// async function createFirstPageSignupAPiData() {
// const cid = uuidv4(); // Use uuidv4 to generate a UUID

// const firstSignupPageapiUrlBase = `https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/company`;
//   const firstSignupPageapiUrl = `${firstSignupPageapiUrlBase}/create`;
//   const cname = localStorage.getItem('companyName');
//   const clogo = localStorage.getItem('companyLogo');
//   const caddress = localStorage.getItem('companyAddress');
//   const username = localStorage.getItem('username');

//   const passwordEncrypted = await checkPassword();

//   const userData = {
//     CID: cid,
//     CName: cname,
//     CLogo: clogo,
//     CAddress: caddress,
//     UserName: username,
//     Password: passwordEncrypted,
//   };
//   console.log(userData);

//   console.log('Sending user data to first signup page API:', userData);

//   try {
//     const response = await fetch(firstSignupPageapiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(userData)
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} - ${data.error}`);
//     } else {
//       console.log('Response from first signup page API:', data);

//       if (!data.error) {
//         await createApiData();
//       } else {
//         console.error('API Error:', data.error);
//       }
//     }
//   } catch (error) {
//     console.error('Error in createFirstPageSignupAPiData:', error);
//   }
// }

// async function encrypt(data, key) {
//   const iv = crypto.randomBytes(12);
//   const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
//   let encrypted = cipher.update(data, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   const tag = cipher.getAuthTag().toString('hex');

//   const encryptedDataWithIV = `${iv.toString('hex')}:${encrypted}:${tag}`;
//   return encryptedDataWithIV;
// }

// const key = crypto.randomBytes(32);
// localStorage.setItem('key', key.toString('hex'));

// async function checkPassword() {
//   const password = localStorage.getItem('password');
//   try {
//     const encryptedPassword = await encrypt(password, key);
//     return encryptedPassword;
//   } catch (error) {
//     console.error('Error in checkPassword:', error);
//   }
// }

// async function createApiData() {
//     const apiUrlBase = 'https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/customer';
//   const customerId = uuidv4();
//   const apiUrl = `${apiUrlBase}/create`;
//   const firstName = localStorage.getItem("firstName");
//   const lastName = localStorage.getItem("lastName");
//   const address = localStorage.getItem("address");
//   const phone = localStorage.getItem("phoneNumber");
//   const email = localStorage.getItem("email");

//   const userData = {
//     CustomerID: customerId.toString(),
//     CID: cid,
//     FName: firstName,
//     LName: lastName,
//     Address: address,
//     PhoneNumber: phone,
//     Email: email,
//     IsActive: true
//   };

//   console.log('Sending user data to customer API:', userData);

//   try {
//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(userData)
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} - ${data.error}`);
//     }

//     console.log('Response from customer API:', data);
//   } catch (error) {
//     console.error('Error in createApiData:', error);
//   }
// }


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
    const isPhoneNumberValid = validPhoneno();
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
    const phone = document.getElementById('phoneNumber').value;
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
    console.log(userData);
  
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
      console.error('Error:', error);
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
    const phone = document.getElementById("phoneNumber").value;
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
            window.location.href = "index.html"; 
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


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
            // session.id. 
        } catch (error) {
            console.error('Error creating checkout session:', error);
            alert('Failed to create checkout session: ' + error.message);
        }
    }
    