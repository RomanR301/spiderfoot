let front = {
  hamburger: $('.hamburger'),
  nav: $('.navbar'),
  $body: $('body'),
  init: function () {
      this.events();
  },
  toggleNav: function () {
    if (!this.hamburger.hasClass('open')) {
        this.hamburger.addClass('open');
        this.nav.toggleClass('active');
        this.$body.addClass('active')
        } else {
            this.hamburger.removeClass('open');
            this.nav.toggleClass('active');
            this.$body.removeClass('active')
        }
    }, 
    togglePlan: function() {
      $('.pricing-card').toggleClass('anually');
    }, 


  openTab: function (element, tabName, parent) {
      let i, tab_content, tab_links;

      tab_content = $(element).closest(parent).find('.tab-content');

      for (i = 0; i < tab_content.length; i++) {
          tab_content[i].style.display = "none";
      }

      tab_links = $(element).closest('.tabs-ul').find('.tab-links');

      for (i = 0; i < tab_links.length; i++) {
          tab_links[i].className = tab_links[i].className.replace(" active", "");
      }

      document.getElementById(tabName).style.display = "block";
      $(element).addClass('active');
  },
  hoverTab: function (el, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    el.currentTarget.className += " active";
  },

  events: function () {
      let self = this;
      $(document).on('click', '.hamburger', function () {
          self.toggleNav();
      });
      $(document).on('click', '.billed-wrap__input', function () {
        self.togglePlan();
       });
      tippy('.tooltip', {
        maxWidth: 250,
      });
      var testimonialSlider = new Swiper(".testimonials-slider", {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 4000,
        },
        navigation: {
          nextEl: ".testimonials-next",
          prevEl: ".testimonials-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          767: {
            slidesPerView: 2,
          },
        }
      });
      var newsSlider = new Swiper(".news-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        allowTouchMove: false,
        navigation: {
          nextEl: ".news-next",
          prevEl: ".news-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            allowTouchMove: true,
          },
          576: {
            slidesPerView: 2,
            allowTouchMove: true,
          },
          767: {
            slidesPerView: 3,
            allowTouchMove: false,
          },
        }
      });
      var newsSlider = new Swiper(".news-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        navigation: {
          nextEl: ".news-next",
          prevEl: ".news-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 3,
          },
        }
      });
      var booksSlider = new Swiper(".books-slider", {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: true,
        navigation: {
          nextEl: ".books-next",
          prevEl: ".books-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 'auto',
          },
          576: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 5,
          }
        }
      });
      if (window.matchMedia('(max-width: 992px)').matches) {
        $(document).on('click', '.menu-item-has-children .sub-menu-button', function(){
          $(this).toggleClass('menuOpen').next().slideToggle();
        })
    } else {
        null
    }

    $("button[name='buttonTable']").click(function () {
      $('.med_inline_block').addClass('med_block').removeClass('med_inline_block');
      $('.module-table__header').addClass('d-flex').removeClass('d-none');
      $("input[name='tableView']").val('med_block');
      if (!$(".med_block")[0]) {
        $('.module-table__header').removeClass('d-flex').addClass('d-none');
      }
      $('.post-listing').removeClass('row m-row');
    });
  
    $("button[name='buttonCard']").click(function () {
      $('.med_block').addClass('med_inline_block').removeClass('med_block');
      $('.module-table__header').removeClass('d-flex').addClass('d-none');
      $('.post-listing').addClass('row m-row');
      $("input[name='tableView']").val('med_inline_block');
      if (!$(".med_inline_block")[0]) {
        $('.post-listing').removeClass('row m-row');
      }
    })

    // $(document).on('click', '.table-view', function() {
    //   $(this).addClass('active');
    //   $('.card-view').removeClass('active');
    //   $('.modules-list').removeClass('card-list');
    // })
    // $(document).on('click', '.card-view', function() {
    //   $(this).addClass('active');
    //   $('.table-view').removeClass('active');
    //   $('.modules-list').addClass('card-list');
    // })

    // if(window.matchMedia('(max-width: 768px)').matches){
    //   $(this).addClass('active');
    //   $('.table-view').removeClass('active');
    //   $('.modules-list').addClass('card-list');
    // }

    // // $(document).on('click', '.documentation-item', function(){
    // //   $(this).toggleClass('menuOpen').find('.sub-menu').slideToggle();
    // // })

  }
};

let modal = {
  closeButton: $('.modal__close'),
  closeOverlay: $('.modal'),
  can: 1,
  init: function () {
      this.events();
  },
  openModal: function (id) {
      let modalWindow = $(id);
      modalWindow.show();
      // modalWindow.find('.modal__content').removeClass('animate-away').addClass('animate-in');

      $('body, html').addClass('active');
  },

  closeModal: function (id) {
      let modalWindow = $(id);
      // modalWindow.find('.modal__content').removeClass('animate-in').addClass('animate-away');
      modalWindow.hide();
      $('body, html').removeClass('active');
  },

  events: function () {

      $(document).on('click', '.modalTrigger', function (e) {
          e.preventDefault();
          let self = $(this),
              target = self.attr('data-modal');
          modal.openModal(target);

      });

      $(document).on('click', '.modal', function (event) {
          let self = '#' + $(this).attr('id');
          if (event.target.className == 'modal__body') {
              modal.closeModal(self);
          }
      });

      $(document).on('click', '.modal__close', function () {
          let self = '#' + $(this).closest('.modal').attr('id');
          modal.closeModal(self);
      });
        $(document).on('click', '.scroll-to-top i', function () {
            $('body,html').animate({
                scrollTop : 0                       // Scroll to top of body
            }, 500);
      });
        $(document).on('click', '.scroll-down i', function () {
            $('html, body').animate({
                scrollTop: $(this).closest("section").next().offset().top - 90
             }, "slow");
      });

  }
};


jQuery(function () {
  front.init();
  modal.init();
    
});

$(window).scroll(function () {
  if ($(this).scrollTop() > 10) {
    $('.header').addClass("scrolled");
  } else {
  	$('.header').removeClass("scrolled");
  }
});

document.body.addEventListener('keyup', function(e) {
  if (e.which === 9) /* tab */ {
    document.body.classList.remove('no-focus-outline');
  }
});




function closeAllSelect(e) {
  var t, s, n, l = [];
  for (t = document.getElementsByClassName("select-items"),
  s = document.getElementsByClassName("select-selected"),
  n = 0; n < s.length; n++)
      e == s[n] ? l.push(n) : s[n].classList.remove("select-arrow-active");
  for (n = 0; n < t.length; n++)
      l.indexOf(n) && t[n].classList.add("select-hide")
}
function fireEvent(e, t) {
  if (document.createEventObject) {
      s = document.createEventObject();
      return e.fireEvent("on" + t, s)
  }
  var s;
  return (s = document.createEvent("HTMLEvents")).initEvent(t, !0, !0),
  !e.dispatchEvent(s)
}
var x, i, j, selElmnt, a, b, c;
for (x = document.getElementsByClassName("custom-select-js"),
i = 0; i < x.length; i++) {
  for (selElmnt = x[i].getElementsByTagName("select")[0],
  (a = document.createElement("DIV")).setAttribute("class", "select-list__item --current"),
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML,
  x[i].appendChild(a),
  (b = document.createElement("DIV")).setAttribute("class", "select-list select-hide"),
  j = 0; j < selElmnt.length; j++)
      (c = document.createElement("DIV")).innerHTML = selElmnt.options[j].innerHTML,
      c.setAttribute("class", "select-list__item"),
      c.addEventListener("click", function(e) {
          var t, s, n, l, i;
          for (l = this.parentNode.parentNode.getElementsByTagName("select")[0],
          i = this.parentNode.previousSibling,
          s = 0; s < l.length; s++)
              if (l.options[s].innerHTML == this.innerHTML) {
                  for (l.options[s].selected = !0,
                  fireEvent(l.options[s], "change"),
                  l.selectedIndex = s,
                  i.innerHTML = this.innerHTML,
                  t = this.parentNode.getElementsByClassName("same-as-selected"),
                  n = 0; n < t.length; n++)
                      t[n].setAttribute("class", "select-list__item");
                  this.setAttribute("class", "select-list__item same-as-selected");
                  break
              }
          i.click()
      }),
      b.appendChild(c);
  x[i].appendChild(b),
  a.addEventListener("click", function(e) {
      e.stopPropagation(),
      closeAllSelect(this),
      this.nextSibling.classList.toggle("select-hide"),
      this.classList.toggle("select-arrow-active")
  })
}
document.addEventListener("click", closeAllSelect);


$(document).on("click", ".filter-grid__btn", function() {
  let e = $(this).parents(".grid-wrap");
  $(this).hasClass("addSmall") ? e.addClass("small") : e.removeClass("small"),
  $(this).hasClass("active") ? $(this).removeClass("active") : ($(".filter-grid__btn").removeClass("active"),
  $(this).addClass("active"))
}),

$(document).ready(function () {
  $(document).on('click', 'a', function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          let target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          $('body').removeClass('active');
          $('.hamburger').removeClass('open');
          $('.navbar').removeClass('active');
          if (target.length) {
              $('html,body').animate({
                  scrollTop: (target.offset().top) - 120
              }, 1000);
              return false;
          }
       
      }
  });

  $(document).on('click', '.about-list__item', function () {
      let item = $(this);
      let list = $(this).find('.sub-menu');
      if (item.hasClass('active')) {
          item.removeClass('active');
          list.slideToggle();
      } else {
          item.addClass('active');
          list.slideToggle();
      }
  });
});



$(function () {
  // the input field
  var $input = $("input[type='search']"),
      // clear button
      $clearBtn = $("button[data-search='clear']"),
      // prev button
      $prevBtn = $("button[data-search='prev']"),
      // next button
      $nextBtn = $("button[data-search='next']"),
      // the context where to search
      $content = $(".entry-content"),
      // jQuery object to save <mark> elements
      $results,
      d,
      // the class that will be appended to the current
      // focused element
      currentClass = "current",
      // top offset for the jump (the search bar)
      offsetTop = 210,

      // the current index of the focused element
      currentIndex = 0;

  /**
   * Jumps to the element matching the currentIndex
   */
  function jumpTo() {
      if ($results.length) {
          var position,
              $current = $results.eq(currentIndex);
          $results.removeClass(currentClass);
          if ($current.length) {
              $current.addClass(currentClass);
              position = $current.offset().top - 160;
              window.scrollTo(0, position);
          }
      }
  }

  /**
   * Searches for the entered keyword in the
   * specified context on input
   */
  $input.on("input", function () {
      var searchVal = this.value;
      $content.unmark({
          done: function () {
              $content.mark(searchVal, {
                  separateWordSearch: true,
                  done: function () {
                      $results = $content.find("mark");
                      //  console.log($results.length);
                      $(".total").text($results.length);
                      currentIndex = 1;
                      jumpTo();
                  }
              });
          }
      });
  });

  /**
   * Clears the search
   */
  $clearBtn.on("click", function () {
      $content.unmark();
      $input.val("").focus();
  });

  /**
   * Next and previous search jump to
   */

  $nextBtn.add($prevBtn).on("click", function () {
      if ($results.length) {
          currentIndex += $(this).is($prevBtn) ? -1 : 1;

          if (currentIndex < 1) {
              currentIndex = $results.length - 1;
          }
          if (currentIndex > $results.length - 1) {
              currentIndex = 1;
          }

          $(".ed").text(currentIndex);
          jumpTo();
      }
  });
});