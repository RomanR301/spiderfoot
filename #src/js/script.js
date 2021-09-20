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
      modalWindow.fadeIn();
      modalWindow.find('.modal__content').removeClass('animate-away').addClass('animate-in');

      $('body, html').addClass('active');
  },

  closeModal: function (id) {
      let modalWindow = $(id);
      modalWindow.find('.modal__content').removeClass('animate-in').addClass('animate-away');
      modalWindow.fadeOut();
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

// $(window).scroll(function () {
//   if ($(this).scrollTop() > 10) {
//     $('.scroll-to-top').addClass("scrolled");
//   } else {
//   	$('.scroll-to-top').removeClass("scrolled");
//   }
// });

document.body.addEventListener('keyup', function(e) {
  if (e.which === 9) /* tab */ {
    document.body.classList.remove('no-focus-outline');
  }
});


// HIDE MENU ON BODY CLICK

// $('html').click(function(e) {
//     var a = e.target;
//     if ($(a).parents('.menu-item-has-child').length === 0) {
//       $('.menu-item-has-child').removeClass('show'); //hide menu item
//    }
//   });

