require('../../node_modules/jquery-migrate/dist/jquery-migrate.min.js')
require('slick-carousel');

$(document).ready(function(){
  $('#slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    prevArrow: "#slider-left-arrow",
    nextArrow: "#slider-right-arrow",
  });
});
