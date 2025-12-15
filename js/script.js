import Student from "./student.js";

let filterBy = {
    'column': 'id',
    'asc' : true
}; // Default sort by ID

// Function to render students in the table
const displayStudents = async function(){
    const tableBody = document.querySelector('.lise-of-students');
    try {
        const response = await Student.all();

        // Sort students based on filterBy
        response.sort((a, b) => {
            const col = filterBy.column;
            const valA = a[col];
            const valB = b[col];

            // Check if the column is 'note' (which is a number) or 'id' (which is a string number)
            if (col === 'id' || col === 'note') {
                if (filterBy.asc) {
                    return Number(valA) - Number(valB); // Ascending
                }
                else {
                    return Number(valB) - Number(valA); // Descending
                }
            } else {
                // For other columns, use string comparison
                if (filterBy.asc) {
                    return String(valA).localeCompare(String(valB)); // Ascending
                } else {
                    return String(valB).localeCompare(String(valA)); // Descending
                }
            }
        });

        const studentsHtml = response.map((student) => {
            const {id, name, birthDate, major, note} = student;
            const age = Student.calculateAge(birthDate);
            const mark = Student.isAdmitted(note);
            return `
                <tr data-id="${id}">
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>${age} y</td>
                    <td>${major}</td>
                    <td><span class="badge rounded-pill ${mark === 'Admitted' ? 'bg-success' : 'bg-danger'}">
                        ${note} / ${Student.MAX_NOTE}</span></td>
                    <td>${mark}</td>
                    <td>
                        <button class="btn btn-sm btn-primary">Edit</button>
                        <button class="btn btn-sm btn-danger">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');

        tableBody.innerHTML = studentsHtml || '<tr><td colspan="5" class="text-center">No students found</td></tr>';
    } catch (error) {
        console.error('Error fetching students:', error);
        const tableBody = document.querySelector('.lise-of-students');
        tableBody.innerHTML = '<tr><td colspan="5" class="text-center text-danger">Error loading students</td></tr>';
    }
}

// Initial render
displayStudents();

// Add reload button functionality
document.getElementById('reloadBtn').addEventListener('click', () => {
    displayStudents();
})

// Handle form submission
document.getElementById('createStudentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        birthDate: document.getElementById('birthDate').value,
        major: document.getElementById('major').value,
        note: document.getElementById('note').value
    };

    try {
        await Student.create(formData);
        // Reset form
        e.target.reset();
        // Refresh the table
        displayStudents();
    } catch (error) {
        console.error('Error creating student:', error);
    }
});
// Delete student functionality
const tableBody = document.querySelector('.lise-of-students');

tableBody.addEventListener('click', async (e) => {
  // match the Delete button
  if (!e.target.classList.contains('btn-danger')) return;

  const row = e.target.closest('tr');
  if (!row) return;

  // id from data attribute
  const id = row.dataset.id;
  if (!id) {
    console.error('No id found for row', row);
    return;
  }

  if (!confirm('Delete this student?')) return;

  try {
    // Option A: remove row immediately (optimistic)
    // row.remove();

    // Option B: wait for server then refresh
    await Student.delete(id);
    // Refresh table (safe and simple)
    displayStudents();
      } catch (err) {
    console.error('Delete failed', err);
    alert('Could not delete student. See console for details.');
  }
});

// Sorting functionality
const tableHeader = document.querySelector('thead');
tableHeader.addEventListener('click', (e) => {
    const th = e.target.closest('th');
    if (!th) return;

    const column = th.dataset.column;
    if (!column) return;

    // Remove sorting indicators from all columns
    document.querySelectorAll('th[data-column]').forEach(th => {
        const span = th.querySelector('span');
        if (span) {
            span.innerHTML = '';
        }
    });

    if (filterBy.column === column) {
        filterBy.asc = !filterBy.asc;
    } else {
        filterBy.column = column;
        filterBy.asc = true;
    }

    // Add sorting indicator to the clicked column
    const indicator = filterBy.asc ? '&uarr;' : '&darr;';
    const currentTh = document.querySelector(`th[data-column="${column}"]`);
    if (currentTh) {
        const span = currentTh.querySelector('span');
        if (span) {
            span.innerHTML = ` <span class="text-warning">${indicator}</span>`;
        }
    }


    displayStudents();
});