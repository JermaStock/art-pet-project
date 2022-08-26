(function() {
	function modalPopupInit() {
		const galleryBtns = document.querySelectorAll('.gallery-swiper__img');
		const closeBtn = document.querySelector('.popup__close');
		const modal = document.querySelector('.popup');
		const modalContent = document.querySelector('.popup__content');

		galleryBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				modal.classList.add('popup-active');
			})
		});

		modal.addEventListener('click', e => {
			let blockCoordinates = modalContent.getBoundingClientRect();

			if (!((e.clientX >= blockCoordinates.left && e.clientX <= blockCoordinates.right) &&
			(e.clientY >= blockCoordinates.top && e.clientY <= blockCoordinates.bottom))) {
				modal.classList.remove('popup-active');
			} 
		});

		closeBtn.addEventListener('click', () => {
			modal.classList.remove('popup-active')
		});
	}

	function menuInit() {
		const burger = document.querySelector('.burger');
		const menu = document.querySelector('.header__nav');
		const menuLinks = document.querySelectorAll('.nav__link');
		const authBtn = document.querySelector('.nav__auth');
		const menuActiveClass = 'header__nav--active';

		burger.addEventListener('click', () => {
			burger.classList.toggle('burger-active');
			menu.classList.toggle(menuActiveClass);
			document.body.classList.toggle('stop-scroll');
		});

		menuLinks.forEach(link => {
			link.addEventListener('click', () => {
				burger.classList.toggle('burger-active');
				menu.classList.remove(menuActiveClass);
				document.body.classList.remove('stop-scroll');
			})
		});

		authBtn.addEventListener('click', () => {
			burger.classList.toggle('burger-active');
			menu.classList.remove(menuActiveClass);
			document.body.classList.remove('stop-scroll');
		});
	}

	function searchInit() {
		const searchBtn = document.querySelector('.search');
		const searchDropdown = document.querySelector('.search-dropdown');
		const searchBtnStart = document.querySelector('.search-dropdown__btn');
		const searchInput = document.querySelector('.search-form__input');
		const searchClose = document.querySelector('.search-dropdown__close');

		searchBtn.addEventListener('click', () => {
			searchDropdown.classList.add('search-dropdown-active');
		});

		searchBtnStart.addEventListener('click', () => {
			searchDropdown.classList.remove('search-dropdown-active');
		});

		searchDropdown.addEventListener('submit', () => {
			searchInput.value = '';
		})

		searchClose.addEventListener('click', e => {
			e.preventDefault();
			searchDropdown.classList.remove('search-dropdown-active');
		})
		
	}

	function dropDownInit() {
		const dropdownItem = document.querySelectorAll('.header-dropdown__title');
		const dropdownMenu = document.querySelectorAll('.header-dropdown__menu');
		const dropdownBtn = document.querySelectorAll('.header-dropdown__btn');
		const dropdownArrow = document.querySelectorAll('.header-dropdown__arrow');
		let prevDropPath;

		dropdownItem.forEach(el => {
			el.addEventListener('click', e => {
				const path = e.currentTarget.dataset.dropdown;
				
				dropdownArrow.forEach(el => {
					el.classList.remove('header-dropdown__arrow--active');
				});
				dropdownMenu.forEach(el => {
					el.classList.remove('header-dropdown__menu--active');
				});

				document.querySelector(`[data-arrow=${path}]`).classList.add('header-dropdown__arrow--active');
				document.querySelector(`[data-target-dropdown=${path}]`).classList.add('header-dropdown__menu--active');
				
				if (prevDropPath === path) {
					document.querySelector(`[data-arrow=${path}]`).classList.remove('header-dropdown__arrow--active');
					document.querySelector(`[data-target-dropdown=${path}]`).classList.remove('header-dropdown__menu--active');
				}

				if (!prevDropPath || prevDropPath !== path) {
					prevDropPath = path
				} else {
					prevDropPath = null
				}

				dropdownBtn.forEach(btn => {
					btn.addEventListener('click', () => {
						document.querySelector(`[data-arrow=${path}]`).classList.remove('header-dropdown__arrow--active');
						document.querySelector(`[data-target-dropdown=${path}]`).classList.remove('header-dropdown__menu--active');
						prevDropPath = null;
					})
				})
			})
		})
	}

	function catalogTabs() {
		document.querySelectorAll(".catalog-body__btn").forEach(tabsBtn => {
      tabsBtn.addEventListener("click", (e) => {
        const path = e.currentTarget.dataset.path;

        document.querySelectorAll(".catalog-info__item").forEach(tabsBtn => {
          tabsBtn.classList.remove("catalog-info--active");
        });

        document.querySelector(`[data-target="${path}"]`).classList.add("catalog-info--active");
      });
    });
	}

	document.addEventListener('DOMContentLoaded', () => {
		modalPopupInit();

		menuInit();
		
		searchInit();

		document.querySelectorAll(".header-dropdown__menu").forEach(dropdown => {
      new SimpleBar(dropdown, {
        autoHide: false,
        scrollbarMaxSize: 30,
				ariaLabel: 'Выпадающее меню',
      });
    });

		dropDownInit();

		new Swiper('.hero__swiper', {
			direction: 'horizontal',
			loop: true,
			speed: 1000,
			autoplay: {
				delay: 9000,
			},
		});

		new Choices('.gallery__select', {
			searchEnabled: false,
			itemSelectText: '',
			allowHTML: false,
			shouldSort: false,
			position: 'bottom',
		});

		new Swiper('.gallery-swiper', {
			direction: 'horizontal',
			slidesPerView: 1,
			enabled: true,
			focusableElements: 'buttons',
			pagination: {
				el: '.gallery-swiper__pagination',
				type: 'fraction',
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				577: {
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 38,
				},
				870: {
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 34,
				},
				1130: {
					slidesPerView: 3,
					slidesPerGroup: 3,
					spaceBetween: 50,
				}
			},
			a11y: {
				prevSlideMessage: 'Предыдущий слайд',
				nextSlideMessage: 'Следующий слайд',
			},
		});

		new Accordion('.accordion-list', {
			elementClass: 'accordion',
			triggerClass: 'accordion__control',
			panelClass: 'accordion__content',
			activeClass: 'accordion--active',
		});

		catalogTabs();

		new Swiper('.events-swiper', {
			direction: 'horizontal',
			slidesPerView: 1,
			slidesPerGroup: 1,
			spaceBetween: 34,
			pagination: {
				el: '.events-swiper-pagination',
				type: 'bullets',
				clickable: true,
			},
			navigation: {
				nextEl: '.events-swiper-button-next',
				prevEl: '.events-swiper-button-prev',
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
					slidesPerGroup: 2,
				},
				1023: {
					slidesPerView: 3,
					slidesPerGroup: 3,
					spaceBetween: 27,
				},
				1440: {
					slidesPerView: 3,
					slidesPerGroup: 3,
					spaceBetween: 50,
				}
			},
			a11y: {
				prevSlideMessage: 'Предыдущий слайд',
				nextSlideMessage: 'Следующий слайд',
				paginationBulletMessage: 'Перейти к слайду {{index}}',
			},
		});

		tippy('.tooltip', {
			hideOnClick: false,
		});

		new Swiper('.projects-swiper', {
			direction: 'horizontal',
			slidesPerView: 1,
			spaceBetween: 33.97,
			enabled: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				577: {
					slidesPerView: 2,
					slidesPerGroup: 2,
				},
				992: {
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 50,
				},
				1440: {
					slidesPerView: 3,
					slidesPerGroup: 3,
					spaceBetween: 50,
				},
			},
			a11y: {
				prevSlideMessage: 'Предыдущий слайд',
				nextSlideMessage: 'Следующий слайд',
			},
		});

		new JustValidate('.contact-form', {
			colorWrong: '#D11616',
			messages: {
				name: {
					minLength: 'Мин. длина: 2 символа',
					maxLength: 'Макс. длина: 30 символов',
					required: 'Введите имя',
				},
				tel: {
					required: 'Введите телефон',
					function: 'Некоректный номер телефона'
				},
			},
			rules: {
				name: {
					required: true,
					minLength: 2,
					maxLength: 30,
				},
				tel: {
					required: true,
					function: () => {
						let phone = document.querySelector('[data-validate-field="tel"]');
						return Number(phone.value) && phone.value.length === 11;
					},
				},
			},
		});

		ymaps.ready(init);
    function init() {
      var myMap = new ymaps.Map("y-map", {
        center: [55.76017431882234,37.61464826805449],
        zoom: 14,
      });

      var myPlacemark = new ymaps.Placemark(
        [55.76017431882234,37.61464826805449],
        {},
        {
          iconLayout: "default#image",
          iconImageHref: "../img/mapMark.svg",
          iconImageSize: [20, 20],
          iconImageOffset: [-3, -42],
        }
      );

      myMap.geoObjects.add(myPlacemark);
			myMap.controls.remove('searchControl');
			myMap.controls.remove('geolocationControl');
			myMap.controls.remove('trafficControl');
			myMap.controls.remove('rulerCon');
			myMap.controls.remove('fullscreenControl');
			myMap.controls.remove('typeSelector');
			myMap.controls.remove('rulerControl');
			myMap.behaviors.disable('scrollZoom');
    }
	})
})();