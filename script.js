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
let tbody = document.getElementById('tbody')

let gid = "";

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
        tr.id = `row${index}`
        tr.innerHTML = `
            <td>${element.ID}</td>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.age}</td>
            <td>${element.grade}</td>
            <td id="ed">${element.degree}
                 <button  class="editable" onclick="saveEditedData(row${index})">edit</button>
                 <button  onclick="delete(row${index})">delete</button> 
            </td>
        `
        // console.log(index + 1)
        tbody.appendChild(tr);
    });
}

function displayDesiredStudents(desiredStudents){
    let tbody = document.getElementById('tablebody');
    removeTableRows();
    desiredStudents.forEach((element,index) => {
        let tr = document.createElement('tr');
        tr.id = `row${index}`
        tr.innerHTML = `
            <td>${element.ID}</td>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.age}</td>
            <td>${element.grade}</td>
            <td id="ed">${element.degree}
                 <button  class="editable" onclick="saveEditedData(row${index})">edit</button>
                 <button  onclick="delete(row${index})">delete</button> 
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
        displayAllStudents();
        return;
     } else{
          let allStudents = JSON.parse(localStorage.getItem("allStudents"));
          console.log(allStudents)
          let allDesiredStudents = allStudents.filter((element) => {
             return (element.name.toLowerCase() === input || element.email.toLowerCase() === input || element.degree.toLowerCase() === input);
          })
          displayDesiredStudents(allDesiredStudents);
     }
    
   

    // for(let i=0;i<allStudents.length;i++){
    //     let element = allStudents[i];
    //     // console.log(element)
    //     if{
    //         form.name.value = element.name;
    //         form.email.value = element.email;
    //         form.cgpa.value = element.grade;
    //         form.age.value  = element.age;
    //         form.degree.value = element.degree;
    //         // console.log( form.name.value,form.email.value,form.cgpa.value,form.age.value,form.degree.value)
    //         // editButton.style.display = "block";
    //         addButton.style.display = 'none';
    //         // index = i;
    //         // allStudents.splice(i, 1);
    //         // console.log(allStudents)
    //         // console.log(JSON.parse(localStorage.getItem("allStudents")))
    //         // allStudents.remove(allStudents[i]);
    //         // localStorage.setItem("allStudents",JSON.stringify(allStudents))
    //     }
    // // }
    

}

function saveEdited() {
    if(gid === "") return;
    console.log("clicked")
    console.log(gid);
    let row = document.getElementById(gid);
    let updatedName = form.name.value;
    let updatedEmail = form.email.value ;
    let updatedCgpa = form.cgpa.value;
    let updatedAge = form.age.value;
    let updatedDegree = form.degree.value;

    row.querySelector('td:nth-child(2)').innerHTML = updatedName;
    row.querySelector('td:nth-child(3)').innerHTM =updatedEmail;
    row.querySelector('td:nth-child(5)').innerHTML = updatedCgpa;
    row.querySelector('td:nth-child(4)').innerHTML = updatedAge;
    row.querySelector('td:nth-child(6)').firstChild.textContent = updatedDegree;
    form.reset();
    editButton.style.display = "none";
    addButton.style.display = "block"

}
function saveEditedData(row){
    // let allStudents = JSON.parse(localStorage.getItem("allStudents"));
    editButton.style.display = "block";
    addButton.style.display = "none"
    gid = row.id;
    // console.log(currId)
    // let row = document.getElementById(currId);
    // console.log(row)
    form.name.value = row.querySelector('td:nth-child(2)').innerHTML;
    form.email.value = row.querySelector('td:nth-child(3)').innerHTML;
    form.cgpa.value = row.querySelector('td:nth-child(5)').innerHTML;
    form.age.value  = row.querySelector('td:nth-child(4)').innerHTML;
    form.degree.value = row.querySelector('td:nth-child(6)').firstChild.textContent;
    console.log(gid)
}





addButton.addEventListener('click',addStudent);
searchButton.addEventListener('input',serach_name_email_degree);
editButton.addEventListener('click',saveEdited)
// editbtn.addEventListener('click',saveEditedData);

