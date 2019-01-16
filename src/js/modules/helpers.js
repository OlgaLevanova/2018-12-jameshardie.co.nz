import $ from 'jquery';

const Helpers = {
    // get height of element
    getHeight: (elem) => {
        return Math.max(elem.scrollHeight, elem.offsetHeight, elem.clientHeight);
    },

    // get window size
    getWindowSize: () => {
        let winH;
        let winW;

        if (window.innerWidth) {
            winW = window.innerWidth;
            winH = window.innerHeight;
        } else if (document.body && document.body.offsetWidth) {
            winW = document.body.offsetWidth;
            winH = document.body.offsetHeight;
        }

        return { height: winH, width: winW };
    },

    equalHeight: (container, equal) => {
        const self = this;
        const containerEl = Array.from(document.querySelectorAll(container));

        if (containerEl.length) {
            containerEl.forEach(
                (el) => {
                    const equalelements = el.querySelectorAll(equal);
                    let highest = 0;
                    equalelements.forEach(
                        (elem) => {
                            if (self.getHeight(elem) > highest) {
                                highest = self.getHeight(elem);
                            }
                            elem.style.height = `${highest}px`;
                        }
                    );
                }
            );
        }
    },

    openBlock: (subMenu, openClass) => {
        let animationSpeed = 100;

        // Get Auto Height
        let autoHeight = $(subMenu).css('height', 'auto').height();
        $(subMenu).height(0);

        // Set submenu's height and open it
        $(subMenu).stop().animate({
            'height': autoHeight
        }, animationSpeed, function () {
            $(subMenu).height('auto')
                .css('overflow', 'visible')
                .addClass(openClass);
            $(subMenu).parent('li').addClass(`${openClass}__parent`);
        });
    },
    closeBlock: (subMenu, openClass) => {
        let animationSpeed = 100;

        // Set submenu's height back to 0 and close it
        $(subMenu).stop().animate({
            'height': 0
        }, animationSpeed, function () {
            $(subMenu).css('overflow', 'hidden')
                .removeClass(openClass);
            $(subMenu).parent('li').removeClass(`${openClass}__parent`);
        });
    },
    getParentByClass: (element, parentClass) => {
        let parentElement = element;

        while (parentElement && parentElement.parentNode) {
            parentElement = parentElement.parentNode;

            if (parentElement.tagName && parentElement.classList.contains(parentClass)) {
                return parentElement;
            }
        }
        return null;
    },
    getSibling: (element) => {
        if (element.previousElementSibling) {
            return element.previousElementSibling;
        }
        if (element.nextElementSibling) {
            return element.nextElementSibling;
        }
    }
};

export default Helpers;
