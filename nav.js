document.addEventListener('DOMContentLoaded', () => {
  console.log("Nav.js loaded");
  const userType = localStorage.getItem("adminType");
  if(userType === "Admin") {
    const deviceNavBar = document.getElementById("deviceNavBar");
    if (deviceNavBar) {
      deviceNavBar.style.display = "none";
    }
  }
});