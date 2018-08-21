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

	// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
	// $('#main__menu a[href^="#"]').click( function(){ 
	// 	var scroll_el = $(this).attr('href'); 
	// 	if ($(scroll_el).length != 0) {
	// 	$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
	// 	}
	// 	return false;
	// });

	// Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
    // $(document).ready(function(){
    //     var HeaderTop = $('.header').offset().top;
        
    //     $(window).scroll(function(){
    //             if( $(window).scrollTop() > HeaderTop ) {
    //                     $('.header').addClass('stiky');
    //             } else {
    //                     $('.header').removeClass('stiky');
    //             }
    //     });
    // });
    $(document).ready(function(){
        var HeaderTop = $('#js-header').offset().top + 50;
        
        $(window).scroll(function(){
                if( $(window).scrollTop() > HeaderTop ) {
                        $('#js-header').addClass('stiky');
                } else {
                        $('#js-header').removeClass('stiky');
                }
        });
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
	$('.js-slider__top').slick({
		arrows: false,
		dots: true,
		slidesToShow: 1,
		responsive: [
	    {
			breakpoint: 992,
			settings: {
				dots: false
			}
	    }
	    ]
	});
	
	$('.slick-dots').wrap('<div class="slick-dots__wrap"></div>');

	$('.js-slider__top_prev').on('click', function() {
	 	$('.js-slider__top').slick('slickPrev');
	 });

	 $('.js-slider__top_right').on('click', function() {
	 	$('.js-slider__top').slick('slickNext');
	 });

	$('.slick-dots__wrap button').on('click', function() {
		var $this = $(this);

		if( !$this.hasClass('active') ) {
			$('.slick-dots__wrap button').removeClass('active');
		}

		$this.toggleClass('active');
	});

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
				slidesToShow: 1,
			},
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

});