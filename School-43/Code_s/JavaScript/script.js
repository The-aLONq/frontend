$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    items: 1,
    dots: true,
    nav: true,
    autoplay: true,
    autoplayTimeout: 7000,
    loop: true,
    smartSpeed: 2500
  });
});
let checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      checkboxes.forEach(cb => {
        if (cb !== this) {
          cb.checked = false;
        }
      });
    }
  });
});

