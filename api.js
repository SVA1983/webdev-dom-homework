import { dataTime } from "./data.js";

export const fetchPromise = () => {
    return fetch("https://wedev-api.sky.pro/api/v1/vlad-smirnov/comments",
    {
        method: "GET",
    })
    .then((response) => {
    return response.json()
    })
    .then((responseData) => {
      return responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: dataTime(new Date(comment.date)),
          comments: comment.text,
          like: comment.likes,
          isLiked: false,
          active: ""
        };
      });
    });   
}; 

export const fetchPost = (text, name) => {
    return fetch("https://wedev-api.sky.pro/api/v1/vlad-smirnov/comments",
    {
        method: "POST",
        body: JSON.stringify(
        { 
            text: text,
            name: name,
        })
    })
};
    
    