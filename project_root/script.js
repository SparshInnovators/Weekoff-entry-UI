// Half day toggle
const halfDayToggle = document.getElementById("halfDayToggle");
halfDayToggle.addEventListener("change", function () {
  const dropdowns = document.querySelectorAll(".day-dropdown");
  dropdowns.forEach(dd => dd.style.display = this.checked ? "inline-block" : "none");
});

// "All" checkbox functionality
const allCheckboxes = document.querySelectorAll(".row-all");
allCheckboxes.forEach(allChk => {
  allChk.addEventListener("change", function () {
    const row = this.closest("tr");
    const dayCheckboxes = row.querySelectorAll(".day-checkbox");
    dayCheckboxes.forEach(chk => chk.checked = this.checked);
  });
});
