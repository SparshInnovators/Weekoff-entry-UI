const halfToggle = document.getElementById('halfDayToggle');


halfToggle.addEventListener('change', () => {
  document.querySelectorAll('.cell').forEach(cell => {
    const chk = cell.querySelector('.day-check');
    const sel = cell.querySelector('.day-select');

    if (halfToggle.checked && chk.checked) {
      sel.classList.remove('hidden');
    } else {
      sel.classList.add('hidden');
    }
  });
});


document.querySelectorAll('.day-check').forEach(chk => {
  chk.addEventListener('change', function () {
    const sel = this.parentElement.querySelector('.day-select');
    if (halfToggle.checked && this.checked) {
      sel.classList.remove('hidden');
    } else {
      sel.classList.add('hidden');
    }
  });
});

document.querySelectorAll('.grid.grid-cols-7.gap-2.items-center').forEach((row, rowIndex) => {
  const cells = row.querySelectorAll('.cell');
  
  if (cells.length > 0) {
 
    const allCheckbox = cells[0].querySelector('.day-check');
    const allSelect = cells[0].querySelector('.day-select');
    
    if (allCheckbox) {
 
      allCheckbox.addEventListener('change', function() {
        const isChecked = this.checked;
        
     
        cells.forEach((cell, cellIndex) => {
          if (cellIndex > 0) { 
            const checkbox = cell.querySelector('.day-check');
            const select = cell.querySelector('.day-select');
            
            if (checkbox) {
              checkbox.checked = isChecked;
              
       
              if (halfToggle.checked && isChecked) {
                select.classList.remove('hidden');
              } else {
                select.classList.add('hidden');
              }
            }
          }
        });
        
      
        if (halfToggle.checked && isChecked) {
          allSelect.classList.remove('hidden');
        } else {
          allSelect.classList.add('hidden');
        }
      });
      
      cells.forEach((cell, cellIndex) => {
        if (cellIndex > 0) {
          const checkbox = cell.querySelector('.day-check');
          if (checkbox) {
            checkbox.addEventListener('change', function() {

              let allChecked = true;
              cells.forEach((c, i) => {
                if (i > 0) {
                  const cb = c.querySelector('.day-check');
                  if (cb && !cb.checked) {
                    allChecked = false;
                  }
                }
              });
              
        
              allCheckbox.checked = allChecked;
            });
          }
        }
      });
    }
  }
});