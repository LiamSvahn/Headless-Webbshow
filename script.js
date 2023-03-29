import './news.js';
import postOrder from './orderFunction.js'


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
            console.log("click", product.id)
            let cart1 = JSON.parse(localStorage.getItem("cart1"))
            console.log("cart från LS", cart1);

            // ÄNDRA
            cart1.push({product_id: product.id, quantity: 1});

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




