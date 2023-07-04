const students = [
     { ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
     { ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' }, 
     { ID: 3, name: 'Charlie', age: 20, grade: 'C', degree:'Arts', email: 'charlie@example.com' }
];

localStorage.setItem("allStudents", JSON.stringify(students));

if(localStorage.getItem('allStudents') === null){
    localStorage.setItem("allStudents", JSON.stringify(students));
}

displayAllStudents();
let form = document.getElementById('form');
let addButton = document.getElementById('btn');
let searchButton = document.getElementById('search');
let editButton = document.getElementById('edit');
let editbtn = document.getElementById('editbtn');



index = -1;

function removeTableRows() {
    let  table = document.getElementById("students");
    let rowCount = table.rows.length;
    
    // Start from the last row and remove each row
    for (let i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

function displayAllStudents(){
    let allStudents = JSON.parse(localStorage.getItem("allStudents"));
    // console.log(allStudents)
    let tbody = document.getElementById('tablebody');
    removeTableRows();
    // console.log(tbody)
    
    allStudents.forEach((element,index) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${element.ID}</td>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.age}</td>
            <td>${element.grade}</td>
            <td id="ed">
              <div>${element.degree}</div>
              <div class="ed1">
                 <button  onclick="saveEditedData()">edit</button>
                 <button id="delete">delete</button> 
               </div>
            </td>
        `
        // console.log(index + 1)
        tbody.appendChild(tr);
    });
}

function addStudent() {
    let allStudents = JSON.parse(localStorage.getItem("allStudents"));
    // console.log(allStudents)
    let id = allStudents.length + 1;
    let name = form.name.value;
    let email = form.email.value;
    let age = form.age.value;
    let grade = form.cgpa.value;
    let degree = form.degree.value;
    let student = { ID: id, name: name, age: age, grade: grade, degree: degree, email: email };
    allStudents.push(student);
    localStorage.setItem("allStudents", JSON.stringify(allStudents));
    displayAllStudents();
    form.reset()
    // console.log(JSON.parse(localStorage.getItem("allStudents")))
    
}




function serach_name_email_degree(event) {
     event.preventDefault();
     const input = event.target.value.toLowerCase();
     if(input === ""){
        form.reset();
        // editButton.style.display = "none";
        addButton.style.display = 'block';
        return;
     } 
    // console.log(input)
    let allStudents = JSON.parse(localStorage.getItem("allStudents"));
    console.log(allStudents)
    for(let i=0;i<allStudents.length;i++){
        let element = allStudents[i];
        // console.log(element)
        if(element.name.toLowerCase() === input || element.email.toLowerCase() === input || element.degree.toLowerCase() === input){
            form.name.value = element.name;
            form.email.value = element.email;
            form.cgpa.value = element.grade;
            form.age.value  = element.age;
            form.degree.value = element.degree;
            // console.log( form.name.value,form.email.value,form.cgpa.value,form.age.value,form.degree.value)
            // editButton.style.display = "block";
            addButton.style.display = 'none';
            // index = i;
            // allStudents.splice(i, 1);
            // console.log(allStudents)
            // console.log(JSON.parse(localStorage.getItem("allStudents")))
            // allStudents.remove(allStudents[i]);
            // localStorage.setItem("allStudents",JSON.stringify(allStudents))
        }
    }
    

}

function saveEditedData(){
    let allStudents = JSON.parse(localStorage.getItem("allStudents"));
    editButton.style.display = "block";
    addButton.style.display = "none"
    let button = editbtn.parentNode.parentNode.parentNode.firstElementChild.value;
    console.log(button);
    if(index !== -1){
        let currData = allStudents[index];
        index = -1;
        currData.name = form.name.value;
        currData.email = form.email.value;
        currData.age = form.age.value;
        currData.grade = form.cgpa.value;
        currData.degree = form.degree.value;
    // let student = { ID: id, name: name, age: age, grade: grade, degree: degree, email: email };
    // allStudents.push(student);
    localStorage.setItem("allStudents", JSON.stringify(allStudents));
    displayAllStudents();
    form.reset()
    }else{
        return;
    }
    console.log(allStudents)
    
}


addButton.addEventListener('click',addStudent);
searchButton.addEventListener('input',serach_name_email_degree);
// editbtn.addEventListener('click',saveEditedData);

