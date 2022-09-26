let shop = document.getElementById('shop');
let shopItemsData = [{
    id:"1",
    name:'Causal shirt',
    price:45,
    desc:"Lorem Ipsum,Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum",
    img: "imgs/img-1.jpg"
    },
    {
        id:"2",
        name:'Office shirt',
        price:100,
        desc:"Lorem Ipsum,Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum",
        img: "imgs/img-2.jpg"
    },
    {
        id:"3",
        name:'T shirt',
        price:145,
        desc:"Lorem Ipsum,Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum",
        img: "imgs/img-3.jpg"
    },
    {
        id:"4",
        name:'Mens suit',
        price:451,
        desc:"vas Lorem IpsumLorem IpsumLorem Ipsum",
        img: "imgs/img-4.jpg"
    },
];

//let basket = JSON.parse(localStorage.getItem('data')) || [];

let basket1 = JSON.parse(localStorage.getItem("data1")) || [];


let generateShop = () => {
    // return (shop.innerHTML = shopItemsData.map((x) => {
    //     return `
    //     <div id=product-id-${x.id} class="item">
    //     <img  width="220" src=${x.img} alt="">
    //     <div class="details">
    //         <h3>${x.name}</h3>
    //         <p>${x.desc}</p>
    //         <div class="price-quantity">
    //             <h2> $ ${x.price} </h2>
    //             <div class="buttons">
    //                 <i class="bi bi-dash-lg"></i>
    //                 <div class="quantity">0</div>
    //                 <i class="bi bi-plus-lg"></i>
    //             </div>
    //         </div>
    //     </div>
    //     </div>
    //     `
    // }).join(""));

    return (shop.innerHTML = shopItemsData.map((x) => {
        let {id, name, price, desc, img} = x; // obj destructing.
        let search = basket1.find((x) => x.id == id) || [];

        return `
        <div id=product-id-${id} class="item">
        <img  width="220" src=${img} alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2> $ ${price} </h2>
                <div class="buttons">
                    <i onclick="decrement1(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                    <i onclick="increment1(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
        </div>
        `
    }).join(""));
};

generateShop();


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
    update1(id);
    localStorage.setItem('data1', JSON.stringify(basket1));
}



let decrement1 = (id) => {
    let search = basket1.find((x) => x.id === id)

    if (search === undefined) return;
   // console.log(search);
    else if(search.item === 0){
        return;
    }
    else{
        search.item -=1;
    }
    //console.log(basket);
    update1(id);
    basket1 = basket1.filter((x) => x.item !== 0);

    localStorage.setItem('data1', JSON.stringify(basket1));
}

let update1 = (id) => {
    let search = basket1.find((x) => x.id === id);
   // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation1();
}

let calculation1 = () =>{
   let cartIcon = document.getElementById("cartAmount");
   cartIcon.innerHTML = basket1.map((x) => x.item).reduce((x,y) => x + y, 0);
}

calculation1()

// Code with Local storage not working...

// let increment = (id) => {

//     let search = basket.find((x) => x.id === id)

//    // console.log(search);
//     if(search === undefined){
//         basket.push({
//             id:id,
//             item:1
//         });
//     }
//     else{
//         search.item +=1;
//     }

//     localStorage.setItem("data", JSON.stringify(basket));
//    // console.log(basket);
//     update(id);
// }


// let decrement = (id) => {
//     let search = basket.find((x) => x.id === id)

//    // console.log(search);
//     if(search.item === 0){
//         return;
//     }
//     else{
//         search.item -=1;
//     }
//     //console.log(basket);

//     localStorage.setItem("data", JSON.stringify(basket));
//     update(id);
// }


// let update = (id) => {
//     let search = basket.find((x) => x.id === id);
//    // console.log(search.item);
//     document.getElementById(id).innerHTML = search.item;
//     calculation();
// }

// let calculation = () =>{
//    let cartIcon = document.getElementById("cartAmount");
//    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);

// }
