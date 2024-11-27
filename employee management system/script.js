class Employee {
    constructor(name, id, skill, doj, department) {
        this.name = name;
        this.id = id;
        this.skill = skill;
        this.doj = new Date(doj);
        this.department = department;
    }

    calculateExperience() {
        const today = new Date();
        const experienceInMs = today - this.doj;
        const experienceInYears = Math.floor(experienceInMs / (1000 * 60 * 60 * 24 * 365.25));
        return experienceInYears;
    }
}

let employees = [];

function addEmployee() {
    const name = document.getElementById("name").value;
    const id = document.getElementById("id").value;
    const skill = document.getElementById("skill").value;
    const doj = document.getElementById("doj").value;
    const department = document.getElementById("department").value;

    if (!name || !id || !skill || !doj || !department) {
        alert("Please fill in all fields!");
        return;
    }

    const newEmployee = new Employee(name, id, skill, doj, department);
    employees.push(newEmployee);
    alert("Employee added successfully!");

    clearFormFields();
}

function removeEmployee() {
    const id = document.getElementById("remove-id").value;

    const index = employees.findIndex(emp => emp.id === id);
    if (index === -1) {
        alert("Employee not found!");
        return;
    }

    employees.splice(index, 1);
    alert("Employee removed successfully!");

    document.getElementById("remove-id").value = ''; // Clear the input field
}

function searchEmployee() {
    const id = document.getElementById("search-id").value;
    const employee = employees.find(emp => emp.id === id);

    const detailsDiv = document.getElementById("employee-details");

    if (employee) {
        const experience = employee.calculateExperience();
        detailsDiv.innerHTML = `
            <div class="employee-detail"><span>Name:</span> ${employee.name}</div>
            <div class="employee-detail"><span>Employee ID:</span> ${employee.id}</div>
            <div class="employee-detail"><span>Skill:</span> ${employee.skill}</div>
            <div class="employee-detail"><span>Date of Joining:</span> ${employee.doj.toLocaleDateString()}</div>
            <div class="employee-detail"><span>Department:</span> ${employee.department}</div>
            <div class="employee-detail"><span>Experience:</span> ${experience} years</div>
        `;
        detailsDiv.style.display = "block"; // Show the employee details
    } else {
        detailsDiv.innerHTML = "Employee not found!";
        detailsDiv.style.display = "block"; // Show the 'not found' message
    }
}

function clearFormFields() {
    document.getElementById("name").value = '';
    document.getElementById("id").value = '';
    document.getElementById("skill").value = '';
    document.getElementById("doj").value = '';
    document.getElementById("department").value = '';
}
