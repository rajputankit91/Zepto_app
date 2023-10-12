import { ContainerView } from "../containerView";
export class CartView{
    constructor(data){
        this.data = data;
        this.container = document.querySelector(".container");
        this.cartDiv = document.querySelector(".cartDiv");     
    }

    cartRendering(data){
        const cartdiv = document.querySelector(".cartDiv");
        if(cartdiv){
            document.body.removeChild(cartdiv);
        }
        
        const cartDiv = document.createElement("div");
        cartDiv.style.right = cartdiv ? cartdiv.style.right : "-342px";

        cartDiv.classList.add("cartDiv");
        this.totalshow(cartDiv);
        data.forEach(item => {
            if(item.quantity > 0){
                cartDiv.innerHTML +=`
                    <div id = "cartBlock" class = "itemName">
                        <div class = "image"><img src = ${item.src}></div>
                        <div class = "cartItemDetails">
                            <h3 id =" ${item.name}">${item.name}</h3>
                            <p style = "color: white">${item.type}</p>
                            <div class = "priceAndQuantity"> <div>${(1 -item.discount_price / 100) * item.price} ₹ /<span style = "color: white">${item.unit}</span>
                            </div> <div class="addClass quantityDiv" style = "display: flex"><div class="subtract" style="font-weight: bolder">-</div>
                            <div class="quantity">${item.quantity}</div>
                            <div class="add" style="font-weight: bolder">+</div>
                        </div>
                    </div>
                `;   
            } 
        });
        this.cartSlide(cartDiv);
        document.body.appendChild(cartDiv);
    }

    totalshow(cartDiv){
        let MRP = 0;
        const total = document.createElement("div");
        total.classList.add("total");
        console.log(this.data)
        this.data.forEach((item)=>{
        MRP += (1 -item.discount_price / 100) * item.price*item.quantity;
        })
        total.innerHTML =`
            <div><p>Total MRP:</p><p>${MRP}</p></div>
            <div><p>GST:</p><p>${parseFloat(MRP*0.18).toFixed(2)}</p></div>
            <div><p>Total Amount:<p>${parseFloat(MRP*1.18).toFixed(2)}</p></div>
            <button class ="payNow" style = "margin-top:10px">Pay Now</button>
        `;

        cartDiv.appendChild(total);
    }
    
    cartSlide(cartDiv){
        const hideCart = document.createElement("div");
        hideCart.classList.add("hideCart");
        hideCart.textContent = "Cart"
        cartDiv.appendChild(hideCart);
        hideCart.addEventListener("click", () => {
            if (cartDiv.style.right === "10px") {
                cartDiv.style.right = "-342px";
                hideCart.style.right = "-14px";
                let itemList = this.container.querySelector(".item-list");
                itemList.style.gridTemplateColumns =  "repeat(6,1fr)";
                this.container.style.width = 'calc(100vw - 80px)';
            }
            else if (cartDiv.style.right === "-342px") {
                cartDiv.style.right = "10px";
                hideCart.style.right = "338px";
                let itemList = this.container.querySelector(".item-list");
                itemList.style.gridTemplateColumns =  "repeat(4,1fr)";
                this.container.style.width = 'calc(100vw - 380px)';   
            }
        });
    }
}