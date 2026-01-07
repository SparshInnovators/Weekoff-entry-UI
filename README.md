### **Task Title**:  
**Add UI Layout Based on Given Reference Images Using HTML, CSS, Tailwind, and JavaScript**

---

### **Labels**:  
`enhancement`, `UI`, `frontend`, `TailwindCSS`, `JavaScript`

---

### **Description**:  
We need to create a new UI layout based on a given reference design using HTML, CSS, Tailwind, and JavaScript. This layout will be responsive and should follow best practices for accessibility and performance.

---
### **Reference UI**:
![image](https://github.com/user-attachments/assets/d21ff416-ac66-4d48-9928-ae754f36c1b3)
![image (1)](https://github.com/user-attachments/assets/5e852ff2-401a-49da-a9fa-a27b57d07638)


### **Tasks**:
1. **HTML Structure**:
   - Create weekoff entry form as per given refrence image.

2. **Tailwind CSS**:
   - Implement Tailwind utility classes for layout and styling.
   - Ensure the design is fully responsive for mobile, tablet, and desktop views.

3. **JavaScript**:
   - Add JavaScript for any dynamic elements (e.g., dropdowns, modals, carousels).
   - When half working day checkbox is checked then show the dropdown.

-------------------------------------------------------------------------------------------
#MySolution And Approach
# Work Calendar Demo

A small demo for an "Add Work Calendar" UI using Tailwind CSS (CDN) and plain JavaScript.

## What this project contains

- `index.html` — The UI markup and Tailwind CDN include.
- `app.js` — JavaScript that generates the calendar rows, handles "All" and per-week checkboxes, toggles dropdown visibility when `Half working day` is enabled, and builds the save payload.

## Features

- Responsive layout using Tailwind utility classes. On small screens rows stack vertically; on `sm` and larger screens the calendar shows 7 columns.
- Dropdowns for week selection are shown only when both the week checkbox is checked and `Half working day` is enabled.
- "All" checkbox toggles all week checkboxes in a row.
- Save button logs a JSON payload to the console.
- Basic accessibility improvements: `aria-label` on interactive controls.

## How to run

1. Open `index.html` in your browser (no build steps required).
   - Example: double-click the file or open via your browser's "Open File".
2. Interact with the UI:
   - Toggle the `Half working day & half weekend` checkbox to enable/disable half-day dropdowns.
   - Use the `All` checkbox to check/uncheck all weeks for a given day.
   - When a week checkbox is checked and half-day is enabled, the dropdown becomes visible — choose `Full Day`, `1st Half`, or `2nd Half`.
   - Click `Save` and check the browser console for the `Saved Payload:` output.

## Files changed in this workspace

- `index.html` — made header/body responsive, added `id`s for modal/close/cancel buttons, added `aria-label` on toggle.
- `app.js` — added `data-week` attributes, made selects show/hide based on checkbox & toggle, improved `saveCalendar()` to use `data-week`, and added handlers for close/cancel.

## How to verify the requirement "When half working day checkbox is checked then show the dropdown"

- Make sure `Half working day & half weekend` (`#halfToggle`) is checked.
- Check any week checkbox on a row — the corresponding dropdown will appear next to the checkbox.
- Uncheck `#halfToggle` — all dropdowns will hide.

## Next suggestions

- Persist the saved payload to `localStorage` or a backend endpoint.
- Replace CDN Tailwind with a local build for production to reduce payload size.
- Improve keyboard accessibility and provide visible focus states for interactive elements.
- Add unit tests for `saveCalendar()` logic if you plan to extend functionality.

If you'd like, I can commit these changes to git, add a small test harness, or wire up `localStorage` persistence next.
