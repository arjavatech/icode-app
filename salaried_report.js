
const apiUrlBase = 'https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/dailyreport/getdatebasedata';

const TZ = localStorage.getItem("TimeZone");

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

function viewDateRangewiseReport() {
  document.getElementById('overlay').style.display = 'flex';
  const apiBase = "https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/dailyReport/getDateRangeReport";
  const tableBody = document.getElementById("tbody");
  tableBody.innerHTML = '';
  const cid = localStorage.getItem('companyID');

  let dateRange = {};

  const selectedValue = localStorage.getItem('reportType');

  switch (selectedValue) {
    case "Weekly":
      dateRange = getLastWeekDateRange();
      break;
    case "Monthly":
      dateRange = getLastMonthStartAndEndDates();
      break;
    case "Bimonthly":
      dateRange = getLastTwoMonthStartAndEndDates();
      break;
    case "Biweekly":
      dateRange = getLastTwoWeeksDateRange();
      break;
    default:
      console.error("Invalid report type");
      return;
  }


  const startVal = dateRange.startRange;
  const endVal = dateRange.endRange;

  document.getElementById("start-date-header").innerHTML = startVal;
  document.getElementById("end-date-header").innerHTML = endVal;

  var data = {
    "startdate": getUTCRangeForCustomDate(startVal, timezone_mapping[TZ])["startTimeInUTC"],
    "enddate": getUTCRangeForCustomDate(endVal, timezone_mapping[TZ])["endTimeInUTC"]
  }


  const apiUrl = `${apiBase}/${cid}`;

  // Fetch data from API and render table
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      try {
        // Calculate total time worked for each employee
        const totalTimeWorked = calculateTotalTimeWorked(data);

        // Check if data is an empty array
        if (Array.isArray(data) && data.length === 0) {
          const newRow = document.createElement('tr');
          newRow.innerHTML = `
                      <td colspan="6" class="text-center">No Records Found</td>
                  `;
          tableBody.appendChild(newRow);
        } else {
          // Clear existing rows
          tableBody.innerHTML = '';

          // Process each employee and create rows
          Object.entries(totalTimeWorked).forEach(([pin, Employeedata]) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                          <td class="Name">${Employeedata.name.split(" ")[0]}</td>
                          <td class="Pin">${pin}</td>
                          <td class="TimeWorked">${Employeedata.totalHoursWorked}</td>
                      `;
            tableBody.appendChild(newRow);
          });
          document.getElementById('overlay').style.display = 'none';
        }
      } catch (error) {
        document.getElementById('overlay').style.display = 'none';
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
  selectedValue = localStorage.getItem('reportType');
  document.getElementById("reportName").textContent = selectedValue + " Report";
  document.getElementById("report-type-heading").textContent = selectedValue + " Report";
  viewDateRangewiseReport();
});

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
  const today = new Date();

  // Calculate the middle of the month based on the number of days
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const midMonthDay = Math.ceil(daysInMonth / 2);

  let startDate, endDate;

  if (today.getDate() >= midMonthDay) {
    // Second half of the month, so return the first half
    startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    endDate = new Date(today.getFullYear(), today.getMonth(), midMonthDay - 1);
  }
  else {
    // First half of the month, so return the second half of the previous month
    const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const daysInPrevMonth = new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0).getDate();
    startDate = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), Math.ceil(daysInPrevMonth / 2));
    endDate = new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0);
  }

  const padToTwoDigits = (num) => num.toString().padStart(2, '0');

  return {
    startRange: `${startDate.getFullYear()}-${padToTwoDigits(startDate.getMonth() + 1)}-${padToTwoDigits(startDate.getDate())}`,
    endRange: `${endDate.getFullYear()}-${padToTwoDigits(endDate.getMonth() + 1)}-${padToTwoDigits(endDate.getDate())}`
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

function formatDateTime(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


