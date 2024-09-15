
const apiUrlBase = 'https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/dailyreport/getdatebasedata';

const cid = localStorage.getItem('companyID');


const timezone_mapping = {
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
  "Not Registered": "America/Los_Angeles"
}

function formatDateTime(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getUTCRangeForCustomDate(selectedDate, timezone) {
  // Convert the selected date to a Date object
  const selectedDateTime = new Date(selectedDate);

  // Convert the selected date to the specified timezone
  const dateInTimeZone = new Date(selectedDateTime.toLocaleString("en-US", { timeZone: timezone }));

  // Set the start time to 00:00:00.000 in the timezone
  const startTimeInTimeZone = new Date(dateInTimeZone);
  startTimeInTimeZone.setHours(0, 0, 0, 0); // Set to start of the day

  // Set the end time to 23:59:59.999 in the timezone
  const endTimeInTimeZone = new Date(dateInTimeZone);
  endTimeInTimeZone.setHours(23, 59, 59, 999); // Set to end of the day

  // Convert start and end times to UTC
  const startTimeInUTC = new Date(startTimeInTimeZone.toISOString());
  const endTimeInUTC = new Date(endTimeInTimeZone.toISOString());

  // Format the start and end times to 'YYYY-MM-DD HH:mm:ss'
  const formattedStartTimeUTC = formatDateTime(startTimeInUTC);
  const formattedEndTimeUTC = formatDateTime(endTimeInUTC);

  return {
      startTimeInUTC: formattedStartTimeUTC,
      endTimeInUTC: formattedEndTimeUTC
  };
}

function formatDateTimeToTimezone(utcDateTime, timezone) {
  // Append 'Z' to indicate UTC if it's not already present
  if (!utcDateTime.endsWith('Z')) {
      utcDateTime += 'Z';
  }

  // Create a Date object from the UTC date-time string
  const utcDate = new Date(utcDateTime);

  // Use Intl.DateTimeFormat to convert to the specified timezone
  const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: timezone
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedParts = formatter.formatToParts(utcDate);

  // Extract the individual date and time parts
  const year = formattedParts.find(part => part.type === 'year').value;
  const month = formattedParts.find(part => part.type === 'month').value;
  const day = formattedParts.find(part => part.type === 'day').value;
  const hour = formattedParts.find(part => part.type === 'hour').value;
  const minute = formattedParts.find(part => part.type === 'minute').value;
  const second = formattedParts.find(part => part.type === 'second').value;

  // Return the formatted date-time string in 'YYYY-MM-DD HH:mm:ss' format
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}


document.addEventListener("DOMContentLoaded", function () {
  selectedValue = localStorage.getItem('reportType');
  document.getElementById("reportName").textContent = selectedValue + " Report";
});

function viewDatewiseReport(dateValue) {
  document.getElementById('overlay').style.display = 'flex';
  document.querySelector(".custom-table-container").style.display = "block";
  document.getElementById("noDateSelect").style.display = "none";
  const tableBody = document.getElementById("tbody");
  tableBody.innerHTML = '';

  if (dateValue != "test") {
    const apiUrl = `${apiUrlBase}/${cid}/${dateValue}`;

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
            if (element.CheckOutTime != null) {
              const checkInTimeUTC = new Date(element.CheckInTime);
              const checkOutTimeUTC = new Date(element.CheckOutTime);


              // Convert to AM/PM format if needed
              const checkInTimeFormatted = convertToAmPm(checkInTimeUTC);

              const checkOutTimeFormatted = convertToAmPm(checkOutTimeUTC);

              newRow.innerHTML = `
                               <td class="Name">${(element.Name).split(" ")[0]}</td>
                              <td class="Pin">${element.Pin}</td>
                              <td class="CheckInTime">${checkInTimeFormatted}</td>
                              <td class="CheckOutTime">${checkOutTimeFormatted}</td>
                              <td class="TimeWorked">${element.TimeWorked}</td>
                          `;
              tableBody.appendChild(newRow);
              // document.getElementById("timeZoneBasedData").textContent = formatDateOnly(checkInTimeIST);
            }
          });
        } catch {
          // alert("No Data Found");
          const newRow = document.createElement('tr');
          newRow.innerHTML = `
                      <td colspan="6" class="text-center">No Records Found</td>
                  `;
          tableBody.appendChild(newRow);
        }
        document.getElementById('overlay').style.display = 'none';
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

document.getElementById('dailyReportDate').addEventListener('change', function () {
  const dateValue = this.value;
  document.addEventListener('DOMContentLoaded', viewDatewiseReport(dateValue));
});


function convertToAmPm(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutesStr + ' ' + ampm;
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

