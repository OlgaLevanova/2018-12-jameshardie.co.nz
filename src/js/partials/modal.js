import $ from 'jquery';
import MagnificPopup from 'magnific-popup';

const Modal = {
    imageTrigger:'button--image',
    galleryTrigger:'button--gallery',
    videoTrigger:'button--video',
    keyCodeNumber: 27,
    init: () => {
        const overlayTrigger = document.getElementsByClassName('button--overlay');
        Modal.modalImage();
        Modal.modalGallery();
        Modal.modalVideo();
        if (overlayTrigger.length) {
            Modal.modal(overlayTrigger);
        }
    },
    modalImage: () => {
        const triggers = document.getElementsByClassName(Modal.imageTrigger);
        // const triggers = $(`.${Modal.imageTrigger}`);

        for (let i = 0; i < triggers.length; i++) {

            const popupInfo = Modal.popupInfo($(triggers[i]));

            $(triggers[i]).magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                mainClass: 'mfp-img-mobile',
                image: {
                    verticalFit: true,
                    markup: Modal.imageString(popupInfo),
                    cursor: null,
                }

            });
        }
    },
    modalGallery: () => {
        const triggers = $(`.${Modal.galleryTrigger}`);

        if (triggers.length > 0) {
            triggers.magnificPopup({
                delegate: 'a',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                    titleSrc: function(item) {
                        return `${item.el.attr('title')} by Marsel Van Oosten</small>`;
                    }
                }
            });
        }
    },
    modalVideo: () => {
        const triggers = document.getElementsByClassName(Modal.videoTrigger);

        for (let i = 0; i < triggers.length; i++) {
            triggers[i].addEventListener('click', () => {

                const popupInfo = Modal.popupInfo($(triggers[i]));

                $.magnificPopup.open({
                    items: {
                        src: `http://www.youtube.com/watch?v=${triggers[i].getAttribute('data-video-id')}`
                    },
                    type: 'iframe',
                    iframe: {
                        markup: Modal.iframeString(popupInfo)
                    },
                    removalDelay: 300,
                    mainClass: 'mfp-fade'
                });
            });
        }
    },
    popupInfo: (trigger) => {
        const popupInfoContainer = trigger.siblings('.popup-info');

        const popupInfo = {
            title: popupInfoContainer.find('.popup-title').html(),
            subTitle: popupInfoContainer.find('.popup-subtitle').html(),
            bottomTitle: popupInfoContainer.find('.popup-bottomTitle').html(),
            link: popupInfoContainer.find('.popup-link').html(),
        };

        return popupInfo;
    },
    iframeString: (popupInfo) => {
        return `<div class="mfp-iframe-scaler">
                    <div class="mfp-top">
                        <div class="mfp-close"></div>
                        <div class="mfp-top__inner">
                            <div class="mfp-popup-title">${popupInfo.title}</div>
                            <div class="mfp-subtitle">${popupInfo.subTitle}</div>
                        </div>
                    </div>
                    <iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>
                    <div class="mfp-bottom">
                        <div class="mfp-bottomTitle">${popupInfo.bottomTitle}</div>
                        <div class="mfp-link">${popupInfo.link}</div>                        
                    </div>                        
                </div>`;
    },
    imageString: (popupInfo) => {
        return `<div class="mfp-figure">
                    <div class="mfp-top">
                        <div class="mfp-close"></div>
                        <div class="mfp-top__inner">
                            <div class="mfp-popup-title">${popupInfo.title}</div>
                            <div class="mfp-subtitle">${popupInfo.subTitle}</div>
                        </div>
                    </div>
                    <div class="mfp-img"></div>
                    <div class="mfp-bottom-bar">
                        <div class="mfp-bottom">
                            <div class="mfp-bottomTitle">${popupInfo.bottomTitle}</div>
                            <div class="mfp-link">${popupInfo.link}</div>                        
                        </div>   
                    </div>
                </div>`;
    },
    modal: (triggers) => {
        for (let i = 0; i < triggers.length; i++) {
            triggers[i].addEventListener('click', (e) => {
                e.preventDefault();
                if (triggers[i].hasAttribute('data-target')) {
                    let overlayModal = document.getElementById(triggers[i].getAttribute('data-target'));

                    overlayModal.classList.toggle('active');
                }
            });
        }

        document.onkeydown = function(e) {
            let el = e || window.event;
            let isEscape = false;
            if ('key' in el) {
                isEscape = (el.key === 'Escape' || el.key === 'Esc');
            } else {
                isEscape = (el.keyCode === Modal.keyCodeNumber);
            }
            // close options and active rooms on Esc
            if (isEscape) {
                // close active search modal
                $('.sib-overlay.active').removeClass('active');
            }
        };
        $(document).mouseup(function(e) {
            let detail = $('.content__details');
            if (!$('.sib-overlay').is(e.target) && !detail.is(e.target) && detail.has(e.target).length === 0) {
                $('.sib-overlay.active').toggleClass('active');
            }
        });
    }
};

export default Modal;
