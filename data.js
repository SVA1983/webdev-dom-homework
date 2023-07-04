
export const dataTime = (date) => {
    let nowDate = date;
    nowDate.setDate(nowDate.getDate());
    let now = (nowDate.getDate());
    let mounth = (nowDate.getMonth());
    let year = nowDate.getFullYear();
    let mounts = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    let time = nowDate.getHours();
    let minuts = nowDate.setTime(nowDate.getMinutes()); return `${now}.${mounts[mounth]}.${year} ${time}:${minuts}`
}; dataTime (new Date());

export const getListUsersEdit = (user, index) => {
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
}

