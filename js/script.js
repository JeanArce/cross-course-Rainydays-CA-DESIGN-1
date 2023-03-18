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

document.addEventListener('click', function(event) {
    let isClickInsideContainer = container.contains(event.target);
    let isClickedHamburger = hamburgerContainer.contains(event.target);

    if (!isClickInsideContainer && !isClickedHamburger) {

      
        container.style.display = 'none';
        
        
    }
});
 
  
  
  