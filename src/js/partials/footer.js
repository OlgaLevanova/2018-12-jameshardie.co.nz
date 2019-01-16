import Accordion from '../modules/accordion';
import Helpers from '../modules/helpers';

const Footer = {
    footer: null,
    triggers: null,
    containers: null,
    targets: null,
    footerClass: 'sib-footer',
    containerSelector: '[data-accordion="container"]',
    triggerSelector: '[data-accordion="trigger"]',
    targetSelector: '[data-accordion="target"]',
    setVars: () => {
        Footer.footer = document.getElementsByClassName(Footer.footerClass);
        Footer.containers = Footer.footer[0].querySelectorAll(Footer.containerSelector);
    },
    init: () => {
        Footer.setVars();

        if (Footer.footer.length > 0) {
            Footer.binsEvents();
        }
    },
    binsEvents: () => {
        Footer.menu();
    },
    menu: () => {
        Accordion.initAccordion(Footer.containers, false);
    }
};

export default Footer;
