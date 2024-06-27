
const apiUrlBase = 'https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/dailyreport/getdatebasedata';


function viewCurrentDateReport() {
    const tableBody3 = document.getElementById("current-checkin-tbody");
    const heading = document.getElementById("current-checkin-date");
    tableBody3.innerHTML = '';
    const date = new Date().toJSON().slice(0, 10);

    heading.innerHTML = `Current Check-in ${date}`;
    const apiUrl = `${apiUrlBase}/${date}`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            try {
                data.forEach(element => {
                    const newRow = document.createElement('tr');
                    if (element.CheckOutTime == null) {
                        newRow.innerHTML = `
                <td class="Name">${element.Name}</td>
                <td class="Pin">${element.Pin}</td>
                <td class="Type">${element.Type}</td>
                <td class="CheckInTime">${element.CheckInTime}</td>
                <td>
            <div class="text-center">
                <input type="datetime-local" id="datetime" name="datetime" class="datetime-input">
                <div class="calendar-icon" onclick="openDateTimePicker();"></div>
            </div>
        </td>
        <td class="text-center">
        <button type="button" class="btn btn-green float-end" id="check_out">Check-out</button>
        </td>
            `;
                        tableBody3.appendChild(newRow);
                    }
                    else {
                        const newRow = document.createElement('tr');
                        newRow.innerHTML = `
                        <td colspan="6" class="text-center">No Records Found</td>
                    `;
                        tableBody3.innerHTML = '';
                        tableBody3.appendChild(newRow);
                    }

                });

            }
            catch {
                // alert("No Data Found");
                // console.log(apiUrl);

            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}



// View Data

function viewDatewiseReport(dateValue) {
    const tableBody = document.getElementById("tBody");
    tableBody.innerHTML = '';

    if (dateValue != "test") {
        const apiUrl = `${apiUrlBase}/${dateValue}`;
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {

                try {
                    data.forEach(element => {
                        const newRow = document.createElement('tr');
                        if (element.CheckOutTime == null) {
                            newRow.innerHTML = `
                    <td class="Name">${element.Name}</td>
                    <td class="Pin">${element.Pin}</td>
                    <td class="Type">${element.Type}</td>
                    <td class="CheckInTime">${element.CheckInTime}</td>
                    <td class="CheckOutTime">${element.CheckOutTime}</td>
                    <td class="TimeWorked">${element.TimeWorked}</td>
                `;
                            tableBody.appendChild(newRow);
                        }

                    });

                }
                catch {
                    // alert("No Data Found");
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td colspan="6" class="text-center">No Records Found</td>
                    `;
                    tableBody.appendChild(newRow);

                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    else {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
    <td colspan="6" class="text-center">No Date choosen</td>
`;
        tableBody.innerHTML = '';
        tableBody.appendChild(newRow);

    }

}

//Report page(Range wise)
function viewDateRangewiseReport(startValue, endvalue) {
    const tableBody2 = document.getElementById("tBody2");
    tableBody2.innerHTML = '';

    if (endvalue != "test") {
        const apiUrl = `${apiUrlBase}/${endvalue}`;
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {

                try {
                    data.forEach(element => {
                        const newRow = document.createElement('tr');
                        newRow.innerHTML = `
                <td class="Name">${element.Name}</td>
                <td class="Pin">${element.Pin}</td>
                <td class="Type">${element.Type}</td>
                <td class="CheckInTime">${element.CheckInTime}</td>
                <td class="CheckOutTime">${element.CheckOutTime}</td>
                <td class="TimeWorked">${element.TimeWorked}</td>
            `;
                        tableBody2.appendChild(newRow);

                    });

                }
                catch {
                    // alert("No Data Found");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    else {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
    <td colspan="6" class="text-center">No Date choosen</td>
`;
        tableBody2.innerHTML = '';
        tableBody2.appendChild(newRow);

    }

}
// Call fetchData when the page is fully loaded
document.addEventListener('DOMContentLoaded', viewCurrentDateReport());
document.addEventListener('DOMContentLoaded', viewDatewiseReport("test"));
document.addEventListener('DOMContentLoaded', viewDateRangewiseReport("test","test"));

document.getElementById('dailyReportDate').addEventListener('change', function () {
    const dateValue = this.value;
    document.addEventListener('DOMContentLoaded', viewDatewiseReport(dateValue));
});

// Report page(Range wise)
document.getElementById('dateFrom').addEventListener('change', function () {
    const dateFromValue = this.value;
    document.getElementById('dateTo').addEventListener('change', function () {
        const dateTo = this.value
        document.addEventListener('DOMContentLoaded', viewDateRangewiseReport(dateFromValue, dateTo));
    });
});

//Current check in datas


// const data = {
//     currentCheckinDate: `Current Check-in ${day}-${month}-${year}`,
//     // pendingCheckoutDate: "Pending Check-out [23-05-2024]",
//     currentCheckins: [
//         { name: "John Doe", id: "2345", type: "Belt", checkinTime: "2024-05-24 11:10:23" },
//         { name: "Doe", id: "2315", type: "Belt", checkinTime: "2024-05-24 12:10:23" },
//         { name: "Alex", id: "2340", type: "Belt", checkinTime: "2024-05-24 14:10:23" },
//         { name: "Martin", id: "2390", type: "Belt", checkinTime: "2024-05-24 16:10:23" }
//     ]
//     // pendingCheckouts: [
//     //     { name: "Martin", id: "2390", checkinTime: "2024-05-23 16:10:23" }
//     // ]
// };

// document.getElementById("current-checkin-date").textContent = data.currentCheckinDate;
// const currentCheckinTbody = document.getElementById("current-checkin-tbody");

// function createRow(person) {
//     const tr = document.createElement("tr");

//     tr.innerHTML = `
//         <td>${person.name}</td>
//         <td>${person.id}</td>
//         <td>${person.type}</td>
//         <td>${person.checkinTime}</td>
//         <td>
//             <div class="text-center">
//                 <input type="datetime-local" id="datetime" name="datetime" class="datetime-input">
//                 <div class="calendar-icon" onclick="openDateTimePicker();"></div>
//             </div>
//         </td>
//         <td><button type="button" class="btn btn-green float-end" id="check_out">Check-out</button></td>
//     `;

//     return tr;
// }

// data.currentCheckins.forEach(person => {
//     currentCheckinTbody.appendChild(createRow(person));
// });