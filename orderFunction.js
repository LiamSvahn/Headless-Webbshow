import './script.js';
//import emptyCart from './script.js'
fetch("http://46.101.108.242/wp-json/wc/v3/products/")
.then(res => res.json())
.then(data => {
    console.log(data)
});

let cart1 = JSON.parse(localStorage.getItem("cart1"));

export default function postOrder() {
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
        cart1
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
        //emptyCart();
    })
    .catch(err => console.log("err", err));

};