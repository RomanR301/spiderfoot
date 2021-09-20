$(".product-carousel").each(function(index, element){
  var $this = $(this);
  $this.addClass("instance-" + index);
  $(".section-carousel .swiper-button-prev").addClass("btn-prev-" + index);
  $(".section-carousel .swiper-button-next").addClass("btn-next-" + index);
  var swiperproduct = new Swiper(".instance-" + index, {
      slidesPerView: 4,
      spaceBetween: 25,
      loop: true,
      navigation: {
          nextEl: ".btn-next-" + index,
          prevEl: ".btn-prev-" + index
      }
  });
});