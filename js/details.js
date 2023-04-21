const queryString = document.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

//console.log(id);


async function getProductById(productId) {

    try {
        const fetchData = await fetch(`https://www.jeanarcenal.no/wp-json/wc/v3/products/${productId}?consumer_key=ck_5c0f78a03202619d3f095e53814ebabed5112b3a&consumer_secret=cs_d388f27106d8509f125b1f7b1ec910561c08cbc7`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const jsonData = await fetchData.json();
        console.log(jsonData);

        const { id, attributes, name, description, categories, price, images, featured} = jsonData;
        // console.log(attributes);
        // console.log(name);
        console.log(description);
        // console.log(categories);
        // console.log(price);
        // console.log(id);
        //console.log(images);


        const sizesObj = attributes.find(obj => obj.name == 'sizes');
        let sizes = 'One Size';
        if(sizesObj) {
            sizes = sizesObj.options.join(" ");
        }
        
        //console.log(sizes);

        const selectedProductContainer = document.querySelector("#selectedProduct");
        if(selectedProductContainer) {
            selectedProductContainer.innerHTML = `
                <div class="p-description-list">
                    <div class="p-image-container">
                        <img src="${images[0].src}" class="img-fluid" alt="${name}">
                    </div>
                    <div class="p-description">
                        
                        <p><span>${name}</span></p><p><span>Nok ${price}</span></p>
                        <p><button type="button" class="btn sizes-btn">${sizes}</button></p>
                        <a href="checkout.html"  class="btn add-to-cart-btn "  role="button" >Add to cart</a>                  
                        <p class="p-description">Description</p>
                    
                        ${description}
                
                        
                    </div>
                </div>
            `;
        }

    } catch(error) {
        console.log(error);
    }
   
}


getProductById(id);