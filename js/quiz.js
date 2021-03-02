var questions = [
    {
        title: "When a user views a page containing a JavaScript program, which machine actually executes the script? ",
        choices: ["The User's machine running a Web browser ", "The Web server ", "A central machine deep within Netscape's corporate offices ", "None of the above "],
        answer: "The User's machine running a Web browser "
    },
    {
        title: "______ JavaScript is also called client-side JavaScript.",
        choices: ["Navigator", "microsoft", "Apple", "BCS"],
        answer: "Navigator"
    },
    {
        title: "Which types of image maps can be used with JavaScript? ",
        choices: ["Server-side image maps", "Client-side image maps", "Browser image maps", "None of the above"],
        answer: "Client-side image maps"
    },
    {
        title: "Which of the following navigator object properties is the same in both   Netscape and IE?",
        choices: ["navigator.appCodeName", "navigator.appName", "navigator.appVersion", "None of the above"],
        answer: "navigator.appCodeName"
    },
    {
        title: "JavaScript entities start with _______ and end with _________.",
        choices: ["Semicolon, colon", "Semicolon, Ampersand", "Ampersand, semicolon", "Ampersand, colon"],
        answer: "Ampersand, semicolon"
    },
]
var score = 0;
var questionInd = 0;
var starttime = document.querySelector("#starttime");
var timer = document.querySelector("#startquiz");
var questiondiv = document.querySelector("#questiondiv");
var wrapper = document.querySelector("#wrapper");
var secondleft = 100;
var holdinterval = 0;
var penalty = 10;
var ulcreate = document.querySelector("ul");

timer.addEventListener("click", function() {
    if(holdinterval === 0){
        holdinterval = setInterval(function(){
            secondleft--;
            starttime.textContent = "Time: " + secondleft;
            if (secondleft <=0){
                clearInterval(holdinterval);
                done();
                starttime.textContent = "DONE!";
            }
        }, 1000); 
    }
    list(questionInd)
});

function list(questionInd){
    questiondiv.innerHTML = "";
    ulcreate.innerHTML = "";
    for (var i=0; i<questions.length; i++){
        var studentquestion = questions[questionInd].title;
        var studentchoices = questions[questionInd].choices;
        questiondiv.textContent = studentquestion;
    }
    studentchoices.forEach(function(listitem){
        var listitem = document.createElement("li");
        listitem.textContent = newlist;
        questiondiv.appendChild(ulcreate);
        ulcreate.appendChild(listitem);
        listitem.addEventListener("click", (compare));
    })
}
function compare(event){
    var element = event.target;
    if(element.matches("li")) {
        var gendiv = document.createElement("div");
        gendiv.setAttribute("id", "gendiv");
        if(element.textContent == questions[questionInd].answer){
            score++;
            gendiv.textContent = "Bingo";
        }else{
            secondleft = secondleft - penalty;
            gendiv.textContent = "Oops! Answer is: " + questions[questionInd].answer;
        }
    }
    questionInd++;
    if(questionInd >= questions.length) {
        done();
        gendiv.textContent = "Quiz Completed" + " " + score + "|" + questions.length + " ";
    }else{
        list(questionInd);
    }
    questiondiv.appendChild(gendiv);
}
function done(){
    questiondiv.innerHTML = "";
    starttime.innerHTML = "";
    var createh1 = document.createElement("h1");
    createh1.setAttribute("id", "createh1");
    createh1.textContent = "Done! Finally~";
    questiondiv.appendChild(createh1);

    var createp = document.createElement("p");
    createp.setAttribute("id", "createp");
    questiondiv.appendChild(createp);
    if(secondleft >=0){
        var timeleft = secondleft;
        var createp2 = document.createElement("p");
        clearInterval(holdinterval);
        createp.textContent = "Score is: " + timeleft;
        questiondiv.appendChild(createp2);
    }
    var createtag = document.createElement("tag");
    createtag.setAttribute("id", "createtag");
    createtag.textContent = " Key in initials: ";
    questiondiv.appendChild(createtag);
    var createkey = document.createElement("key");
    createkey.setAttribute("type", "text");
    createkey.setAttribute("id", "initials");
    createkey.textContent = "";
    questiondiv.appendChild(createkey);
    var createsubmit = document.createElement("button");
    createsubmit.setAttribute("type", "submit");
    createsubmit.setAttribute("id", "submit");
    createsubmit.textContent = "Submit";
    questiondiv.appendChild(createsubmit);
    createsubmit.addEventListener("click", function (){
        var initials = createkey.Value;
        if(initials ===null){
            console.log("EMPTY!?");
        }else{
            var finalscore={
                initials: initials,
                score: timeleft
            }
        console.log(finalscore);
        var pastscores = localStorage.getItem("pastscore");
        if(pastscores === null){
            pastscores = [];
        }else{
            pastscores = JSON.parse(pastscores);
        }
        pastscores.push(finalscore);
        var newscore = JSON.stringify(pastscores);
        localStorage.setItem("pastscores", newscore);
        window.location.replace("./topscores.html");
        }
    });
}