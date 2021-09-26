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
      if (window.matchMedia('(max-width: 992px)').matches) {
        $(document).on('click', '.menu-item-has-children .sub-menu-button', function(){
          $(this).toggleClass('menuOpen').next().slideToggle();
        })
    } else {
        null
    }
    $(document).on('click', 'a[href^="#"]', function (event) {
      event.preventDefault();
  
      $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top - 100
      }, 500);
      $('body').removeClass('active');
      $('.hamburger').removeClass('open');
      $('.navbar').removeClass('active');
    });
    $(document).on('click', '.table-view', function() {
      $(this).addClass('active');
      $('.card-view').removeClass('active');
      $('.modules-list').removeClass('card-list');
    })
    $(document).on('click', '.card-view', function() {
      $(this).addClass('active');
      $('.table-view').removeClass('active');
      $('.modules-list').addClass('card-list');
    })

    if(window.matchMedia('(max-width: 768px)').matches){
      $(this).addClass('active');
      $('.table-view').removeClass('active');
      $('.modules-list').addClass('card-list');
    }
    

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





document.addEventListener('DOMContentLoaded', createSelect, false);
function createSelect() {
    var select = document.getElementsByClassName('custom-select'),
      liElement,
      ulElement,
      optionValue,
      iElement,
      optionText,
      selectDropdown,
      elementParentSpan;

      for (var select_i = 0, len = select.length; select_i < len; select_i++) {
        //console.log('selects init');

      select[select_i].style.display = 'none';
      wrapElement(document.getElementById(select[select_i].id), document.createElement('div'), select_i, select[select_i].getAttribute('placeholder-text'));

      for (var i = 0; i < select[select_i].options.length; i++) {
        liElement = document.createElement("li");
        optionValue = select[select_i].options[i].value;
        optionText = document.createTextNode(select[select_i].options[i].text);
        liElement.className = 'select-dropdown__list-item';
        liElement.setAttribute('data-value', optionValue);
        liElement.appendChild(optionText);
        ulElement.appendChild(liElement);

        liElement.addEventListener('click', function () {
          displyUl(this);
        }, false);
      }
    }
    function wrapElement(el, wrapper, i, placeholder) {
      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);

      document.addEventListener('click', function (e) {
        let clickInside = wrapper.contains(e.target);
        if (!clickInside) {
          let menu = wrapper.getElementsByClassName('select-dropdown__list');
          menu[0].classList.remove('active');
        }
      });

      var buttonElement = document.createElement("button"),
        spanElement = document.createElement("span"),
        spanText = document.createTextNode(placeholder);
        iElement = document.createElement("i");
        ulElement = document.createElement("ul");

      wrapper.className = 'select-dropdown select-dropdown--' + i;
      buttonElement.className = 'select-dropdown__button select-dropdown__button--' + i;
      buttonElement.setAttribute('data-value', '');
      buttonElement.setAttribute('type', 'button');
      spanElement.className = 'select-dropdown select-dropdown--' + i;
      iElement.className = 'icon-icon-shevron';
      ulElement.className = 'select-dropdown__list select-dropdown__list--' + i;
      ulElement.id = 'select-dropdown__list-' + i;

      wrapper.appendChild(buttonElement);
      spanElement.appendChild(spanText);
      buttonElement.appendChild(spanElement);
      buttonElement.appendChild(iElement);
      wrapper.appendChild(ulElement);
    }

    function displyUl(element) {

      if (element.tagName == 'BUTTON') {
        selectDropdown = element.parentNode.getElementsByTagName('ul');
        //var labelWrapper = document.getElementsByClassName('js-label-wrapper');
        for (var i = 0, len = selectDropdown.length; i < len; i++) {
          selectDropdown[i].classList.toggle("active");
          //var parentNode = $(selectDropdown[i]).closest('.js-label-wrapper');
          //parentNode[0].classList.toggle("active");
        }
      } else if (element.tagName == 'LI') {
        var selectId = element.parentNode.parentNode.getElementsByTagName('select')[0];
        selectElement(selectId.id, element.getAttribute('data-value'));
        elementParentSpan = element.parentNode.parentNode.getElementsByTagName('span');
        element.parentNode.classList.toggle("active");
        elementParentSpan[0].textContent = element.textContent;
        elementParentSpan[0].parentNode.setAttribute('data-value', element.getAttribute('data-value'));
      }

    }
    function selectElement(id, valueToSelect) {
      var element = document.getElementById(id);
      element.value = valueToSelect;
      element.setAttribute('selected', 'selected');
    }
    var buttonSelect = document.getElementsByClassName('select-dropdown__button');
    for (var i = 0, len = buttonSelect.length; i < len; i++) {
      buttonSelect[i].addEventListener('click', function (e) {
				e.preventDefault();
				displyUl(this);
			}, false);
		}
}