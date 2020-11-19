$(document).ready(function () {

    // fixed nav panel

    let headerH = $('.header-top-wrap');
    let headContent = $('.header-content').innerHeight();
    let scrollOffset = $(window).scrollTop();

    checkScroll(scrollOffset);

    $(window).on('scroll', function (e) {
        scrollOffset = $(this).scrollTop();
        checkScroll(scrollOffset);
    });

    function checkScroll(scrollOffset) {
        if (scrollOffset >= headContent) {
            headerH.addClass('fixed');
        }
        else {
            headerH.removeClass('fixed');
        }
    }

    // scroll nav items

    $('[data-scroll]').on('click', function (e) {
        e.preventDefault();

        let blockId = $(this).data('scroll'),
            blockOffset = $(blockId).offset().top;
            

        $('html, body').animate({
            scrollTop: blockOffset
        }, 800);

        
    });

    // mobile menu controll

    $(".header__menu-btn").click(function (e) {
        $(this).toggleClass("header__menu-btn--close");
        $(".header-nav").toggleClass("header-nav--opened");
    });


    // -- slider

    let headerSliderDelay = 7000; // time to next slide
    let headerSliderInterval; // for correct switching slides
    let headerSliderCurrent = 0; // for index of current slide 
    let headerSliderSlides = $(".section--header .slides-item").toArray(); // make array from jq elements list

    $(".js-header-slider").slick({ // slider initialization
        infinite: true,
        speed: 1000,
        fade: true,
        cssEase: 'linear',
        dots: false,
        prevArrow: false,
        nextArrow: false,
        zIndex: 0,
        draggable: false
    });

    headerSliderSwitch(0); // for launch slide switching process

    function headerSliderSwitch(slide = null) { // function need for slide switching
        // reset interval
        clearInterval(headerSliderInterval);
        headerSliderInterval = setInterval(headerSliderSwitch, headerSliderDelay);

        // reset process line for each slide
        headerSliderSlides.forEach(function (currentValue) {
            $(currentValue).find(".process .process-filled").stop().css({ width: 0 });
        });

        // go to wanted slide or to next one
        if (slide != null) {
            $(".js-header-slider").slick("slickGoTo", slide);
            headerSliderCurrent = slide;
        } else {
            $(".js-header-slider").slick("slickNext");
            headerSliderCurrent = $(".js-header-slider").slick("slickCurrentSlide");
        }

        // animate process line for current slide
        $(headerSliderSlides[headerSliderCurrent]).find(".process .process-filled").animate({ width: "100%" }, headerSliderDelay);
    }

    // click on slide control
    $(".section--header .slides-item").click(function (e) {
        headerSliderSwitch(headerSliderSlides.indexOf(e.currentTarget));
    });
    // -- slider

    // slow scroll to Learn More
    $(".js-anchor").click(function () {
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated)").animate({
            scrollTop: destination
        }, 800);
        return false;
    });

    $('[data-collapse]').on('click', function(e) {
        e.preventDefault();

        let $this = $(this);
        let blockId = $this.data('collapse');

        $this.toggleClass('active');
        
    })
 
});