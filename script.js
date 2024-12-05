// Fetch or Save employees in localStorage
function getEmployees() {
    return JSON.parse(localStorage.getItem("employees")) || [];
}

function saveEmployees(employees) {
    localStorage.setItem("employees", JSON.stringify(employees));
}

// Handle Form Submission
document.getElementById("registrationForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const about = document.getElementById("about").value;
    const joiningDate = document.getElementById("joining_date").value;

    const employees = getEmployees();
    employees.push({ name, position, about, joiningDate });
    saveEmployees(employees);

    window.location.href = "listing.html";
});

// Display Employees with Pagination
if (window.location.pathname.endsWith("listing.html")) {
    const employees = getEmployees();
    const rowsPerPage = 5;
    let currentPage = 1;

    function renderEmployees() {
        const tableBody = document.getElementById("employeeTable");
        tableBody.innerHTML = "";

        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        employees.slice(start, end).forEach((employee, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.position}</td>
                <td>${employee.about}</td>
                <td>${employee.joiningDate}</td>
                <td><button onclick="deleteEmployee(${start + index})">Delete</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    function renderPagination() {
        const pagination = document.getElementById("pagination");
        pagination.innerHTML = "";

        const totalPages = Math.ceil(employees.length / rowsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.onclick = () => {
                currentPage = i;
                renderEmployees();
            };
            pagination.appendChild(button);
        }
    }

    window.deleteEmployee = (index) => {
        employees.splice(index, 1);
        saveEmployees(employees);
        renderEmployees();
        renderPagination();
    };

    renderEmployees();
    renderPagination();
}
