
  document.addEventListener("DOMContentLoaded", function () {

    function bindRowAllSync(table) {
      if (!table || table.dataset.bound === "1") return;

      table.addEventListener("change", function (e) {
        const target = e.target;
        if (!(target instanceof HTMLInputElement) || target.type !== "checkbox") return;

        const cell = target.closest("td");
        if (!cell) return;
        const row = cell.parentElement;
        const cellIndex = Array.from(row.children).indexOf(cell); // 0-based

        if (cellIndex === 1) {
          // "All" column toggled -> set/unset all day checkboxes in this row
          row.querySelectorAll('td:nth-child(n+3) input[type="checkbox"]').forEach(cb => {
            cb.checked = target.checked;
          });
        } else if (cellIndex >= 2) {
          // A day checkbox changed -> update the row's "All" checkbox
          const allCb = row.querySelector('td:nth-child(2) input[type="checkbox"]');
          if (allCb) {
            const boxes = row.querySelectorAll('td:nth-child(n+3) input[type="checkbox"]');
            allCb.checked = Array.from(boxes).every(cb => cb.checked);
          }
        }
      });

      table.dataset.bound = "1";
    }

    // Toggle between tables (no need to rebind — listeners are delegated & idempotent)
    document.getElementById("halfDayToggle").addEventListener("change", function () {
      const isChecked = this.checked;
      document.getElementById("checkboxOnlyTable").style.display = isChecked ? "none" : "";
      document.getElementById("checkboxDropdownTable").style.display = isChecked ? "" : "none";
    });

    // Bind listeners once
    bindRowAllSync(document.getElementById("checkboxOnlyTable"));
    bindRowAllSync(document.getElementById("checkboxDropdownTable"));

    // Save Button
    document.getElementById("saveBtn").addEventListener("click", function () {
      const activeTable = document.getElementById("halfDayToggle").checked
        ? document.getElementById("checkboxDropdownTable")
        : document.getElementById("checkboxOnlyTable");

      const checkboxes = activeTable.querySelectorAll('input[type="checkbox"]');
      const anyChecked = Array.from(checkboxes).some(cb => cb.checked);

      if (!anyChecked) {
        Swal.fire({
          icon: "error",
          title: "Please fill the fields",
          text: "You must select at least one checkbox before saving.",
          confirmButtonColor: "#d33",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Weekoff calendar has been saved successfully!",
        confirmButtonColor: "#3085d6",
      }).then(() => resetFields());
    });

    // Cancel Button
    document.getElementById("cancelBtn").addEventListener("click", resetFields);

    // Reset Function
    function resetFields() {
      document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
      document.querySelectorAll("select").forEach(sel => sel.value = "Full Day");
      document.getElementById("halfDayToggle").checked = false;
      document.getElementById("checkboxOnlyTable").style.display = "";
      document.getElementById("checkboxDropdownTable").style.display = "none";
      
    }
  });
