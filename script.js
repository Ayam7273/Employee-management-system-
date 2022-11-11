class Employee {
    constructor(id, name, position, salary, department){
             this.id = id;
             this.name = name;
             this.position = position;
             this.salary = salary;
             this.department = department;
             this.createdAt = new Date();
             this.startDate = new Date();
             this.onLeave = false;
    }
}

class EmployeeManagement {
    baseId = 0;
    employees = []
    attendance = []

    createEmployee (name, position, salary, department) {
        let employee = new Employee(this.baseId++, name, position, salary, department)
        this.employees.push(employee)
    }

    getAllEmployees () {
        return this.employees
    }

    getEmployee (id) {
        let employee = this.employees.find(em => em.id === id)
        return employee
    }

    updateEmployee (id, updateInfo) {
        let getAllEmployees = this.employees.map(employee => {
            if (employee.id ===id){
                return{...employee, 
                ...updateInfo
              } 
            } else {
                return employee
            }
            
        })
        this.employees = allEmployees
    }

    deleteEmployee (id) {
        let newEmployees = this.employees.filter(x => x.id !== id)
        this.employees = newEmployees
        return `Deleted Employee with the id of ${id}`
    }

    markAttendance (employeeId) {
        let attendanceobj = {
            employeeId: employeeId,
            timeEntered: new Date()
        }
        
        this.attendance.push(attendanceobj)
    }
}

let employeeMgmtApp = new EmployeeManagement()


const create = document.querySelector('#create')
const createBtn = document.querySelector('#create-btn')
const tableBody = document.querySelector('table tbody')
const createForm = document.querySelector('#create-form')
const nameInput = document.querySelector('#name')
const positionInput = document.querySelector('#position')
const salaryInput = document.querySelector('#salary')
const departmentInput = document.querySelector('#department')
const closeBtn = document.querySelector('#close')
const metrics = document.querySelectorAll('.metrics h1')

//Btn to show the form

createBtn.addEventListener('click', () =>{
    create.style.display = 'flex'
})
//Btn to hide theform
closeBtn.addEventListener('click', () => {
    create.style.display ='none'
})
//Handle to submit event and create employee
createForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
  //  employee Creation
    employeeMgmtApp.createEmployee(
        nameInput.value,
        positionInput.value,
        Number(salaryInput.value),
        departmentInput.value
    )
    showEmployees()
})


function showEmployees(){
    let employees = employeeMgmtApp.getAllEmployees()
    let records = employees.map(employee => {
        return `
        <tr>
          <td>${employee.id}</td>
          <td>${employee.name}</td>
          <td>${employee.position}</td>
          <td>${employee.salary}</td>
          <td>${employee.department}</td>
          </tr>
        `
    })
    tableBody.innerHTML = records.join('')
}