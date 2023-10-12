import { CartView } from "./cartView/cartView";
import { ContainerView } from "./containerView";
export class AddSubButton{
    constructor(data){
        this.data = data;
        this.cartView = new CartView(this.data);
        this.containerView = new ContainerView(this.data);
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
                    this.containerView.renderItems(data);
                    this.quantityManager(data)
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
            });
        });
    }
}