document.addEventListener('DOMContentLoaded', function(){
    const userInput = document.getElementById('user-input');
    const button = document.getElementById('user-btn');
    const statsContainer = document.querySelector(".stats-container");
    const statsProgress = document.querySelector(".stats-progress");
    const progressItem = document.querySelector(".progress-item");
    const easyProgess = document.querySelector(".easy-progress");
    const mediumProgress = document.querySelector(".medium-progress");
    const hardProgess = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");


    function validateUsername(username){
        if(username.trim()===""){
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
    }

    async function fetchUserDetails(username){
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        
    }

    button.addEventListener('click', function(){
        const username = userInput.value;
        console.log(username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })

})