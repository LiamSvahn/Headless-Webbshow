const newsApi = "http://46.101.108.242/wp-json/wp/v2/posts";
// Skapar två knappar med respektive lyssnare som kallar på knapparnas funktioner.....
let newsButtonAll = function(){
    let nButton = document.createElement("button");
    nButton.innerText = "Mer Nyheter";
    let sec = document.querySelector("article");
    sec.appendChild(nButton);
    nButton.addEventListener('click', newsButtonClick);
}
let newsButtonOne = function(){
    let nButtonOne = document.createElement("button");
    nButtonOne.innerText = "Mindre Nyheter";
    let sec = document.querySelector("article");
    sec.appendChild(nButtonOne);
    nButtonOne.addEventListener('click', newsButtonOneClick);
}

// Funktion som tar fram bara den senaste funktionen....
let latestNews = function (){
    fetch(newsApi) 
    .then(res => res.json())
    .then(data => {
        console.log("posts", data);
        let latest = data.length-1;
        //console.log(data[latest].content);
        let newsPost = data[latest].content.rendered;
        //console.log(newsPost);
        let newsArticle = document.createElement("p");
        newsArticle.innerHTML= newsPost;
        let sec = document.querySelector("article");
        sec.appendChild(newsArticle);
        newsButtonAll();
        
    })
}
// Funktioner som ger nyhetsknapparna deras funktioner...
latestNews();
let newsButtonClick = function(){
    let sec = document.querySelector("article");
    sec.innerHTML = "";
    allNews();
};
let newsButtonOneClick= function(){
    let sec = document.querySelector("article");
    sec.innerHTML = "";
    latestNews();
};

//Lägger upp alla nyheter från flödet...
let allNews = function () {
    fetch(newsApi) 
    .then(res => res.json())
    .then(data => {
        console.log("posts", data);
        //console.log("posts", data[0].excerpt);
        //printPages(data);
        let i = 0;
    do {
        let newsPost = data[i].content.rendered;
        //console.log(newsPost);
        let newsArticle = document.createElement("p");
        newsArticle.innerHTML = newsPost;
        let sec = document.querySelector("article");
        sec.appendChild(newsArticle);
        i++;
    } while (i < data.length);
    })
    //Lägger till en knapp som tar tillbaka bara den senaste nyheten
    newsButtonOne();
    };

    //allNews();