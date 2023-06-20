const buttonElement = document.getElementById("addButton");
const listElement = document.getElementById("list");
const nameInput = document.getElementById("name-input");
const commentInput = document.getElementById("comment-input");
const replyComment = document.querySelectorAll(".comment");
const textName = document.querySelectorAll(".add-form-name");
const textComment = document.querySelectorAll(".add-form-text");



// массив с данными существующих пользователей


let users = [];

// Делаем запрос на API

const fetchPromise = () => {
    fetch("https://wedev-api.sky.pro/api/v1/vlad-smirnov/comments",
    {
        method: "GET",
    })
    .then((response) => {
    return response.json()
    })
    .then((responseData) => {
      users = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: newDate(new Date(comment.date)),
          comments: comment.text,
          like: comment.likes,
          isLiked: false,
          active: ""
        };
      });
      renderUsers();
    })
}; 
fetchPromise();

// Добавление лайков

const likeFunctions = () => {
  const likeElements = document.querySelectorAll(".like-button");
  for (const likeElement of likeElements) {
    const index = likeElement.dataset.index;
    likeElement.addEventListener("click", (event) => {
      event.stopPropagation();
      if(!users[index].isLiked) {
        users[index].isLiked = true;
        users[index].active = "-active-like";
        users[index].like += 1
      } 
      else {
        users[index].isLiked = false;
        users[index].active = "";
        users[index].like -= 1
      } 
      renderUsers(); 
    }) 
  }; 
}; 

// ренедер функция

const renderUsers = () => {
  const usersHtml = users.map((user, index) => {
    return `<li class="comment" data-index="${index}">
      <div class="comment-header">
        <div> ${user.name}</div>
        <div>${user.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${user.comments}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${user.like}</span>
          <button class="like-button ${user.active}" data-index = ${index}></button>
        </div>
    </li>`
   }).join(''); 
   listElement.innerHTML = usersHtml; 
   likeFunctions();   
   

  // Функция ответа на комментарий 

  const userElements = document.querySelectorAll(".comment");
  const answerComment = () => {
  for (const userElement of userElements) {
    const index = userElement.dataset.index;
    userElement.addEventListener("click", () => {
      commentInput.value = `> ${users[index].comments}
      ${users[index].name}, `;    
      renderUsers();   
    })
  }; 

}; answerComment();   
}; renderUsers(); 


function newDate (date) {
let nowDate = date;
nowDate.setDate(nowDate.getDate());
let now = (nowDate.getDate());
let mounth = (nowDate.getMonth());
let year = nowDate.getFullYear();
let mounts = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
let time = nowDate.getHours();
let minuts = nowDate.setTime(nowDate.getMinutes()); return `${now}.${mounts[mounth]}.${year} ${time}:${minuts}`
}; name(new Date())






// Привязываем обработчик на кнопку добавить

buttonElement.addEventListener("click", () => {
  nameInput.classList.remove("error");
  commentInput.classList.remove("error");
  if (nameInput.value === "") {
    nameInput.classList.add("error"); return
  } else if (commentInput.value === "") {
    commentInput.classList.add("error"); return
  }; 
  buttonElement.disabled = true;
  buttonElement.textContent = "Добавляем";
  
  fetch("https://wedev-api.sky.pro/api/v1/vlad-smirnov/comments",
  {
    method: "POST",
    body: JSON.stringify(
        {
            date: newDate(new Date()),
            likes: 0,
            isLiked: false,
            text: commentInput.value,
            name: nameInput.value,
            active: ""
        })
    })
    .then((response) => {
        buttonElement.textContent = "Загружаем";
        return response;
    })
    .then((response) => {
        return response.json()
    })
    .then((responseData) => {
        users = responseData.comments;
        fetchPromise();
    })
    .then(() => {
        return fetchPromise();
    })
    .then((r) => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      })
    
    
    
    renderUsers();

 

  
  nameInput.value = "";
  commentInput.value = "";
}); 

  
"use strict";  
console.log("It works!");