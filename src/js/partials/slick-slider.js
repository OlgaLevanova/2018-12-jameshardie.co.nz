import $ from 'jquery';
import slick from 'slick-carousel';

const SlickSlider = {
    SlickSlider: null,
    sliderActive: [],
    sliderBreakpoint: 0,
    mode:'both',
    sliderBreakpointData:'slick-breakpoint',
    sliderModeData:'list-mode',
    sliderBreakpointDefault: 10000,
    // On unslick with responsive setting carousel not just destroy carousel, but remove all slides as well
    // So use settings without responsive if we need to destroy carousel on resize.
    slickSettings: {
        'both': {
            dots:false,
            arrows:false,
            slidesToShow:1,
            slidesToScroll:1,
            centerMode:true,
            centerPadding:'10%'
        },
        'bothLeft': {
            dots:false,
            arrows:false,
            infinite:false,
            slidesToShow:1,
            slidesToScroll:1
        },
        'slider': {
            dots:false,
            arrows:false,
            slidesToShow:3,
            slidesToScroll:3,
            centerMode:true,
            centerPadding:'20px',
            responsive: [
                {
                    breakpoint:1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint:992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding:'10%'
                    }
                }
            ]
        }
    },
    vars: {
        SlickSliderClass: 'mobile-slick-carousel',
        autoPlaySpeed: 8000
    },
    init: () => {

        // Set all variables
        SlickSlider.setVars();

        if (SlickSlider.SlickSlider) {
            for (let i = 0; i < SlickSlider.SlickSlider.length; i++) {

                let sliderBreakpoint = Number($(SlickSlider.SlickSlider[i]).data(SlickSlider.sliderBreakpointData));
                if (sliderBreakpoint === -1) sliderBreakpoint = SlickSlider.sliderBreakpointDefault;

                let mode = $(SlickSlider.SlickSlider[i]).data(SlickSlider.sliderModeData);

                SlickSlider.setActivity(i, false);

                // Init SlickSlider
                if ($(SlickSlider.SlickSlider[i]).children().length > 1) {
                    SlickSlider.initSlick($(SlickSlider.SlickSlider[i]), sliderBreakpoint, mode, i);
                }
            }
        }
    },
    setVars: () => {
        SlickSlider.SlickSlider = document.getElementsByClassName(SlickSlider.vars.SlickSliderClass);
    },
    setActivity: (i, active) => {
        SlickSlider.sliderActive[i] = active;
    },
    initSlick: (slider, sliderBreakpoint, mode, i) => {
        if (mode !== 'tiles') {
            // Check size of the window
            // Create slider on mobile screen, destroy on desktop
            SlickSlider.checkWindow(slider, sliderBreakpoint, mode, i);

            if (mode === 'both' || mode === 'bothLeft') {
                // Watch changing of window width to check if slider should be created or destroyed on breakpoint
                SlickSlider.watchSlick(slider, sliderBreakpoint, mode, i);
            }
        }
    },
    createSlick: (slider, mode) => {
        // Init slider
        slider.slick(SlickSlider.slickSettings[mode]);
    },
    destroySlick: (slider) => {
        slider.slick('unslick');
    },
    checkWindow: (slider, sliderBreakpoint, mode, i) => {
        if (window.innerWidth <= sliderBreakpoint && !SlickSlider.sliderActive[i]) {

            SlickSlider.createSlick(slider, mode);

            SlickSlider.setActivity(i, true);
            // SlickSlider.sliderActive = true;
        }
        if (window.innerWidth > sliderBreakpoint && SlickSlider.sliderActive[i]) {
            SlickSlider.destroySlick(slider);

            SlickSlider.setActivity(i, false);
            // SlickSlider.sliderActive = false;
        }
    },
    watchSlick: (slider, sliderBreakpoint, mode, i) => {
        window.addEventListener('resize', function (event) {
            SlickSlider.checkWindow(slider, sliderBreakpoint, mode, i);
        });
    }
};

export default SlickSlider;
