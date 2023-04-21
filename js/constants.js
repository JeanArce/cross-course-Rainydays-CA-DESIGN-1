export const renderProductList = (product) => {
    
    const {id, name, price, image} = product;
    
    return `
        <div class="products-list single-list">
            <div class="product-images-details-container">
            <div class="image-detail-container">
                <div class="image-container">
                <img src="${image}" class="img-fluid" alt="${name}">
                </div>
                <div class="detail-container">
                <p>${name}</p>
                <p> Nok ${price}</p>
                <a href="product-description.html?id=${id}"  class="btn-buy-now-link "  role="button"> BUY NOW </a> 
                </div>
            </div>
            </div>
        </div>
    `;
};




