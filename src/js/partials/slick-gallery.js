import $ from 'jquery';
import slick from 'slick-carousel';

const SlickGallery = {
    SlickGallery: null,
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
        SlickGalleryClass: 'mobile-slick-carousel',
        autoPlaySpeed: 8000
    },
    init: () => {

        // Set all variables
        SlickGallery.setVars();

        if (SlickGallery.SlickGallery) {
            for (let i = 0; i < SlickGallery.SlickGallery.length; i++) {

                let sliderBreakpoint = Number($(SlickGallery.SlickGallery[i]).data(SlickGallery.sliderBreakpointData));
                if (sliderBreakpoint === -1) sliderBreakpoint = SlickGallery.sliderBreakpointDefault;

                let mode = $(SlickGallery.SlickGallery[i]).data(SlickGallery.sliderModeData);

                SlickGallery.setActivity(i, false);

                // Init SlickGallery
                if ($(SlickGallery.SlickGallery[i]).children().length > 1) {
                    SlickGallery.initSlick($(SlickGallery.SlickGallery[i]), sliderBreakpoint, mode, i);
                }
            }
        }
    },
    setVars: () => {
        SlickGallery.SlickGallery = document.getElementsByClassName(SlickGallery.vars.SlickGalleryClass);
    },
    setActivity: (i, active) => {
        SlickGallery.sliderActive[i] = active;
    },
    initSlick: (slider, sliderBreakpoint, mode, i) => {
        if (mode !== 'tiles') {
            // Check size of the window
            // Create slider on mobile screen, destroy on desktop
            SlickGallery.checkWindow(slider, sliderBreakpoint, mode, i);

            if (mode === 'both' || mode === 'bothLeft') {
                // Watch changing of window width to check if slider should be created or destroyed on breakpoint
                SlickGallery.watchSlick(slider, sliderBreakpoint, mode, i);
            }
        }
    },
    createSlick: (slider, mode) => {
        // Init slider
        slider.slick(SlickGallery.slickSettings[mode]);
    },
    destroySlick: (slider) => {
        slider.slick('unslick');
    },
    checkWindow: (slider, sliderBreakpoint, mode, i) => {
        if (window.innerWidth <= sliderBreakpoint && !SlickGallery.sliderActive[i]) {

            SlickGallery.createSlick(slider, mode);

            SlickGallery.setActivity(i, true);
        }
        if (window.innerWidth > sliderBreakpoint && SlickGallery.sliderActive[i]) {
            SlickGallery.destroySlick(slider);

            SlickGallery.setActivity(i, false);
        }
    },
    watchSlick: (slider, sliderBreakpoint, mode, i) => {
        window.addEventListener('resize', function (event) {
            SlickGallery.checkWindow(slider, sliderBreakpoint, mode, i);
        });
    }
};

export default SlickGallery;
