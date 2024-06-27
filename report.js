
const apiUrlBase = 'https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/dailyreport/getdatebasedata';

// View Data

function viewEmpdetails(dateValue) {
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

            try
            {
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
                    tableBody.appendChild(newRow);
                    
                });
                
            }
            catch
            {
                alert("No Data Found");
            }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    
}

// Call fetchData when the page is fully loaded
document.addEventListener('DOMContentLoaded', viewEmpdetails("test"));


document.getElementById('dailyReportDate').addEventListener('change', function () {
    const dateValue = this.value;
    // Call fetchData when the page is fully loaded
    document.addEventListener('DOMContentLoaded', viewEmpdetails(dateValue));
});