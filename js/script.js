
import {renderProductList }  from "./constants.js";



async function getProducts() {
   
    try {
        const fetchData = await fetch('https://www.jeanarcenal.no/wp-json/wc/v3/products?consumer_key=ck_5c0f78a03202619d3f095e53814ebabed5112b3a&consumer_secret=cs_d388f27106d8509f125b1f7b1ec910561c08cbc7', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const jsonData = await fetchData.json();
        //console.log(jsonData);

        const mapData = jsonData.map((obj, index) => {


            //console.log(obj);
            const { id, categories, name, price, featured, images } = obj;
            
            const newCategoryList = categories.filter((obj, index) => {
                if(obj.name !== 'Men' && obj.name !== 'Women') {
                    return obj;
                }
            });
            
            const newObj = {
                id: id,
                category: newCategoryList[0].name,
                name: name,
                price: price,
                featured: featured,
                image: images[0].src
            };

            return newObj;
        });

        //console.log(mapData);

        const featuredData = mapData.filter((obj, index) => {
            if(obj.featured) {
                return obj;
            }
        });

        //console.log(featuredData);

        const productListContainer = document.querySelector('#mainHomeProductList');
       

        if(productListContainer) {
            productListContainer.innerHTML = "";
            mapData.map((obj, index) => {
                
                const {id, category, name, price, featured, image} = obj;
                const itemHtml = `
                    <div class="products-list">
                        ${featured ? '<img src="../images/star.png" class="featuredProduct" alt="Featured Product" />' : ''}
                        
                        <p class="product-category-name">${category}</p>
                        <div class="product-images-details-container">
                            <div class="image-detail-container">                  
                                <div class="image-container">
                                    <img src="${image}" class="img-fluid" alt="${name}">
                                </div>                 
                                <div class="detail-container">
                                    <p>${name}</p> 
                                    <p>Nok ${price}</p>
                                    <a href="product-description.html?id=${id}"  class="btn-buy-now-link "  role="button"> BUY NOW </a> 
                                </div>   
                            </div>   
                        </div>
                    </div>
                `;

                productListContainer.innerHTML += itemHtml;

            });
        }

        // below is for featured list 
        const featuredListContainer = document.querySelector("#mainHomeFeaturedList");
       

        if(featuredListContainer) {
            featuredListContainer.innerHTML = "";
            featuredData.map((obj, index) => {
                
                const {id, category, name, price, featured, image} = obj;
                const itemHtml = `
                    <div class="products-list">
                        ${featured ? '<img src="../images/star.png" class="featuredProduct" alt="Featured Product" />' : ''}
                        
                        <p class="product-category-name">${category}</p>
                        <div class="product-images-details-container">
                            <div class="image-detail-container">                  
                                <div class="image-container">
                                    <img src="${image}" class="img-fluid" alt="${name}">
                                </div>                 
                                <div class="detail-container">
                                    <p>${name}</p> 
                                    <p>Nok ${price}</p>
                                    <a href="product-description.html?id=${id}"  class="btn-buy-now-link "  role="button"> BUY NOW </a> 
                                </div>   
                            </div>   
                        </div>
                    </div>
                `;

                featuredListContainer.innerHTML += itemHtml;

            });
        }



        const menDataFilter = jsonData.filter((obj, index) => {
            const { categories } = obj;

            const findMen = categories.find(obj => obj.name === 'Men');


            if(findMen) {
                return obj;
            }


        });

        const menData = menDataFilter.map((obj, index) => {
            const { id, name, price, featured, images } = obj;

            const newObj = {
                id: id,
                category: 'Men',
                name: name,
                price: price,
                featured: featured,
                image: images[0].src
            };

            return newObj;

        });

      
        console.log(menData);
        const menContainer = document.querySelector("#menC");

        if(menContainer) {
            menContainer.innerHTML = "";
            menData.map((obj, index) => {
                
                const productItem = renderProductList(obj);

                menContainer.innerHTML += productItem;

            });
        }

        const womenDataFilter = jsonData.filter((obj, index) => {
            const { categories } = obj;

            const findWomen = categories.find(obj => obj.name === 'Women');


            if(findWomen) {
                return obj;
            }


        });


        const womenData = womenDataFilter.map((obj, index) => {
            const { id, name, price, featured, images } = obj;

            const newObj = {
                id: id,
                category: 'Women',
                name: name,
                price: price,
                featured: featured,
                image: images[0].src
            };

            return newObj;

        });

        const womenContainer = document.querySelector("#womenC");

        if(womenContainer) {
            womenContainer.innerHTML = "";
            womenData.map((obj, index) => {
                
                womenContainer.innerHTML += renderProductList(obj);

            });
        }


        console.log(womenData);



    } catch(error) {
        console.log(error);
    }
   
  
 }


 getProducts();



function toggleContainer() {
    let container = document.querySelector('.mobile-menu');
    if (container.style.display === 'none') {
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
    }
}


let container = document.querySelector('.mobile-menu');
let hamburgerContainer = document.querySelector('.hamburger-icon-container');

if(hamburgerContainer) {
    hamburgerContainer.addEventListener('click', toggleContainer);
}

document.addEventListener('click', function(event) {
    let isClickInsideContainer = container.contains(event.target);
    let isClickedHamburger = hamburgerContainer.contains(event.target);

    if (!isClickInsideContainer && !isClickedHamburger) {

      
        container.style.display = 'none';
        
        
    }
});
 

// below is for error validation in user page form

let nameEl = document.querySelector("#name");
let nameError = document.getElementById("nameError");

if(nameEl) {
    nameEl.addEventListener("input", function(event) {
        if(nameEl.value.length > 0) {
            nameError.style.display = 'none';
        } else {
            nameError.style.display = 'block';
        }
    });
}


let email = document.getElementById("email");
let emailError = document.getElementById("emailError");

if(email) {
    email.addEventListener("input", function(event) {
        if(validEmail(email.value)) {
            emailError.style.display = 'none';
        } else {
            emailError.style.display = 'block';
        }
    });
}

let password = document.querySelector("#password");
let passwordError = document.getElementById("passwordError");


if(password) {
    password.addEventListener("input", function(event) {
        if(password.value.length >= 6) {
            passwordError.style.display = 'none';
        } else {
            passwordError.style.display = 'block';
        }

    });
}

function validEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}





function submitUserForm(event) {
    event.preventDefault();

    console.log('submit');
   
    if(nameEl.value.length == 0) {
        nameError.style.display = 'block';
    }

    if(!validEmail(email.value)) {
        emailError.style.display = 'block';
    }

    if(password.value.length < 6) {
        passwordError.style.display = 'block';
    }


}


function resetUserForm(event) {
    event.preventDefault();
    console.log('lets reset');
    nameEl.value = "";
    email.value = "";
    password.value = "";
    
    nameError.style.display = "none";
    emailError.style.display = "none";
    passwordError.style.display = "none";
}

const userContactForm = document.querySelector('#userContactForm');

if(userContactForm) {
    userContactForm.addEventListener("submit", submitUserForm);
    userContactForm.addEventListener("reset", resetUserForm);
}

  