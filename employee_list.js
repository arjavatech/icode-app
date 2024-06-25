
const apiUrlBase = 'https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/employee';


// Remove Data

function dataRemove(e) {
    document.getElementById("instructor").value = "";
    document.getElementById("fName").value = "";
    document.getElementById("lName").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("savebtn").value = "";
}

// Create Data

function addEmpdetails() {
    const isValidFName = validFName();
    const isValidLName = validLName();
    const isValidPhoneNumber = validatePhoneNumber();
    // const isvalidInstructerPin = validateInstructerPin();

    if (isValidFName && isValidLName && isValidPhoneNumber) {
        const empupdateid = document.getElementById("savebtn").value;
        const empfname = document.getElementById("fName").value;
        const emplname = document.getElementById("lName").value;
        const empphoneno = document.getElementById("phoneNumber").value;
        const empinst = document.getElementById("instructor").value;
        const empactive = true;
        // const empid = "68f9bafc-2390-11ef-82b6-02d83582ee24";
        const empid = 'eid_' + Math.random().toString(36).substr(2, 12);
        const empcid = "68f9bafc-2390-11ef-82b6-02d83582ee21";

        if (empupdateid == "") {
            const apiUrl = `${apiUrlBase}/create`;

            // console.log(uEmpid);
            // return false;


            // let outPut = document.getElementById("resmsg");

            const employeeObject = {
                EmpID: empid,
                CID: empcid,
                FName: empfname,
                LName: emplname,
                IsActive: empactive,
                PhoneNumber: empphoneno,
                Pin: empinst
            };
            console.log(employeeObject);

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeeObject)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    if (data.error) {
                        document.querySelector(".e-msg").textContent = data.error;
                        $(".error-msg").show();
                        setTimeout(function () {
                            $(".error-msg").hide();
                            window.location.href = "employee_list.html";
                        }, 3000);
                    } else {
                        document.querySelector(".s-msg").textContent = data.message;
                        $(".success-msg").show();
                        setTimeout(function () {
                            $(".success-msg").hide();
                            window.location.href = "employee_list.html";
                        }, 3000);
                    }

                })
                .catch(error => {
                    console.error('Error:', error);
                    // outPut.textContent = 'Error creating data.';
                });
        } else {
            const apiUrl = `${apiUrlBase}/update/${empupdateid}`;

            const updateEmployeeObject = {
                EmpID: empid,
                CID: empcid,
                FName: empfname,
                LName: emplname,
                IsActive: empactive,
                PhoneNumber: empphoneno,
                Pin: empinst
            };
            console.log(updateEmployeeObject);

            fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateEmployeeObject)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    if (data.error) {
                        document.querySelector(".e-msg").textContent = data.error;
                        $(".error-msg").show();
                        setTimeout(function () {
                            $(".error-msg").hide();
                            window.location.href = "employee_list.html";
                        }, 3000);
                    } else {
                        document.querySelector(".s-msg").textContent = data.message;
                        $(".success-msg").show();
                        setTimeout(function () {
                            $(".success-msg").hide();
                            window.location.href = "employee_list.html";
                        }, 3000);
                    }

                })
                .catch(error => {
                    console.error('Error:', error);
                    // outPut.textContent = 'Error creating data.';
                });
        }

    }
    else {
        alert('Please fix the errors in the form');
    }
}


// View Data

function viewEmpdetails() {
    const tableBody = document.getElementById("tBody");
    const apiUrl = `${apiUrlBase}/getall/68f9bafc-2390-11ef-82b6-02d83582ee21`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            data.forEach(element => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                <td class="fName">${element.FName}</td>
                <td class="lName">${element.LName}</td>
                <td class="instructor">${element.Pin}</td>
                <td class="phoneNumber">${element.PhoneNumber}</td>
                <td>
                <button class="btn icon-button btn-green" onclick="editEmpdetails('${element.EmpID}')" data-bs-toggle="modal" data-bs-target="#myModal"> Edit </button>
                <button class="btn icon-button btn-outline-green" onclick="deleteEmpdetails('${element.EmpID}')"> Delete </button>
                </td>
            `;
                tableBody.appendChild(newRow);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

// Call fetchData when the page is fully loaded
document.addEventListener('DOMContentLoaded', viewEmpdetails);

// Edit Data

function editEmpdetails(emId) {
    const apiUrl = `${apiUrlBase}/get/` + emId;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            data.forEach(formvalue => {
                document.getElementById("instructor").value = formvalue.Pin;
                document.getElementById("fName").value = formvalue.FName;
                document.getElementById("lName").value = formvalue.LName;
                document.getElementById("phoneNumber").value = formvalue.PhoneNumber;
                document.getElementById("savebtn").value = formvalue.EmpID;
            });

        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Delete Data

function deleteEmpdetails(emId) {

    const apiUrl = `${apiUrlBase}/delete/${emId}`;

    fetch(apiUrl, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.error) {
                document.querySelector(".e-msg").textContent = data.error;
                $(".error-msg").show();
                setTimeout(function () {
                    $(".error-msg").hide();
                    window.location.href = "employee_list.html";
                }, 3000);
            } else {
                document.querySelector(".s-msg").textContent = data.message;
                $(".success-msg").show();
                setTimeout(function () {
                    $(".success-msg").hide();
                    window.location.href = "employee_list.html";
                }, 3000);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            ;
        });
}



// Validation
var isAlpha = /^[a-zA-Z\s]+$/;

function validFName() {
    const fname = document.getElementById('fName').value;
    const errorFName = document.getElementById('showMsg1');
    if (fname.trim() === '') {
        errorFName.textContent = 'First name is required';
        return false;
    }
    else if (!isAlpha.test(fname)) {
        errorFName.textContent = 'Only use letters, don\'t use digits';
        return false;
    }
    errorFName.textContent = '';
    return true;
}


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
    employePin.value = (input.value).substring((input.value).length - 4);
    // console.log((input.value).substring((input.value).length - 4));
});

// Reset error messages when changing the country dial code
input.addEventListener('countrychange', reset);

function validLName() {
    const lname = document.getElementById('lName').value;
    const errorLName = document.getElementById('showMsg2');
    if (lname.trim() === '') {
        errorLName.textContent = 'Last name is required';
        return false;
    }
    else if (!isAlpha.test(lname)) {
        errorLName.textContent = 'Only use letters, don\'t use digits';
        return false;
    }
    errorLName.textContent = '';
    return true;
}

function validatePhoneNumber() {
    const countryCode = iti.getSelectedCountryData().dialCode;
    const phoneNumber = input.value;
    const errorPhoneNumber = document.getElementById('showMsg3');


    if (!iti.isValidNumber()) {
        const errorCode = iti.getValidationError();
        const msg = errorMap[errorCode] || "Invalid number";
        errorPhoneNumber.textContent = msg;
        return false;
    }

    errorPhoneNumber.textContent = '';
    return true;
}


function validateInstructerPin() {
    const instructerPin = document.getElementById('instructor').value;
    const errorInstructerPin = document.getElementById('showMsg');
    if (instructerPin.trim() === '') {
        errorInstructerPin.textContent = 'Instructer pin is required';
        return false;
    }
    // else if(isAlpha.test(instructerPin)){
    //     errorInstructerPin.textContent = 'Only use digits, don\'t use letters';
    //   return false;
    // }
    errorInstructerPin.textContent = '';
    return true;
}

