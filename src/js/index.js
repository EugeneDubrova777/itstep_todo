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
import '../scss/index.scss';
import Task from './task';

let tasks = JSON.parse(window.localStorage.getItem('tasks'));

if(!tasks) {
  tasks = [];
}

console.log(tasks);

function renderList() {
  const list = $('.tasks');
  list.html(null);
  tasks.forEach((el, i) => {
    addTaskToList(el, i);
  });
}

function addTaskToList(task, i) {
  const list = $('.tasks');
  const li = $(`<li class="${task.status}">${i + 1}. ${task.name}</li>`);
  const doneButton = $('<button>Do!</button>');
  doneButton.click(() => {
    tasks.forEach((item, index, tasks) => {
      if(item.id == task.id) {
        tasks[index].status = 'done';
      }
    });
    renderList();
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  });
  const removeButton = $('<button>Remove</button>');
  removeButton.click(() => {
    if(confirm('???')) {
      tasks.forEach((item, index, tasks) => {
        if(item.id == task.id) {
          tasks.splice(index, 1);
        }
      });
      renderList();
      window.localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });




  li.append(removeButton);
  li.append(doneButton);
  list.append(li);
}


$('#add-task').click(function() {
  let text = $('#task').val();
  $('#task').val(null);

  if (!text) {
    alert('enter fckn text');
    return;
  }

  const task = new Task(uuidv4(), text, 'in-progress');

  tasks.push(task); 
  addTaskToList(task);
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
});

renderList();





