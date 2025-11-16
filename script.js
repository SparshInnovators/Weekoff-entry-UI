document.addEventListener('DOMContentLoaded', () => {
    
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const colHeaders = ['', 'All', '1st', '2nd', '3rd', '4th', '5th'];

    const gridContainer = document.getElementById('calendarGrid');
    const halfDayToggle = document.getElementById('halfDayModeToggle');
    const toggleBtn = document.getElementById('toggleBtn');
    const mainCard = document.getElementById('mainCard');
    const contentArea = document.getElementById('contentArea');
    const footerArea = document.getElementById('footerArea');

    //The Main Render Function
    function renderCalendar() {
        //Define the Column Layout
        gridContainer.style.gridTemplateColumns = '120px 80px repeat(5, 1fr)';

        //Create Header Row
        colHeaders.forEach((text, index) => {
            const headerCell = document.createElement('div');
            headerCell.textContent = text;
            headerCell.className = 'text-center text-sm font-semibold text-gray-600 pb-2 bg-gray-200';
            
            if (index === 0) {
                headerCell.className += ' sticky left-0 z-30';
            } else if (index === 1) {
                headerCell.className += ' sticky left-[120px] z-30';
            }
            
            gridContainer.appendChild(headerCell);
        });

        //Create Rows for Each Day
        daysOfWeek.forEach((day, dayIndex) => {
            
            //Day Name Label (Sticky Left)
            const dayLabel = document.createElement('div');
            dayLabel.textContent = day;
            dayLabel.className = 'sticky left-0 z-20 bg-white items-center px-3 py-2 text-sm text-gray-700 font-medium rounded';
            gridContainer.appendChild(dayLabel);

            //"All" Checkbox Cell (Sticky Left)
            const allCell = document.createElement('div');
            allCell.className = 'sticky left-[120px] z-20 bg-white border border-gray-200 flex justify-center items-center rounded';
            
            const allCheckbox = document.createElement('input');
            allCheckbox.type = 'checkbox';
            allCheckbox.className = 'custom-checkbox all-trigger';
            allCheckbox.dataset.row = dayIndex;
            
            allCell.appendChild(allCheckbox);
            gridContainer.appendChild(allCell);

            //The 5 Occurrence Cells (Scrollable)
            for (let i = 1; i <= 5; i++) {
                const cell = document.createElement('div');
                cell.className = 'bg-white border border-gray-200 flex justify-center items-center rounded p-1';
                
                const controlContainer = document.createElement('div');
                controlContainer.className = 'flex items-center justify-center w-full gap-1.5 px-1';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'custom-checkbox single-trigger shrink-0';
                checkbox.dataset.row = dayIndex;

                const select = document.createElement('select');
                select.className = 'custom-select half-day-select hidden';
                select.innerHTML = `
                    <option>Full Day</option>
                    <option>1st Half</option>
                    <option>2nd Half</option>
                `;

                controlContainer.appendChild(checkbox);
                controlContainer.appendChild(select);
                cell.appendChild(controlContainer);
                gridContainer.appendChild(cell);
            }
        });
    }

    //Switching Views (Simple vs Half-Day)
    function toggleHalfDayMode() {
        const isHalfDay = halfDayToggle.checked;
        const dropdowns = document.querySelectorAll('.half-day-select');
        const grid = document.getElementById('calendarGrid');
        
        // This targets the container of the checkbox/dropdown
        const controlContainers = document.querySelectorAll('.single-trigger');

        if (isHalfDay) {
            dropdowns.forEach(el => el.classList.remove('hidden'));
            grid.classList.add('min-w-[900px]');
            controlContainers.forEach(el => el.parentElement.classList.remove('justify-center'));
        } else {
            dropdowns.forEach(el => el.classList.add('hidden'));
            grid.classList.remove('min-w-[900px]');
            controlContainers.forEach(el => el.parentElement.classList.add('justify-center'));
        }
    }

    //Checkbox Synchronization
    function handleCheckboxLogic(e) {
        if (!e.target.matches('input[type="checkbox"]')) return;

        const target = e.target;
        const rowId = target.dataset.row;

        if (target.classList.contains('all-trigger')) {
            const rowCheckboxes = document.querySelectorAll(`.single-trigger[data-row="${rowId}"]`);
            rowCheckboxes.forEach(cb => cb.checked = target.checked);
        } 
        else if (target.classList.contains('single-trigger')) {
            const rowCheckboxes = Array.from(document.querySelectorAll(`.single-trigger[data-row="${rowId}"]`));
            const allCheckbox = document.querySelector(`.all-trigger[data-row="${rowId}"]`);
            
            const allChecked = rowCheckboxes.every(cb => cb.checked);
            allCheckbox.checked = allChecked;
        }
    }

    //Expand-Collapse Modal
    function toggleCollapse() {
        const isCollapsed = mainCard.classList.contains('collapsed');

        if (isCollapsed) {
            mainCard.classList.remove('collapsed');
            toggleBtn.innerHTML = '&times;';
            contentArea.style.maxHeight = '1000px';
            footerArea.style.maxHeight = '100px';
            footerArea.style.padding = '1.25rem';
        } else {
            mainCard.classList.add('collapsed');
            toggleBtn.innerHTML = '&#8964;';
            contentArea.style.maxHeight = '0px';
            footerArea.style.maxHeight = '0px';
            footerArea.style.padding = '0px';
        }
    }

    //Initialization
    renderCalendar();
    
    //Event Listeners
    halfDayToggle.addEventListener('change', toggleHalfDayMode);
    gridContainer.addEventListener('change', handleCheckboxLogic);
    toggleBtn.addEventListener('click', toggleCollapse);
});