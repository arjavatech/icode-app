
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
    const isValidPhoneNumber = validPhoneno();
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
        // const empcid = "68f9bafc-2390-11ef-82b6-02d83582ee21";
        const empcid = localStorage.getItem('companyID');

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
                        }, 1000);
                    } else {
                        document.querySelector(".s-msg").textContent = data.message;
                        $(".success-msg").show();
                        setTimeout(function () {
                            $(".success-msg").hide();
                            window.location.href = "employee_list.html";
                        }, 1000);
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
                        }, 1000);
                    } else {
                        document.querySelector(".s-msg").textContent = data.message;
                        $(".success-msg").show();
                        setTimeout(function () {
                            $(".success-msg").hide();
                            window.location.href = "employee_list.html";
                        }, 1000);
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
    const company_id = localStorage.getItem('companyID');
    console.log(company_id);
    const apiUrl = `${apiUrlBase}/getall/${company_id}`;

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
                }, 1000);
            } else {
                document.querySelector(".s-msg").textContent = data.message;
                $(".success-msg").show();
                setTimeout(function () {
                    $(".success-msg").hide();
                    window.location.href = "employee_list.html";
                }, 1000);
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

function validPhoneno() {
    const input = document.querySelector("#phoneNumber");
    const phoneError = document.querySelector("#showMsg3");
    const employePin = document.getElementById("instructor");
    const phoneNumber = input.value;

    employePin.value = (input.value).substring((input.value).length - 4);

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
