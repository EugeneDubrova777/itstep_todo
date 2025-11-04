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

function addTaskToList(task) {
  const list = $('.tasks');
  list.append(`<li class="${task.status}">${task.name}</li>`);
  tasks.push(task);
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
}

$(document).ready(function() {
  tasks.forEach(el => {
    addTaskToList(el);
  });

  $('#add-task').click(function() {
    let text = $('#task').val();
    $('#task').val(null);

    if (!text) {
      alert('enter fckn text');
      return;
    }

    const task = new Task(uuidv4(), text, 'in-progress');

    addTaskToList(task);
  });
});






