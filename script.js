import './news.js';

const nav = document.createElement("nav");
const header = document.createElement("header");
const footer = document.createElement("footer");
const article = document.createElement("article");
const div = document.createElement("div");
const p = document.createElement("p");

document.body.append(nav, header, footer, article, div);

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
        productName.innerText = product.name;
        productBeskrivning.innerHTML = product.description;
        productPris.innerText = product.price;
        
        li.append(productImg, productName, productBeskrivning, productPris)
        
        
        i++;
        li.addEventListener("click", () =>{
            console.log("click", product.id)
            
            
        })
        ul.appendChild(li)
    })
    div.appendChild(ul)

}