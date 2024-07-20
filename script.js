// all element which needed for coding

const input = document.getElementById('input');
const list = document.getElementById('list');
const addBtn = document.getElementById('add');
const tick = document.getElementById('tick');
const doubleTick = document.getElementById('doubleTick');
const clearBtn = document.getElementById('clear');
const taskCounter = document.getElementById('taskCounter');
const completeCounter = document.getElementById('completeCounter');
const uncompleteCounter = document.getElementById('uncompleteCounter');

addBtn.addEventListener('click', () => {
    addToList();
});

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addToList();
    }
});
//this function is used to get the input and pass the input to createList function
function addToList() {
    const value = input.value.trim();
    if (!value) {
        alert('Please enter your task');
    } else {
        createList(value);
        input.value = '';
        updateTaskCounters();
    }
}
//creating a list item by a value and append that value in listDiv
function createList(value) {
    const card = `
        <div class="listDiv">
            <label class="custom-checkbox">
                <input type="checkbox" />
                <span class="checkmark"></span>
                <span class="listText">${value}</span>
            </label>
            <button class="deleteBtn">Delete</button>
        </div>`;
    list.insertAdjacentHTML('beforeend', card);
    
    //to delete a taks from the list
    const newDeleteBtn = list.querySelector('.listDiv:last-child .deleteBtn');
    newDeleteBtn.addEventListener('click', deleteTask);
    
    //used to upadate task counter
    const newCheckbox = list.querySelector('.listDiv:last-child .custom-checkbox input[type="checkbox"]');
    newCheckbox.addEventListener('change', updateTaskCounters);
}

// this function takes value and delete that paricular task from list
function deleteTask(event) {
    const listItem = event.target.closest('.listDiv');
    listItem.remove();
    updateTaskCounters();
}

// this function select all the list item
tick.addEventListener('click', () => {
    const checkboxes = list.querySelectorAll('.custom-checkbox input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
    doubleTick.style.color = 'blue';
    updateTaskCounters();
});

//this event is used to delete the all completed task from the list
clearBtn.addEventListener('click', () => {
    const checkboxes = list.querySelectorAll('.custom-checkbox input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        const listItem = checkbox.closest('.listDiv');
        listItem.remove();
    });
    doubleTick.style.color = '';
    updateTaskCounters();
});

// this function is to update list tasks like completed or uncomplete and how many tasks are left in the list
function updateTaskCounters() {
    const totalTasks = list.querySelectorAll('.listDiv').length;
    const completedTasks = list.querySelectorAll('.custom-checkbox input[type="checkbox"]:checked').length;
    const uncompletedTasks = totalTasks - completedTasks;
    
    taskCounter.textContent = totalTasks;
    completeCounter.textContent = completedTasks;
    uncompleteCounter.textContent = uncompletedTasks;
}

updateTaskCounters();
