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
    // const statsContainer = document.querySelector(".stats-container");


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
        return isMatching;
    }

    async function fetchUserDetails(username){
        // const url = 'https://leetcode.com/graphql/';
        // const myHeaders = new Headers();
        // myHeaders.append("content-type", "application/json");
        try{
            button.textContent = "Searching...";
            button.disabled = true;
            //statsContainer.classList.add("hidden");

            // const response = await fetch(url);
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/' 
            const targetUrl = 'https://leetcode.com/graphql/';
            
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");

            const graphql = JSON.stringify({
                query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
                variables: { "username": `${username}` }
            })
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
            };

            const response = await fetch(proxyUrl+targetUrl, requestOptions);
            if(!response.ok) {
                throw new Error("Unable to fetch the User details");
            }
            const parsedData = await response.json();
            console.log("Logging data: ", parsedData) ;

            // displayUserData(parsedData);
        }
        catch(error) {
            statsContainer.innerHTML = `<p>${error.message}</p>`
        }
        finally {
            button.textContent = "Search";
            button.disabled = false;
        }
        
    }

    button.addEventListener('click', function(){
        const username = userInput.value;
        console.log(username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })

})