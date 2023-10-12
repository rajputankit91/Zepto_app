import { Controller } from "../controller/controller";
import { CartView } from "./cartView/cartView";
export class ContainerView{
    constructor(data){
        this.data = data;
        this.itemList = document.querySelector(".item-list")
        this.typeList = document.querySelector(".type-list")
        this.controller =  new Controller(this.data);
        this.elementList = this.controller.categories(this.data);
        this.cartView = new CartView(this.data);
        this.cartView.cartRendering(this.data);
    }

    init(){
        this.renderItems(this.data);
        this.renderCategories(this.elementList);    
    }

    renderItems(data){
        this.itemList.innerHTML = ""
        data.forEach(element => {
            const itemDiv = document.createElement("div");                        
            itemDiv.classList.add("itemName");  
            itemDiv.innerHTML +=`
                <img class="itemImage" src="${element.src}" alt="${element.name}">
                <h3 id =" ${element.name}" style = " margin-bottom: 0px">${element.name}</h3>
                <p style = "color: gray; margin: 5px">${element.unit}</p>
            `;

            if(element.quantity === 0){
                itemDiv.innerHTML += `   <div class="shortDescrip">
                <div class="itemPrice"><strong>₹ ${element.discount_price}</strong></div> 
                <div class="addClass"><div class = "add">Add</div></div>
                </div>`
            } else{
                itemDiv.innerHTML +=`
                    <div class="shortDescrip">
                    <div class="itemPrice"><strong>₹ ${element.discount_price}</strong></div> 
                    <div class="addClass quantityDiv" style = "display: flex"><div class="subtract" style="font-weight: bolder">-</div>
                    <div class="quantity">${element.quantity}</div>
                    <div class="add" style="font-weight: bolder">+</div></div>
                    </div>
                `;
            }
            this.itemList.appendChild(itemDiv);                  
            this.bindEventOnItem(itemDiv,element);
        });
        this.addButtonFunction(data);
    } 
      
    renderCategories(data){
        data.forEach((value)=>{
            const typeName = document.createElement("div");                    
            typeName.classList.add("typeName");                                
            typeName.textContent = value;                                
            this.typeList.appendChild(typeName);        
            this.bindEventOnCategory(typeName);
        })
    }  

    bindEventOnItem(itemDiv,element){  
        itemDiv.querySelector(".itemImage").addEventListener("click",() =>{
            this.itemList.innerHTML = '';
            this.popUpDescription(element); 
            this.addButtonFunction(element) 
        });  
    }

    popUpDescription(element) {
        const itemDetails = document.createElement("div");
        itemDetails.classList.add("itemName");
        itemDetails.id = "itemDetails"   
        itemDetails.innerHTML = `
            <img src="${element.src}">
            <h3 id =" ${element.name}" >${element.name}</h3>
            <div>Price: ${(1 - element.discount_price / 100) * element.price} ₹ /<span style = "color: gray">${element.unit}</span></div>
            <div>MRP: ${element.price} ₹/<span style = "color: gray">${element.unit}</span></div>
            <div>${element.discount_price}% Off</div>
            <div>Country of Origin: ${element.countryoforigin}</div>            
        `;

        if(element.quantity === 0){
            itemDetails.innerHTML += `<div class="addClass" style = "padding-top: 12px"><div class = "add">Add</div></div>`
        } else{
            itemDetails.innerHTML +=`<div class="addClass quantityDiv" style = "display: flex"><div class="subtract" style="font-weight: bolder">-</div>
            <div class="quantity">${element.quantity}</div>
            <div class="add" style="font-weight: bolder">+</div></div>`
        }
        this.itemList.appendChild(itemDetails);
        this.addButtonFunction(element);
    }

    bindEventOnCategory(typeName){
        typeName.addEventListener("click", (event)=> {   
            const categoryName = event.target.innerText;
            this.itemList.innerHTML = "";
            const heading = document.createElement("h2");
            heading.classList.add("itemHeading");
            heading.textContent= categoryName;
            this.itemList.appendChild(heading);
            const filteredData = this.controller.filterItems(categoryName);
            this.renderItems(filteredData); 
        });               
      } 
    
      addButtonFunction(data) {
        const addButtonList = document.querySelectorAll(".add");
        const cartDiv = document.querySelector(".cartDiv");
        addButtonList.forEach((addButton) => {
            addButton.addEventListener("click", () => {
                const itemName = addButton.closest(".itemName").querySelector("h3").textContent;
                const selectedItem = data.find(item => item.name === itemName);
                
                if (selectedItem) {
                    selectedItem.quantity = (selectedItem.quantity || 0) +1;
                    this.renderItems(data);
                    this. quantityManager(data);
                    this.cartView.cartRendering(data);                    
                }
            });
        });
        return data;
    }
    quantityManager(data) {
        const quantityDivList = document.querySelectorAll(".quantityDiv");
        
        quantityDivList.forEach((quantityDiv) => {
            const addButton = quantityDiv.querySelector(".add");
            const subButton = quantityDiv.querySelector(".subtract");
            const quantity = quantityDiv.querySelector(".quantity");
            const itemName = quantityDiv.closest(".itemName").querySelector("h3").textContent;
    
            subButton.addEventListener("click", () => {
                const selectedItem = data.find(item => item.name === itemName);
                
                if (selectedItem && selectedItem.quantity > 0) {
                    selectedItem.quantity -= 1;
                    quantity.textContent = selectedItem.quantity;
                    this.cartView.cartRendering(data);
                }
                if (selectedItem.quantity < 1) {
                    this.renderItems(data);
                }
            });
        });
    }
}