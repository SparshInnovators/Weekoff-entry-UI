const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const calendarBody = document.getElementById("calendarBody");
const halfToggle = document.getElementById("halfToggle");

function createSelect(disabled = true, weekIndex = 0) {
  return `
    <select data-week="${weekIndex}" aria-label="Work type for week ${weekIndex}" class="type border rounded px-2 py-1 text-sm ${disabled ? "hidden opacity-50" : ""}" ${disabled ? "disabled" : ""}>
      <option>Full Day</option>
      <option>1st Half</option>
      <option>2nd Half</option>
    </select>
  `;
}

/* CREATE ROWS */
days.forEach(day => {
  const isSaturday = day === "Saturday";

  const row = document.createElement("div");
  row.className = "grid grid-cols-1 sm:grid-cols-7 gap-4 items-center";

  row.innerHTML = `
    <div class="bg-white p-3 rounded border">${day}</div>

    <div class="bg-white p-3 rounded border text-center">
      <input type="checkbox" class="all">
    </div>

    ${[1,2,3,4,5].map((weekIndex) => `
      <div class="bg-white p-3 rounded border flex flex-col sm:flex-row items-center gap-2 justify-center">
        <input type="checkbox" class="week" data-week="${weekIndex}" aria-label="Week ${weekIndex} checkbox" ${isSaturday ? "checked" : ""}>
        ${createSelect(!isSaturday, weekIndex)}
      </div>
    `).join("")}
  `;

  calendarBody.appendChild(row);
});

/* ENABLE / DISABLE DROPDOWN (and show/hide based on halfToggle) */
function updateDropdowns() {
  document.querySelectorAll(".week").forEach(cb => {
    const select = cb.parentElement.querySelector(".type");
    const shouldShow = cb.checked && halfToggle.checked;
    if (select) {
      select.disabled = !shouldShow;
      select.classList.toggle("hidden", !shouldShow);
      select.classList.toggle("opacity-50", !shouldShow);
    }
  });
}
updateDropdowns();

/* WEEK CHECKBOX LOGIC */
document.querySelectorAll(".week").forEach(cb => {
  cb.addEventListener("change", updateDropdowns);
});

/* ALL COLUMN LOGIC */
document.querySelectorAll(".all").forEach(allBox => {
  allBox.addEventListener("change", function () {
    const row = this.closest(".grid");
    row.querySelectorAll(".week").forEach(cb => cb.checked = this.checked);
    updateDropdowns();
  });
});

/* HALF DAY TOGGLE */
/* HALF DAY TOGGLE */
halfToggle.addEventListener("change", updateDropdowns);

/* CLOSE / CANCEL BUTTONS */
const closeBtn = document.getElementById('closeBtn');
const cancelBtn = document.getElementById('cancelBtn');
const modal = document.getElementById('modal');

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    if (modal) modal.classList.add('hidden');
  });
}

if (cancelBtn) {
  cancelBtn.addEventListener('click', () => {
    if (modal) modal.classList.add('hidden');
  });
}

/* SAVE */
function saveCalendar() {
  const payload = {};

  document.querySelectorAll("#calendarBody .grid").forEach(row => {
    const day = row.children[0].innerText;
    payload[day] = [];

    row.querySelectorAll(".week").forEach((cb) => {
      if (cb.checked) {
        const wk = cb.dataset.week;
        const select = row.querySelector(`.type[data-week="${wk}"]`);
        const type = (halfToggle.checked && select) ? select.value : "Full Day";
        payload[day].push({
          week: Number(wk),
          type
        });
      }
    });
  });

  console.log("Saved Payload:", payload);
  alert("Calendar saved successfully. Check console.");
}
