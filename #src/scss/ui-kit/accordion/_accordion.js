$(document).ready(function() {
    $(".accordion__item .accordion__button").on("click", function(e) {
    e.preventDefault();
        if ($(this).parent().hasClass("active")) {
        $(this).parent().removeClass("active");
        $(this).parent().find(".accordion__content").slideUp(200);
        } else {
        $(".accordion__item").removeClass("active");
        $(this).parent().addClass("active");
        $(".accordion__content").slideUp(200);
        $(this).parent().find(".accordion__content").slideDown(200);
        }
    });
  });