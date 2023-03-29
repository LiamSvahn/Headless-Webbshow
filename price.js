const productsApi = "http://46.101.108.242/wp-json/wc/v3/products";

let productsButton = function(){
  let sec = document.querySelector("section");
  let Button = document.createElement("button");

  Button.innerText = "Hämta Produkter";

  sec.appendChild(Button);
  Button.addEventListener('click', fetchProducts);
}

let fetchProducts = function() {
  fetch(productsApi)
    .then(res => res.json())
    .then(data => {
      //console.log("products", data);

      let productsList = document.createElement("ul");
      let sec = document.querySelector("section");

      sec.appendChild(productsList);

      data.forEach(product => {
        let productItem = document.createElement("li");
        let productId = document.createElement("p");
        let productPrice = document.createElement("p");

        productId.innerText = "Product ID: " + product.id;
        
        productPrice.innerText = "Product Price: " + product.price;
        productItem.append(productId, productPrice);
        productsList.appendChild(productItem);
    });
    })

}

productsButton();
