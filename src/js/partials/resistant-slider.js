import $ from 'jquery';
import slick from 'slick-carousel';

const ResistantSlider = {
    setting: {
        arrows: false,
        infinite: false,
        speed: 500,
        cssEase: 'linear',
        slidesToShow:1,
        slidesToScroll:1
    },
    bindEvents: () => {
        let slideContainer = $('[slick-slider]');
        let resistantItem = $('.product-resistants__item');

        if (slideContainer.length) {
            ResistantSlider.init(slideContainer);
        }

        if (resistantItem.length) {
            ResistantSlider.tab(resistantItem);
        }
    },
    init: (slideContainer) => {
        ResistantSlider.createSlick(slideContainer);
        const detail = $('.item__details');
        const first = $('.product-resistants__item').first();
        let icon = first.data('icon');
        let title = first.data('title');
        let text = first.data('text');
        detail.html(`<div class="row">
        <div class="d-none">
            <img src="${icon}" alt="icon">
        </div>
        <div class="col brb">
            <div class="details__title">${title}</div>
            <div class="details__text">${text}</div>
        </div>
        </div>`);
    },
    createSlick: (slider) => {
        // Init slider
        const desktop = 1280;
        if ($(window).width() >= desktop) {
            let deskSetting = Object.assign({ draggable:false }, ResistantSlider.setting);
            slider.slick(deskSetting);
        } else {
            slider.slick(ResistantSlider.setting);
        }
    },
    tab: (item) => {
        item.on('click', function() {
            const detail = $('.item__details');
            let icon = $(this).data('icon');
            let title = $(this).data('title');
            let text = $(this).data('text');
            detail.html(`<div class="row">
            <div class="d-none">
                <img src="${icon}" alt="icon">
            </div>
            <div class="col brb">
                <div class="details__title">${title}</div>
                <div class="details__text">${text}</div>
            </div>
        </div>`);
        });
    }

};

export default ResistantSlider;
