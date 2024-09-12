
const apiUrlBase = 'https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/dailyreport/getdatebasedata';

const TZ = localStorage.getItem("TimeZone");


const
  timezone_mapping = {
    "UTC": "UTC",  // Coordinated Universal Time
    "GMT": "Europe/London",  // Greenwich Mean Time
    "BST": "Europe/London",  // British Summer Time
    "CET": "Europe/Paris",  // Central European Time
    "CEST": "Europe/Paris",  // Central European Summer Time
    "EET": "Europe/Helsinki",  // Eastern European Time
    "EEST": "Europe/Helsinki",  // Eastern European Summer Time
    "IST": "Asia/Kolkata",  // Indian Standard Time
    "PKT": "Asia/Karachi",  // Pakistan Standard Time
    "AST": "Asia/Riyadh",  // Arabian Standard Time
    "GST": "Asia/Dubai",  // Gulf Standard Time
    "MSK": "Europe/Moscow",  // Moscow Standard Time
    "HKT": "Asia/Hong_Kong",  // Hong Kong Time
    "SGT": "Asia/Singapore",  // Singapore Time
    "CST": ["America/Chicago", "Asia/Shanghai"],  // Central Standard Time (US), China Standard Time
    "CDT": "America/Chicago",  // Central Daylight Time (US)
    "EST": "America/New_York",  // Eastern Standard Time (US)
    "EDT": "America/New_York",  // Eastern Daylight Time (US)
    "MST": "America/Denver",  // Mountain Standard Time (US)
    "MDT": "America/Denver",  // Mountain Daylight Time (US)
    "PST": "America/Los_Angeles",  // Pacific Standard Time (US)
    "PDT": "America/Los_Angeles",  // Pacific Daylight Time (US)
    "AKST": "America/Anchorage",  // Alaska Standard Time
    "AKDT": "America/Anchorage",  // Alaska Daylight Time
    "HST": "Pacific/Honolulu",  // Hawaii Standard Time
    "HADT": "Pacific/Honolulu",  // Hawaii-Aleutian Daylight Time
    "AEST": "Australia/Sydney",  // Australian Eastern Standard Time
    "AEDT": "Australia/Sydney",  // Australian Eastern Daylight Time
    "ACST": "Australia/Adelaide",  // Australian Central Standard Time
    "ACDT": "Australia/Adelaide",  // Australian Central Daylight Time
    "AWST": "Australia/Perth",  // Australian Western Standard Time
    "NZST": "Pacific/Auckland",  // New Zealand Standard Time
    "NZDT": "Pacific/Auckland",  // New Zealand Daylight Time
    "JST": "Asia/Tokyo",  // Japan Standard Time
    "KST": "Asia/Seoul",  // Korea Standard Time
    "WIB": "Asia/Jakarta",  // Western Indonesia Time
    "WITA": "Asia/Makassar",  // Central Indonesia Time
    "WIT": "Asia/Jayapura",  // Eastern Indonesia Time
    "ART": "America/Argentina/Buenos_Aires",  // Argentina Time
    "BRT": "America/Sao_Paulo",  // Brasilia Time
    "CLT": "America/Santiago",  // Chile Standard Time
    "GFT": "America/Cayenne",  // French Guiana Time
    "PYT": "America/Asuncion",  // Paraguay Time
    "VET": "America/Caracas",  // Venezuela Time
    "WET": "Europe/Lisbon",  // Western European Time
    "WEST": "Europe/Lisbon",  // Western European Summer Time
    "CAT": "Africa/Harare",  // Central Africa Time
    "EAT": "Africa/Nairobi",  // East Africa Time
    "SAST": "Africa/Johannesburg",  // South Africa Standard Time
    "WAT": "Africa/Lagos",  // West Africa Time
    "ADT": "America/Halifax",  // Atlantic Daylight Time
    "AST": "America/Halifax",  // Atlantic Standard Time
    "NST": "America/St_Johns",  // Newfoundland Standard Time
    "NDT": "America/St_Johns",  // Newfoundland Daylight Time
    "WAT": "Africa/Lagos",  // West Africa Time
    "CST": "America/Havana",  // Cuba Standard Time
    "WST": "Pacific/Apia",  // West Samoa Time
    "ChST": "Pacific/Guam",  // Chamorro Standard Time
    "PWT": "Pacific/Palau",  // Palau Time
    "VOST": "Antarctica/Vostok",  // Vostok Station Time
    "NZST": "Pacific/Auckland",  // New Zealand Standard Time
    "NZDT": "Pacific/Auckland",  // New Zealand Daylight Time
    "FJT": "Pacific/Fiji",  // Fiji Time
    "GALT": "Pacific/Galapagos",  // Galapagos Time
    "GAMT": "Pacific/Gambier",  // Gambier Time
    "HKT": "Asia/Hong_Kong",  // Hong Kong Time
    "IRKT": "Asia/Irkutsk",  // Irkutsk Time
    "KRAT": "Asia/Krasnoyarsk",  // Krasnoyarsk Time
    "MAWT": "Antarctica/Mawson",  // Mawson Station Time
    "SCT": "Indian/Mahe",  // Seychelles Time
    "SGT": "Asia/Singapore",  // Singapore Time
    "SLST": "Asia/Colombo",  // Sri Lanka Standard Time
    "THA": "Asia/Bangkok",  // Thailand Standard Time
    "TLT": "Asia/Dili",  // East Timor Time
    "YAKT": "Asia/Yakutsk",  // Yakutsk Time
    "YEKST": "Asia/Yekaterinburg",  // Yekaterinburg Summer Time
  }

function viewCurrentDateReport() {
  document.getElementById('overlay').style.display = 'flex';
  selectedValue = localStorage.getItem('reportType');
  document.getElementById("reportName").textContent = selectedValue + " Report";

  const tableBody3 = document.getElementById("current-checkin-tbody");
  const heading = document.getElementById("current-checkin-header");
  tableBody3.innerHTML = '';

  // Format as yyyy-mm-dd
  var date = getCurrentDateInTimezone(timezone_mapping[TZ]);

  console.log(TZ);
  console.log(date);

  heading.innerHTML = date;
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
          console.log(element)
          // Create a new table row
          const newRow = document.createElement('tr');

          const checkInTimeUTC = new Date(element.CheckInTime);

          // Convert to IST
          const checkInTimeIST = checkInTimeUTC.toLocaleString("en-US", { timeZone: timezone_mapping[TZ] });

          // Convert to AM/PM format if needed
          const checkInTimeFormatted = convertToAmPm(new Date(checkInTimeIST));

          console.log(checkInTimeFormatted)

          // Check if CheckOutTime is null
          if (element.CheckOutTime == null) {
            const datetimeId = `datetime-${element.CheckInTime}-${element.Pin}`;
            const checkOutId = `check_out-${element.CheckInTime}-${element.Pin}`;
            newRow.innerHTML = `
                <td class="Name">${element.Name}</td>
                <td class="Pin">${element.Pin}</td>
                <td class="CheckInTime">${checkInTimeFormatted}</td>
                <td>
                  <div class="text-center">
                                    <input type="time" id="${datetimeId}" name="time" class="time-input" step="1">
                                    <div class="calendar-icon" onclick="openTimePicker();"></div>
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
            datetimeInput.addEventListener('change', function () {
              if (this.value) {
                checkOutButton.disabled = false;
              } else {
                checkOutButton.disabled = true;
              }
            });

            checkOutButton.addEventListener('click', function () {

              const dateWithTime = convertToUTC(getDateTimeFromTimePicker(datetimeInput.value));


              
              const date2 = new Date(element.CheckInTime);
              const date1 = new Date(dateWithTime)
              
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

              const timeWorkedHours = formattedHours + ":" + formattedMinutes;

              updateDailyReportAPiData(element.EmpID, element.CID, date, element.Type, element.CheckInSnap, element.CheckInTime, element.CheckOutSnap, dateWithTime, timeWorkedHours)

              datetimeInput.value = '';
              checkOutButton.disabled = true;
            });


          }
          else {

            const checkInTimeUTC = new Date(element.CheckInTime);
            const checkOutTimeUTC = new Date(element.CheckOutTime);

            // Convert to IST
            const checkInTimeIST = checkInTimeUTC.toLocaleString("en-US", { timeZone: timezone_mapping[TZ] });
            const checkOutTimeIST = checkOutTimeUTC.toLocaleString("en-US", { timeZone: timezone_mapping[TZ] });

            // Convert to AM/PM format if needed
            const checkInTimeFormatted = convertToAmPm(new Date(checkInTimeIST));
            const checkOutTimeFormatted = convertToAmPm(new Date(checkOutTimeIST));

            const checkOutId = `check_out-${element.CheckInTime}-${element.Pin}`;
            newRow.innerHTML = `
                  <td class="Name">${element.Name}</td>
                  <td class="Pin">${element.Pin}</td>
                  <td class="CheckInTime">${checkInTimeFormatted}</td>
                  <td class="CheckOutTime">${checkOutTimeFormatted}</td>
                  <td class="text-center">
                    <button type="button" class="btn btn-grey" id="${checkOutId}" disabled>Check-out</button>
                  </td>
                `;

            tableBody3.appendChild(newRow);

          }
        });

        if (tableBody3.innerHTML == '') {

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
      document.getElementById('overlay').style.display = 'none';
    })
    .catch(error => {
      console.error('Error:', error);
    });
}



// View Data

// Call fetchData when the page is fully loaded

document.addEventListener('DOMContentLoaded', viewCurrentDateReport());
async function updateDailyReportAPiData(emp_id, cid, date, type, checkin_snap, checkin_time, checkout_snap, checkout_time, time_worked) {

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

    else {
      const data = await response.json();

      if (!data.error) {
        setTimeout(() => {
          window.location.href = "report_summary.html";
        }, 1000);

      }
      else {
        alert(data.error);
      }
    }
  } catch (error) {
  }
}


function convertToAmPm(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutesStr + ' ' + ampm;
}

// function convertToAmPm(timeStr) {
//   // Split the input string into components
//   let [hours, minutes, seconds] = timeStr.split(':').map(Number);

//   // Determine AM or PM
//   let amPm = hours >= 12 ? 'PM' : 'AM';

//   // Convert hours to 12-hour format
//   hours = hours % 12 || 12; // Convert 0 to 12 for midnight

//   // Format hours, minutes, and seconds as two digits
//   hours = hours.toString().padStart(2, '0');
//   minutes = minutes.toString().padStart(2, '0');
//   seconds = seconds.toString().padStart(2, '0');

//   // Combine into the final formatted string
//   return `${hours}:${minutes}:${seconds} ${amPm}`;
// }

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

function getLastTwoWeeksDateRange() {
  // Today's date
  let today = new Date();

  // Find the start of the current week (Monday)
  let currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));

  // Calculate the start of the last two weeks (Monday two weeks ago)
  let startDate = new Date(currentWeekStart);
  startDate.setDate(currentWeekStart.getDate() - 14);

  // Calculate the end of the last two weeks (Sunday two weeks later)
  let endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 13); // 14 days - 1 day

  // Format dates to yyyy-mm-dd
  let formatDate = (date) => date.toISOString().split('T')[0];

  let startDateStr = formatDate(startDate);
  let endDateStr = formatDate(endDate);

  return {
    startRange: startDateStr,
    endRange: endDateStr
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
    endRange: formatDate(endDate)
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
    endRange: formatDate(endDateLastMonth)
  };
}

// Function to format date as "yyyy-MM-dd"
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


// Functions to convert time and calculate totals
function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}:${mins.toString().padStart(2, '0')}`;
}


function calculateTotalTimeWorked(data) {
  const employeeTimes = {};

  data.forEach(entry => {
    const { Name, Pin, TimeWorked } = entry;

    if (TimeWorked) {
      const minutesWorked = timeToMinutes(TimeWorked);

      if (!employeeTimes[Pin]) {
        employeeTimes[Pin] = { name: Name, totalMinutes: 0 };
      }
      employeeTimes[Pin].totalMinutes += minutesWorked;
    }
  });

  // Convert total minutes to time string
  for (const [pin, details] of Object.entries(employeeTimes)) {
    details.totalHoursWorked = minutesToTime(details.totalMinutes);
  }

  return employeeTimes;
}

function getDateTimeFromTimePicker(timeValue) {
  // Get today's date
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0');

  // Extract time components from the time value
  const [hours, minutes, seconds] = timeValue.split(':').map(part => part.padStart(2, '0'));

  // Combine date with time
  const combinedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return combinedDateTime;
}


document.addEventListener('DOMContentLoaded', function () {
  // Initialize Flatpickr
  flatpickr(".datetime", {
    enableTime: true,
    enableTime: true,
    enableSeconds: true,
    time_24hr: true,
    dateFormat: "Y-m-d h:i:S",
    minuteIncrement: 1,
    allowInput: true
  });

  // Show modal on button click
  document.getElementById('add-entry').addEventListener('click', function () {
    var modal = new bootstrap.Modal(document.getElementById('addEntryModal'));
    modal.show();
  });

  // Handle form submission
  var form = document.getElementById('entryForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('overlay').style.display = 'flex';
    var name = document.getElementById('name').value;
    var type = document.getElementById('type').value;
    var employeeId = document.getElementById('employeeId').value;
    var checkinTime = document.getElementById('checkinTime').value;
    var checkoutTime = document.getElementById('checkoutTime').value;

    const cid = localStorage.getItem('companyID');

    const date1 = new Date(convertToUTC(checkoutTime));
    const date2 = new Date(convertToUTC(checkinTime));

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

    const timeWorkedHours = formattedHours + ":" + formattedMinutes;

    // Data object to be sent
    var data = {
      CID: cid,
      EmpID: employeeId,
      Date: checkinTime.substring(0, 10),
      TypeID: type,
      CheckInSnap: null,
      CheckInTime: checkinTime,
      CheckOutSnap: null,
      CheckOutTime: checkoutTime,
      TimeWorked: timeWorkedHours

    };

    // Send PUT request
    fetch('https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/dailyreport/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Close the modal
        var modal = bootstrap.Modal.getInstance(document.getElementById('addEntryModal'));
        modal.hide();
        viewCurrentDateReport();
        // Optionally, you can refresh data or provide a success message
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});



function getCurrentDateInTimezone(timezone) {
  // Get the current date and time in UTC
  const now = new Date();

  // Options to format the date in the desired timezone
  const options = {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };

  // Format the date in the desired timezone using Intl.DateTimeFormat
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = formatter.format(now);

  // Convert the formatted date to "YYYY-MM-DD" format
  const [month, day, year] = formattedDate.split('/');

  return `${year}-${month}-${day}`;
}


function convertToUTC(dateTimeStr) {
  // Create a Date object from the date and time string in local time
  const localDate = new Date(dateTimeStr);

  // Convert the local Date object to UTC components
  const year = localDate.getUTCFullYear();
  const month = String(localDate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(localDate.getUTCDate()).padStart(2, '0');
  const hours = String(localDate.getUTCHours()).padStart(2, '0');
  const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(localDate.getUTCSeconds()).padStart(2, '0');

  // Format and return the UTC date and time as a string
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}