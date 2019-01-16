const SibOverlay = {
    bindEvents: () => {
        const sibOverlays = document.getElementsByClassName('sib-overlay__toggle');
        if (sibOverlays.length) {
            SibOverlay.init(sibOverlays);
        }
    },

    init: (overlays) => {
        for (let i = 0; i < overlays.length; i++) {
            overlays[i].addEventListener('click', (e) => {
                e.preventDefault();
                if (overlays[i].hasAttribute('data-target')) {
                    let overlayModal = document.getElementById(overlays[i].getAttribute('data-target'));
                    if (overlayModal) {
                        overlayModal.classList.toggle('active');
                    }
                }
                if (overlays[i].hasAttribute('data-focus')) {
                    let focusElement = document.getElementById(overlays[i].getAttribute('data-focus'));
                    if (focusElement) {
                        focusElement.focus();
                    }
                }
            });
        }
    },
};

module.exports = SibOverlay;
