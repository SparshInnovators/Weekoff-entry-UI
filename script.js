 
const form = document.getElementById("weekoffForm");
const weekStart = document.getElementById("weekStart");
const weekDays = document.getElementById("weekDays");
const message = document.getElementById("message");

const dayNames = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday"
];

function setCurrentWeek() {
  const today = new Date();
  const monday = new Date(today);
  const day = today.getDay();

  monday.setDate(today.getDate() - ((day + 6) % 7));

  weekStart.value =
    `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, "0")}-${String(monday.getDate()).padStart(2, "0")}`;

  renderDays();
}

function renderDays() {
  weekDays.innerHTML = "";
  message.classList.add("hidden");

  if (!weekStart.value) return;

  const start = new Date(weekStart.value + "T12:00:00");

  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);

    const dateText = date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    const card = document.createElement("article");

    card.className =
      "rounded-xl border border-slate-200 p-4 hover:border-indigo-300";

    card.innerHTML = `
      <div class="mb-4">
        <h3 class="font-semibold">${dayNames[date.getDay()]}</h3>
        <p class="text-sm text-slate-500">${dateText}</p>
      </div>

      <label class="mb-3 flex items-center gap-2 text-sm">
        <input type="checkbox" class="weekoff accent-indigo-600">
        <span>Mark as Weekoff</span>
      </label>

      <label class="flex items-center gap-2 text-sm">
        <input type="checkbox" class="halfday accent-indigo-600">
        <span>Half Working Day</span>
      </label>

      <div class="halfday-options mt-3 hidden">
        <label class="mb-2 block text-xs font-medium text-slate-600">
          Select half-day period
        </label>
        <select class="halfday-period w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
          <option value="">Choose a period</option>
          <option value="First Half">First Half</option>
          <option value="Second Half">Second Half</option>
        </select>
      </div>
    `;

    const halfday = card.querySelector(".halfday");
    const options = card.querySelector(".halfday-options");
    const period = card.querySelector(".halfday-period");
    const weekoff = card.querySelector(".weekoff");

    halfday.addEventListener("change", () => {
      options.classList.toggle("hidden", !halfday.checked);
      period.required = halfday.checked;

      if (!halfday.checked) period.value = "";
      if (halfday.checked) weekoff.checked = false;
    });

    weekoff.addEventListener("change", () => {
      if (weekoff.checked) {
        halfday.checked = false;
        options.classList.add("hidden");
        period.required = false;
        period.value = "";
      }
    });

    weekDays.appendChild(card);
  }
}

weekStart.addEventListener("change", renderDays);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const selections = [];
  let invalid = false;

  document.querySelectorAll("#weekDays article").forEach(card => {
    const day = card.querySelector("h3").textContent;
    const date = card.querySelector("p").textContent;
    const weekoff = card.querySelector(".weekoff").checked;
    const halfday = card.querySelector(".halfday").checked;
    const period = card.querySelector(".halfday-period").value;

    if (halfday && !period) invalid = true;

    if (weekoff) {
      selections.push(`${day}, ${date}: Weekoff`);
    } else if (halfday) {
      selections.push(`${day}, ${date}: ${period}`);
    }
  });

  message.className = "rounded-lg p-4 text-sm";

  if (invalid) {
    message.classList.add("bg-red-50", "text-red-700");
    message.textContent =
      "Please select First Half or Second Half for each half working day.";
  } else {
    message.classList.add("bg-green-50", "text-green-800");
    message.textContent = selections.length
      ? `Form validated for ${document.getElementById("employeeName").value}. Selected: ${selections.join("; ")}.`
      : "Form validated. No weekoff or half working day selected.";
  }

  message.classList.remove("hidden");
});

form.addEventListener("reset", () => {
  setTimeout(setCurrentWeek, 0);
});

setCurrentWeek();
                                                                       