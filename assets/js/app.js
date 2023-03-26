const getData = async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    const data = await res.json()
    const pRow = document.querySelector(".p-row");

    pRow.innerHTML = data.map((el) => {

        let {
            price,
            image,
            title
        } = el

        return (
            `<div class='p-item '>
                <img class='images' src=${image}></img>
                <p class='product-title'>${title}</p>
                <p class='price'>$ ${price}</p>` +
            "<button class='addCart'>Add to cart</button>" +
            `</div>`
        )

    }).join("");

    var cart = []

    const addCart = document.querySelectorAll(".addCart");
    const counter = document.querySelector(".counter");

    // Add Cart
    addCart.forEach((el, index) => {
        el.addEventListener('click', () => {
            cart.push({
                ...data[index]
            });
            counter.innerHTML = cart.length;
            displayCart();
        });
    });

    const empty = document.querySelector(".empty").innerHTML

    // Display Card
    const displayCart = () => {
        const cartDisplay = document.querySelector('.cart-area');
        let totalPrice = 0;
        if (cart.length === 0) {
            cartDisplay.innerHTML = empty;
            cartDisplay.style.fontSize = "25px";
            document.querySelector(".total-price").innerHTML = "$ " + 0 + ".00";
        } else {
            cartDisplay.innerHTML = cart
                .map((item) => {
                    const {
                        image,
                        title,
                        price
                    } = item;
                    totalPrice += price;
                    return `
                <div class="cart-flex">
                  <img src=${image} alt="">
                  <div>
                    <p>${title}</p>
                    <span class="price">$${price}</span>
                  </div>
                  <div class="delete">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </div>
                </div>
              `;
                })
                .join("");
            document.querySelector(".total-price").innerHTML = "$ " + totalPrice.toFixed(2);
        }

        // Delete Cart
        const deleteEl = document.querySelectorAll(".delete");
        deleteEl.forEach((el, index) => {
            el.addEventListener("click", () => {
                cart.splice(index, 1);
                counter.innerHTML = cart.length;
                displayCart();
            });
        });
    };
}

getData()

const cartDisplay = document.querySelector(".cartDisplay")
const basket = document.querySelector(".basket");
const closeBtn = document.querySelector('.close-btn');

basket.addEventListener('click', () => {
    cartDisplay.classList.add('active')
})

closeBtn.addEventListener('click', () => {
    cartDisplay.classList.remove('active')
})

