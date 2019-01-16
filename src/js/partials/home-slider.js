import $ from 'jquery';
import slick from 'slick-carousel';

const HomeSlider = {
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="120" viewBox="0 0 25 120"><path fill="none" fill-rule="evenodd" stroke="#FFF" stroke-width="3" d="M22.803 119L2 57.65 22.803.808"/></svg>',
    HomeSlider: null,
    vars: {
        HomeSliderClass: 'sib-slider__slick',
        HomeSlidesClass: 'sib-slider__item',
        autoPlaySpeed: 8000
    },
    init: () => {

        // Set all variables
        HomeSlider.setVars();

        // Init HomeSlider
        for (let i = 0; i < HomeSlider.HomeSlider.length; i++) {
            if ($(HomeSlider.HomeSlider[i]).find(`.${HomeSlider.vars.HomeSlidesClass}`).length > 1) {
                HomeSlider.initSlick($(HomeSlider.HomeSlider[i]));
            }
        }
    },
    setVars: () => {
        HomeSlider.HomeSlider = document.getElementsByClassName(HomeSlider.vars.HomeSliderClass);
    },
    initSlick: (slider) => {
        // Init slider
        slider.slick({
            dots: false,
            arrows: true,
            nextArrow: `<button type="button" class="slick-next">Next${HomeSlider.svg}</button>`,
            prevArrow: `<button type="button" class="slick-prev">Prev${HomeSlider.svg}</button>`,
            slidesToShow: 1,
            infinite: false,
            autoplay:false,
            pauseOnHover:false,
            autoplaySpeed:HomeSlider.vars.autoPlaySpeed
        });
    }
};

export default HomeSlider;
