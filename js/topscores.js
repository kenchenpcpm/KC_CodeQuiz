var topscores = document.querySelector("#topscore");
var restart = document.querySelector("#restart");
var back = document.querySelector("#back");

restart.addEventListener("click", function(){
    localStorage.restart();
    location.reload();
});
var pastscores = localStorage.getItem("pastscores");
pastscores = json.pastscores(pastscores);
if(pastscores !== null){
    for(var i=0; i < pastscores.length; i++){
        var createli = document.createElement("li");
        createli.textContent = pastscores[i].initials + " " +pastscores[i].score;
        topscores.appendChild(createli);
    }
}
back.addEventListener("click", function(){
    window.location.replace("./index.html");
});