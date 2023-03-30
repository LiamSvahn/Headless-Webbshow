<<<<<<< HEAD

=======
>>>>>>> e5e0183 (ändrad)
//import './news.js';
//import './price.js';

const nav = document.createElement("nav");
const header = document.createElement("header");
const footer = document.createElement("footer");
const article = document.createElement("article");
const div = document.createElement("div");
const p = document.createElement("p");
const c = document.createElement("div");


document.body.append(nav, header, footer, article, div,);

fetch("http://46.101.108.242/wp-json/wp/v2/pages/")
.then(res => res.json())
.then(data =>{
    console.log("Data", data[8].excerpt.rendered)
    StartLägtillText(data[8].excerpt.rendered)
})

const newsApi = "http://46.101.108.242/wp-json/wp/v2/posts";
// Skapar två knappar med respektive lyssnare som kallar på knapparnas funktioner.....
let newsButtonAll = function(){
    let nButton = document.createElement("button");
    nButton.setAttribute("id", "nyheterKnapp")
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

// Funktion som tar fram bara den senaste nyheten....
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
let newsButtonClick = function() {
    let sec = document.querySelector("section");
    
    // Get all the content inside the article tag
    const allContent = sec.innerHTML;
  
    // Get the "mer nyheter" and "mindre nyheter" buttons
    const moreBtn = document.querySelector("#moreBtn");
    const lessBtn = document.querySelector("#lessBtn");
  
    // Check if the content is already hidden or not
    if (sec.classList.contains("hidden")) {
      // If content is already hidden, show it
      sec.innerHTML = allContent;
      sec.classList.remove("hidden");
      moreBtn.style.display = "none";
      lessBtn.style.display = "block";
    } else {
      // If content is not hidden, hide it
      sec.innerHTML = allContent.substring(0, 200); // Show only first 200 characters
      sec.classList.add("hidden");
      moreBtn.style.display = "block";
      lessBtn.style.display = "none";
    }
  };
  
  //// Add click event listeners to the "mer nyheter" and "mindre nyheter" buttons
  //const moreBtn = document.querySelector("#moreBtn");
  //moreBtn.addEventListener("click", newsButtonClick);
  //
  //const lessBtn = document.querySelector("#lessBtn");
  //lessBtn.addEventListener("click", newsButtonClick);
  //
  //// Hide the "mindre nyheter" button initially
  //lessBtn.style.display = "none";
  

// Add click event listeners to the "mer nyheter" and "mindre nyheter" buttons
// const moreBtn = document.querySelector("#moreBtn");
//moreBtn.addEventListener("click", newsButtonClick);

//const lessBtn = document.querySelector("#lessBtn");
//lessBtn.addEventListener("click", newsButtonClick);

// Hide the "mindre nyheter" button initially
//lessBtn.style.display = "none";

//let newsButtonOneClick= function(){
  //  let sec = document.querySelector("article");
    //sec.innerHTML = "";
    //latestNews();

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



function StartLägtillText(text){
    header.append(p)
    document.getElementsByTagName("p")[0].innerHTML = text
    console.log("Data1", text)
}

fetch("http://46.101.108.242/wp-json/wc/v3/products/")
.then(res => res.json())
.then(data =>{
    console.log("Data", data)
    console.log()
    Produckterna(data)
})

let cart1 = JSON.parse(localStorage.getItem("cart1"));

 function Produckterna(ProduktData){
    let ul = document.createElement("section")
    ProduktData.map(product =>{
        let i = 0;
        let li = document.createElement("div")
        
        let productImg = document.createElement("img")
        productImg.src = product.images[i].src
        
        let productName = document.createElement("h2")
        let productBeskrivning = document.createElement("p")
        let productPris = document.createElement("p")
        let productAmount = document.createElement("input")
        const button = document.createElement("button");
        productAmount.setAttribute("type", "number");
        productAmount.setAttribute("min", "1")
        button.setAttribute("value", product.id);
        productName.innerText = product.name;
        productBeskrivning.innerHTML = product.description;
        productPris.innerText = product.price;
        button.innerText = product.price;
        
        li.append(productImg, productName, productBeskrivning, productPris, productAmount, button)
        
        
        i++;
        button.addEventListener("click", () =>{
            console.log("click", product.id, productAmount.valueAsNumber)
            let cart1 = JSON.parse(localStorage.getItem("cart1"))
            console.log("cart från LS", cart1);

            // ÄNDRA
            cart1.push({product_id: product.id, quantity: productAmount.valueAsNumber});

            // SPARA
            localStorage.setItem("cart1", JSON.stringify(cart1))
            printCart();
            
        })
        ul.appendChild(li)
    })
    div.appendChild(ul)

}

if (localStorage.getItem("cart1")) {
    console.log("Finns en kundvagn");
    printCart();
} else {
    console.log("Skapar tom kundvagn");
    let cart1 = [];
    localStorage.setItem("cart1", JSON.stringify(cart1));
    printCart();
}
//function clearCartSpace(){
    //document.getElementById(cart).innerHTML = "";
//};
let emptyCart = function() {
    localStorage.setItem("cart1", JSON.stringify([]));
            printCart();
};

function printCart() {
    if(JSON.parse(localStorage.getItem("cart1")).length > 0) {
        console.log("Finns produkter");
        //clearCartSpace();
        let emptyCartBtn = document.createElement("button");
        emptyCartBtn.setAttribute("class", "Knapp")
        emptyCartBtn.innerText = "Töm kundvagnen";

        emptyCartBtn.addEventListener("click", () => {
            emptyCart();
            //localStorage.setItem("cart1", JSON.stringify([]));
            //printCart();
            
        })

        let sendOrderBtn = document.createElement("button");
        sendOrderBtn.setAttribute("class", "Knapp")
        sendOrderBtn.innerText = "Skicka order";


        sendOrderBtn.addEventListener("click", postOrder)

        document.querySelectorAll('.Knapp').forEach(button => button.remove())
        cart.append(emptyCartBtn, sendOrderBtn);

    } else {
        console.log("Tom kundvagn");
        cart.innerText = "Inga produkter"
    }
}


fetch("http://46.101.108.242/wp-json/wc/v3/products/")
.then(res => res.json())
.then(data => {
    console.log(data)
});

function postOrder() {
    console.log("Skicka order");

    let order = {
        payment_method: "bacs", 
        payment_method_title: "Direct Bank Transfer",
        set_paid: true,
        customer_id: 1,
        billing: {
            first_name: "Elias",
            last_name: "Linderos",
            adress_1: "Bögat 69",
            city: "Köping",
            postcode: "420 69",
            country: "SE",
            email: "bakagodakakor@live.se",
            phone: "070123456"
        },
        shipping: {
            first_name: "Elias",
            last_name: "Linderos",
            adress_1: "Bögat 69",
            city: "Köping",
            postcode: "420 69",
            country: "SE",
            email: "bakagodakakor@live.se",
            phone: "070123456"
        },
        line_items: 
        JSON.parse(localStorage.getItem("cart1"))
        ,
        shipping_lines: [
            {
                method_id: "flat_rate",
                method_title: "Flat rate",
                total: "100"
            }    
        ]
    
    }
    fetch("http://46.101.108.242/wp-json/wc/v3/orders", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(order),
    })
    .then(res => res.json())
    .then(data => {
        console.log("Order skickad", data)
    //.then(emptyCart)
    })
    .catch(err => console.log("err", err));

};

<<<<<<< HEAD
let buttonchild = document.querySelectorAll('button')[0]
buttonchild.addEventListener("click", (event) =>{
    if(div.style.display = "block"){
        div.style.display = "none";
    }else{
        div.style.display = "block";
    }
})
=======


let button = document.createElement("button");
button.classList.add("btn");

document.body.append(nav, header, footer, article, div);
button.innerText = "add to cart";
div.append(button);

fetch("http://46.101.108.242/wp-json/wc/v3/products")
  .then((res) => res.json())
  .then((data) => {
    console.log("data", data);
    getItem(data);
  });

function getItem(items) {
  items.map((mapdata) => {
    console.log(mapdata.id);
    const button = document.createElement("button");
    button.setAttribute("value", mapdata.id);
    button.innerText = mapdata.price;
    article.append(button);
    
  })
}

function removeBlock(){
  
}
>>>>>>> e5e0183 (ändrad)
