
const apiUrlBase = 'https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/dailyreport/getdatebasedata';

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".nav-button");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            buttons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });
});

function viewCurrentDateReport() {
    const tableBody3 = document.getElementById("current-checkin-tbody");
    const heading = document.getElementById("current-checkin-date");
    tableBody3.innerHTML = '';
    // Get the current date
    const now = new Date();



    // Get the date components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');

    // Format as yyyy-mm-dd
    var date = `${year}-${month}-${day}`;

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
            // Create a new table row
            const newRow = document.createElement('tr');
          
            // Check if CheckOutTime is null
            if (element.CheckOutTime == null) {
              const datetimeId = `datetime-${element.CheckInTime}-${element.Pin}`;
              const checkOutId = `check_out-${element.CheckInTime}-${element.Pin}`;       
              newRow.innerHTML = `
                <td class="Name">${element.Name}</td>
                <td class="Pin">${element.Pin}</td>
                <td class="CheckInTime">${(convertToAmPm((element.CheckInTime).substring(11)))}</td>
                <td>
                  <div class="text-center">
                    <input type="datetime-local" id="${datetimeId}" name="datetime" class="datetime-input" step="1">
                    <div class="calendar-icon" onclick="openDateTimePicker();"></div>
                  </div>
                </td>
                <td class="text-center">
                  <button type="button" class="btn btn-green" id="${checkOutId}" disabled>Check-out</button>
                </td>
              `;

              tableBody3.appendChild(newRow);

              // Get references to the input and button for this row (using the unique IDs)
              const datetimeInput = document.getElementById(datetimeId);
              const checkOutButton = document.getElementById(checkOutId);
            
              
          
              // Set initial disabled state
              checkOutButton.disabled = true;
          
              // Add event listener for this specific input
              datetimeInput.addEventListener('change', function() {
                if (this.value) {
                  checkOutButton.disabled = false;
                } else {
                  checkOutButton.disabled = true;
                }
              });

              checkOutButton.addEventListener('click', function(){
                
                const date1 = new Date(datetimeInput.value);
                const date2 = new Date(element.CheckInTime);

                // Calculate the difference in milliseconds
                const diffInMs = date1 - date2;

                // Convert the difference from milliseconds to total minutes
                const diffInMinutes = Math.floor(diffInMs / 1000 / 60);

                // Calculate the total hours and remaining minutes
                const totalHours = Math.floor(diffInMinutes / 60);
                const minutes = diffInMinutes % 60;

                // Format the hours and minutes
                const formattedHours = String(totalHours).padStart(2, '0');
                const formattedMinutes = String(minutes).padStart(2, '0');

                updateDailyReportAPiData(element.EmpID, element.CID, date, element.Type, element.CheckInSnap, element.CheckInTime, element.CheckOutSnap, datetimeInput.value, `${formattedHours}:${formattedMinutes}`)
                datetimeInput.value = '';
                checkOutButton.disabled = true;
              });
          
              
            }
            else{
                const datetimeId = `datetime-${element.CheckInTime}-${element.Pin}`;
                const checkOutId = `check_out-${element.CheckInTime}-${element.Pin}`;       
                newRow.innerHTML = `
                  <td class="Name">${element.Name}</td>
                  <td class="Pin">${element.Pin}</td>
                  <td class="CheckInTime">${(convertToAmPm((element.CheckInTime).substring(11)))}</td>
                  <td class="CheckOutTime">${(convertToAmPm((element.CheckOutTime).substring(11)))}</td>
                  <td class="text-center">
                    <button type="button" class="btn btn-grey" id="${checkOutId}" disabled>Check-out</button>
                  </td>
                `;
  
                tableBody3.appendChild(newRow);
  
              }
          });

                if( tableBody3.innerHTML == '')
                    {

                            const newRow = document.createElement('tr');
                            newRow.innerHTML = `
                            <td colspan="6" class="text-center">No Records Found</td>
                        `;
                            tableBody3.innerHTML = '';
                            tableBody3.appendChild(newRow);

                    }

            }
            catch {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                <td colspan="6" class="text-center">No Records Found</td>
            `;
                tableBody3.innerHTML = '';
                tableBody3.appendChild(newRow);

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
                        if(element.CheckOutTime != null)
                            {
                        newRow.innerHTML = `
                    <td class="Name">${element.Name}</td>
                    <td class="Pin">${element.Pin}</td>
                    <td class="CheckInTime">${(convertToAmPm((element.CheckInTime).substring(11)))}</td>
                    <td class="CheckOutTime">${(convertToAmPm((element.CheckOutTime).substring(11)))}</td>
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
    const apiBase = "https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/dailyReport/getDateRangeReport"
    const tableBody2 = document.getElementById("tBody2");
    tableBody2.innerHTML = '';
    const cid = localStorage.getItem('companyID');

    var dateRange = {};

    selectedValue = localStorage.getItem('reportType');

    if(selectedValue == "Weekly")
    {
    
    dateRange = getLastWeekDateRange();
    }
    else if(selectedValue == "Monthly")
    {
      dateRange = getLastMonthStartAndEndDates()
    }
    else if(selectedValue == "BiMonthly")
    {
      dateRange = getLastTwoMonthStartAndEndDates();
    }

        const apiUrl = `${apiBase}/${cid}/${dateRange.startRange}/${dateRange.endRange}`;
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            }).then(data => {
                try {
                    if(data.isEmpty)
                    {
                        const newRow = document.createElement('tr');
        newRow.innerHTML = `
    <td colspan="6" class="text-center">No Records Found</td>
`;
        tableBody2.innerHTML = '';
        tableBody2.appendChild(newRow);
                    }
                    else
                    {
                    data.forEach(element => {
                      console.log(data);
                        const newRow = document.createElement('tr');
                        if (element.CheckOutTime != null) {
                        newRow.innerHTML = `
                <td class="Name">${element.Name}</td>
                <td class="Pin">${element.Pin}</td>
                <td class="TimeWorked">${element.TimeWorked}</td>
            `;
                        tableBody2.appendChild(newRow);
                        }
                    });
                }

                }
                catch {
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

}
// Call fetchData when the page is fully loaded
document.addEventListener('DOMContentLoaded', viewCurrentDateReport());
document.addEventListener('DOMContentLoaded', viewDatewiseReport("test"));

document.getElementById('dailyReportDate').addEventListener('change', function () {
  const dateValue = this.value;
  document.addEventListener('DOMContentLoaded', viewDatewiseReport(dateValue));
});

document.addEventListener('DOMContentLoaded', function(){
    selectedValue = localStorage.getItem('reportType');
    document.getElementById("report-type-heading").textContent = selectedValue + " Report";
    viewDateRangewiseReport();
});




async function updateDailyReportAPiData(emp_id, cid, date, type, checkin_snap, checkin_time,checkout_snap, checkout_time , time_worked) {
  
    const userData = {
      CID: cid,
        EmpID: emp_id,
        Date: date,
        TypeID: type,
        CheckInSnap: checkin_snap,
        CheckInTime: checkin_time,
        CheckOutSnap: checkout_snap,
        CheckOutTime: checkout_time,
        TimeWorked: time_worked
    }

    var apiBaseUrl = `https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/dailyreport/update/${emp_id}/${cid}/${checkin_time}`;

    try {
      const response = await fetch(apiBaseUrl, {
        method: 'PUT',
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
            setTimeout(() => {
                window.location.href = "report_summary.html"; 
            }, 1000);        
      }
      else{
        alert(data.error);
      }
    }
    //   console.log(data);
    } catch (error) {
    //   console.error('Error:', error);
    }
  }


  function convertToAmPm(timeStr) {
    // Split the input string into components
    let [hours, minutes, seconds] = timeStr.split(':').map(Number);

    // Determine AM or PM
    let amPm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight

    // Format hours, minutes, and seconds as two digits
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    // Combine into the final formatted string
    return `${hours}:${minutes}:${seconds} ${amPm}`;
}

// Weekly Report Date Calculation.

function getLastWeekDateRange() {
    // Today's date
    let today = new Date();
  
    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    let dayOfWeek = today.getDay();
  
    // Calculate the difference to the previous Monday (dayOfWeek - 1)
    // If today is Monday, dayOfWeek - 1 is 0, so we go back 7 days (last Monday)
    let daysSinceLastMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  
    // Calculate last Monday's date
    let lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - daysSinceLastMonday - 7);
  
    // Calculate last Sunday's date
    let lastSunday = new Date(lastMonday);
    lastSunday.setDate(lastMonday.getDate() + 6);
  
    // Format dates to yyyy-mm-dd
    let formatDate = (date) => date.toISOString().split('T')[0];
  
    let lastMondayStr = formatDate(lastMonday);
    let lastSundayStr = formatDate(lastSunday);
  
    return {
      startRange: lastMondayStr,
      endRange: lastSundayStr
    };
  }


  function getLastTwoMonthStartAndEndDates() {
    // Get today's date
    const today = new Date();
    
    // Calculate the start date (first day of the month two months ago)
    const startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    
    // Calculate the end date (last day of the previous month)
    const endDate = new Date(today.getFullYear(), today.getMonth(), 0);

    return {
      startRange: formatDate(startDate),
      endRange : formatDate(endDate)
    };
}

function getLastMonthStartAndEndDates() {
  // Set today's date for testing
  const today = new Date();
  
  // Calculate the start date of the last full month
  const startDateLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  
  // Calculate the end date of the last full month
  const endDateLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  
 return {
  startRange: formatDate(startDateLastMonth),
  endRange : formatDate(endDateLastMonth)
  };
}

// Function to format date as "yyyy-MM-dd"
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}