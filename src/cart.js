let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');


let basket1 = JSON.parse(localStorage.getItem("data1")) || [];

let calculation1 = () =>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket1.map((x) => x.item).reduce((x,y) => x + y, 0);
 }

 calculation1()

 let generateCartItem = () => {
    if (basket1.length !== 0) {
        return (shoppingCart.innerHTML = basket1.map((x) => {
            let {id, item} = x;
            let search = shopItemsData.find((y) => y.id == id) || [];

            return `
                <div class="cart-item">
                    <img width="100" src=${search.img} alt=""/>
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p> ${search.name} </p>
                                <p class="cart-item-price"> $ ${search.price} </p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div>
                        <div class="buttons">
                            <i onclick="decrement1(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${item}</div>
                            <i onclick="increment1(${id})" class="bi bi-plus-lg"></i>
                        </div>
                        <h3>$ ${item * search.price} </h3>
                    </div>
                </div>
            `
        }).join(""))
    }
    else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
            <h2>Cart is empty :( </h2>
            <a href="index.html">
                 <button class="home-btn"> Back to home </button>
            </a>
        `;
    }
 }

 generateCartItem();

 let increment1 = (id) => {

    let search = basket1.find((x) => x.id === id)

   // console.log(search);
    if(search === undefined){
        basket1.push({
            id:id,
            item:1,
        });
    }
    else{
        search.item +=1;
    }
    generateCartItem();
    update1(id);

    localStorage.setItem('data1', JSON.stringify(basket1));
}

let decrement1 = (id) => {
    let search = basket1.find((x) => x.id === id)

    if (search === undefined) return;
    else if(search.item === 0){
        return;
    }
    else{
        search.item -=1;
    }

    update1(id);
    basket1 = basket1.filter((x) => x.item !== 0);
    generateCartItem();
    localStorage.setItem('data1', JSON.stringify(basket1));
}

let update1 = (id) => {
    let search = basket1.find((x) => x.id === id);
   // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation1();
    totalAmount();
}

let removeItem = (id) => {
    basket1 = basket1.filter((x) => x.id !== id);
    generateCartItem();
    totalAmount();
    calculation1();
    localStorage.setItem('data1', JSON.stringify(basket1));
}


let clearCart = () => {
    basket1= [];
    generateCartItem();
    localStorage.setItem('data1', JSON.stringify(basket1));
    calculation1();
}

let totalAmount = () => {
    if (basket1.length !== 0) {
        let amount = basket1.map((x) => {
            let {item,id} = x;
            let search = shopItemsData.find((y) => y.id == id) || [];
            return item * search.price;
        }).reduce((x,y) => x + y,0)
        label.innerHTML = `
        <h2> Total Bill: $ ${amount} </h2>
        <button class="checkout"> Checkout </button>
        <button onclick="clearCart()" class="clear-cart"> Clear Cart </button>
        `
    }
    else {
        return;
    }
}


totalAmount();