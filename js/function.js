$(document).ready(function() {

	// First screen full height
	function setHeiHeight() {
	    $('.full__height').css({
	        minHeight: $(window).height() + 'px'
	    });
	}
	setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
	$(window).resize( setHeiHeight ); // обновляем при изменении размеров окна


	// Reset link whte attribute href="#"
	$('[href*="#"]').click(function(event) {
		event.preventDefault();
	});

	// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку.
    var HeaderTop = $('#js-header').offset().top + 50;
    
    $(window).scroll(function(){
            if( $(window).scrollTop() > HeaderTop ) {
                    $('#js-header').addClass('stiky');
            } else {
                    $('#js-header').removeClass('stiky');
            }
    });

    // Smooth scroll to the pages Block
	$('#js-navbar a').on('click', function(e) {
		e.preventDefault();

		var currentBlock = $(this).attr('href'),
			currentBlockOffset = $(currentBlock).offset().top;

		$('html, body').animate({
    		scrollTop: currentBlockOffset - 78
    	}, 500);
	});


    // Mobile menu
    $('.js__navbar-toggle').on('click', function(e) {
		e.preventDefault();
		var $this = $(this),
			navbar = $('.js-navbar'),
			navH = $('.js-navbar').innerHeight();

		if(!$this.hasClass('open')) {
			$('.js-navbar').slideUp(1000);
			$('.js__navbar-toggle').removeClass('open');
		}

		$this.toggleClass('open');
		$(navbar).slideToggle();
	});


	// Slick slider https://github.com/kenwheeler/slick
	// Slider Top
	$('.js-slider__top').slick({
		arrows: false,
		dots: false,
		slidesToShow: 1,
		asNavFor: '.js-slider__top_gallery'
	});
	$('.js-slider__top_gallery').slick({
	  slidesToShow: 6,
	  slidesToScroll: 1,
	  asNavFor: '.js-slider__top',
	  dots: false,
	  arrows: false,
	  focusOnSelect: true,
	  responsive: [
	    {
			breakpoint: 1000,
			settings: {
				slidesToShow: 5
			}
		}
	    ]
	});

	$('.js-slider__top_prev').on('click', function() {
	 	$('.js-slider__top').slick('slickPrev');
	 });

	 $('.js-slider__top_right').on('click', function() {
	 	$('.js-slider__top').slick('slickNext');
	 });

	$('.slider__top_gallery_item').on('click', function() {
		var $this = $(this);

		if( !$this.hasClass('active') ) {
			$('.slider__top_gallery_item').removeClass('active');
		}

		$this.toggleClass('active');
	});

	// Slider Interior
	$('.js-slider__interior').slick({
		arrows: false,
		dots: false,
		centerMode: true,
		centerPadding: '60px',
		slidesToShow: 3,
		responsive: [
	    {
			breakpoint: 991,
			settings: {
				arrows: false,
				centerMode: true,
		        centerPadding: '60px',
				slidesToShow: 2,
			}
		},
		{
			breakpoint: 600,
			settings: {
				arrows: false,
				centerMode: true,
		        centerPadding: '0px',
				slidesToShow: 1,
			}
	    }
	    ]
	});
	$('.js-interior_prev').on('click', function() {
	 	$('.js-slider__interior').slick('slickPrev');
	 });

	$('.js-interior_next').on('click', function() {
		$('.js-slider__interior').slick('slickNext');
	});

	formSubmit();

});

// Yandex map https://tech.yandex.ru/maps/doc/jsapi/2.1/quick-start/index-docpage/
ymaps.ready(init);
function init(){  
    var myMap = new ymaps.Map("map", {
        center: [55.75492738, 37.61484326],
        zoom: 12,
        controls: ['smallMapDefaultSet']
    });

    myMap.behaviors.disable([
    	'drag',
    	'scrollZoom'
	]);

    var myPin = new ymaps.GeoObjectCollection({}, {
	    iconLayout: 'default#image',
	    iconImageHref: 'img/point.png',
	    iconImageSize: [33, 34],
	    iconImageOffset: [-5, -50]
	});

    var myPlacemark1 = new ymaps.Placemark([55.747137, 37.583338], {	    	
        balloonContent: '<div class="balloonTime">Время работы:<br>с 8:00 до 23:00</div><div class="ballonPhone">Контактный телефон:<br>+7 (495) 504-3487 доб. 6772</div>'
	});

	var myPlacemark2 = new ymaps.Placemark([55.761778, 37.628258], {	    	
        balloonContent: '<div class="balloonTime">Время работы:<br>с 8:00 до 23:00</div><div class="ballonPhone">Контактный телефон:<br>+7 (495) 504-3487 доб. 5988</div>'
	});
    
    myPin.add(myPlacemark1).add(myPlacemark2);
    myMap.geoObjects.add(myPin);

    $('#arbat').on('click', function() {
		myMap.setCenter([55.747137, 37.583338], 16, {
			checkZoomRange: true
		});
	});

	$('#lubyanka').on('click', function() {
		myMap.setCenter([55.761778, 37.628258], 16, {
			checkZoomRange: true
		});
	});
}


// Простая проверка форм на заполненность и отправка аяксом
function formSubmit() {
    $("[type=submit]").on('click', function (e){ 
        e.preventDefault();
        var form = $(this).closest('form');
        var url = form.attr('action');
        var form_data = form.serialize();
        var field = form.find('[required]');

        empty = 0;

        field.each(function() {
            if ($(this).val() == "") {
                $(this).addClass('invalid');
                empty++;
            } else {
                $(this).removeClass('invalid');
                $(this).addClass('valid');
            }  
        });


        if (empty > 0) {
            return false;
            $.ajax({
                url: url,
                type: "POST",
                dataType: "html",
                data: form_data,
                success: function (response) {
                    console.log(response);
                    // Дальше несколько вариантов
                    // Открываем окно с сообщением
                    // $('#success').modal('show');
                    // Открываем какую то страницу. как правило так называемую "страницу спасибо"
                    // document.location.href = "success.html";
                    $('#rezult').text('Сообщение успешно отправлено');
                },
                // При ошибке отправки
                error: function (response) {
                    console.log(response);
                    // Тоже что нибудь делаем
                    // $('#success').modal('show');
                    // Выводим в заготовленный блок какое то сообщение
                    $('#rezult').text('Проверте корректность заполнения полей формы.');
                }
            });
        }

    });
    // Убираем класс invalid при снятии фокуса если поле не пустое
    $('[required]').on('blur', function() {
        if ($(this).val() != '') {
            $(this).removeClass('invalid');
        }
    });
}