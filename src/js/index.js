// class Product {
//   constructor(id, name) {
//     this.id = id;
//     this.name = name;
//   }
// }

// let storageCart = JSON.parse(window.localStorage.getItem('cart'));

// let cart = storageCart ? storageCart : [];

// const bread = new Product(1, 'big bread');
// const tea = new Product(2, 'black tea');

// cart.push(bread);
// cart.push(tea);

// let jsonCart = JSON.stringify(cart);

// window.localStorage.setItem('cart', jsonCart);


import $ from 'jquery';
import { v4 as uuidv4 } from 'uuid';
import Task from './task.js';
import '../scss/index.scss';

let tasks = JSON.parse(window.localStorage.getItem('tasks'));

if(!tasks) {
  tasks = [];
}

function addTaskToList(task) {
  const list = $('.tasks');
  const li = $(`<li class="${task.status}">${task.name}</li>`);
  const buttons = $('<div class="btns"></div>')
  const doneButton = $('<button class="btn do">&#10004;</button>');
  const removeButton = $('<button class="btn rem">&#10006;</button>');

  doneButton.click(() => {
    tasks.forEach((item, index, tasks) => {
      if(item.id == task.id) {
        tasks[index].status = 'done';
      }
    });

  window.localStorage.setItem('tasks', JSON.stringify(tasks));
    renderList();
  });

  removeButton.click(() => {
  if(confirm('Delete?')){
    tasks.forEach((item, index, tasks) => {
      if(item.id == task.id) {
        tasks.splice(index,1);
      }
    });

    window.localStorage.setItem('tasks', JSON.stringify(tasks));
        renderList();
      }
    });

  li.append(buttons);
  buttons.append(doneButton);
  buttons.append(removeButton);
  list.append(li);
}

function renderList() {
  const list = $(".tasks");
  list.html(null);

  tasks.forEach(function(item){
    addTaskToList(item);
  });
}
    
$('#add-task').click(function(){
  let text = $('#task').val();

  $('#task').val(null);

  if(!text) {
    alert('enter fckn text');
      return;
  }

  const task = new Task(uuidv4(), text, 'in-progress');
  tasks.push(task);

  addTaskToList(task);

  window.localStorage.setItem('tasks', JSON.stringify(tasks));
});

renderList();
