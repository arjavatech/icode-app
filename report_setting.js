
const apiUrlBase = 'https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/employee';


// Remove Data

function dataRemove(e) {
    document.getElementById("remail").value = "";
    document.getElementById("frequencySelect").value = "";
    document.getElementById("savebtn").value = "";
}

// Create Data

function addEmpdetails() {
    const isValidRdays = validReportdays();
    const isValidEmail = validREmail();

    if (isValidRdays && isValidEmail) {
        const empupdateid = document.getElementById("savebtn").value;
        const empfname = document.getElementById("remail").value;
        const emplname = document.getElementById("frequencySelect").value;
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

// function viewEmpdetails() {
//     const tableBody = document.getElementById("tBody");
//     const apiUrl = `${apiUrlBase}/getall/68f9bafc-2390-11ef-82b6-02d83582ee21`;

//     fetch(apiUrl)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Error: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);
//             data.forEach(element => {
//                 const newRow = document.createElement('tr');
//                 newRow.innerHTML = `
//                 <td class="fName">${element.FName}</td>
//                 <td class="lName">${element.LName}</td>
//                 <td>
//                 <button class="btn icon-button btn-green" onclick="editEmpdetails('${element.EmpID}')" data-bs-toggle="modal" data-bs-target="#myModal"> Edit </button>
//                 <button class="btn icon-button btn-outline-green" onclick="deleteEmpdetails('${element.EmpID}')"> Delete </button>
//                 </td>
//             `;
//                 tableBody.appendChild(newRow);
//             });
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });

// }

// Call fetchData when the page is fully loaded
// document.addEventListener('DOMContentLoaded', viewEmpdetails);

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
var isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validREmail() {
    const remail = document.getElementById('remail').value;
    const errorrEmail = document.getElementById('error-email');

    if (remail.trim() === '') {
        errorrEmail.textContent = 'Email is required';
        return false;
    }
    else if (!isEmail.test(remail)) {
        errorrEmail.textContent = 'Email pattern is Invalid';
        return false;
    } else {
        errorrEmail.textContent = '';
        return true;
    }

}

const select = document.getElementById('frequencySelect');
const errorMsg = document.getElementById('selectError');

function validReportDays() {
    if (select.selectedOptions.length === 0) {
        errorMsg.textContent = 'Please select at least one option.';
        return false;
    } else {
        errorMsg.textContent = '';
        return true;
    }
}

// select.addEventListener('blur', validReportDays);
select.addEventListener('change', validReportDays);

