// Function to validate company name
var isAlpha = /^[a-zA-Z\s]+$/;

function validateCompanyName() {
  const companyName = document.getElementById('companyName').value;
  const errorCompanyName = document.getElementById('errorCompanyName');
  console.log(isAlpha.test(companyName))
  if (companyName.trim() === '') {
      errorCompanyName.textContent = 'Company name is required';
      return false;
  }
  else if(!isAlpha.test(companyName)){
    errorCompanyName.textContent = 'Only use letters, don\'t use digits';
    return false;
  }
  errorCompanyName.textContent = '';
  return true;
}

// Function to validate company logo
function validateCompanyLogo() {
  const companyLogo = document.getElementById('companyLogo').value;
  const errorCompanyLogo = document.getElementById('errorCompanyLogo');
  if (companyLogo.trim() === '') {
      errorCompanyLogo.textContent = 'Company logo is required';
      return false;
  }
  errorCompanyLogo.textContent = '';
  return true;
}

// Function to validate company address
function validateCompanyAddress() {
  const companyAddress = document.getElementById('companyAddress').value;
  const errorCompanyAddress = document.getElementById('errorCompanyAddress');
  if (companyAddress.trim() === '') {
      errorCompanyAddress.textContent = 'Company address is required';
      return false;
  }
  errorCompanyAddress.textContent = '';
  return true;
}

// Function to validate username
function validateUsername() {
  const username = document.getElementById('username').value;
  const errorUsername = document.getElementById('errorUsername');
  if (username.trim() === '') {
      errorUsername.textContent = 'Username is required';
      return false;
  }
  else if(!isAlpha.test(username)){
    errorUsername.textContent = 'Only use letters, don\'t use digits';
    return false;
  }
  errorUsername.textContent = '';
  return true;
}

// Function to validate password
function validatePassword() {
  const password = document.getElementById('password').value;
  const errorPassword = document.getElementById('errorPassword');
  console.log(password.length);
  if (password.trim() === '') {
      errorPassword.textContent = 'Password is required';
      return false;
  }
  else if(!password.length === 8) {
    errorPassword.textContent = 'Password must be atleast 8 characters';
    return false;
  }
  errorPassword.textContent = '';
  return true;
}


// Function to validate the entire form
function validateForm() {
  const isCompanyNameValid = validateCompanyName();
  const isCompanyLogoValid = validateCompanyLogo();
  const isCompanyAddressValid = validateCompanyAddress();
  const isUsernameValid = validateUsername();
  const isPasswordValid = validatePassword();

  if (isCompanyNameValid && isCompanyLogoValid && isCompanyAddressValid && isUsernameValid && isPasswordValid) {
    document.querySelector('.progress-bar').style.width = '50%';
    // Simulate a delay for the progress bar
    setTimeout(() => {
      window.location.href = "signup2.html"; 
    }, 1000);
  } else {
      alert('Please fix the errors in the form');
  }
}
