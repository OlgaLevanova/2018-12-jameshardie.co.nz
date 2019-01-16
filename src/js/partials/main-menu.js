import Helpers from '../modules/helpers';

const MainMenu = {
    mainMenu: null,
    MainMenuLevel1: null,
    switchLocale: null,
    navToggle:null,
    navMobileMenuToggle: null,
    body: null,
    htmlEl: null,
    vars: {
        bodyHiddenClass: 'overflowHidden',
        activeClass: 'active-js',
        openUlClass: 'open-js',
        openLiClass: 'open-li-js',
        activeMenuClass: 'menu-opened-js',
        navBarScrolledClass: 'scrolled',
        navMenuClass: 'sib-nav__level-1',
        navMenuLevel1LiClass: 'sib-nav__level-1__li',
        navToggleClass: 'sib-nav__toggle',
        navMobileMenuToggleClass: 'sib-nav__mobile-menu__toggle',
        breakpoint: 992
    },
    sibNavBar: null,
    bindEvents: () => {

        // Set all variables
        MainMenu.setVars();

        // Init top menu
        if (MainMenu.MainMenuLevel1) {
            MainMenu.initMainMenuDesktop();
            MainMenu.initMainMenuMobile();
            MainMenu.hamburgerMenuSwitch();
        }
    },
    setVars: () => {
        MainMenu.htmlEl = document.getElementsByTagName('html')[0];
        MainMenu.body = document.getElementsByTagName('body')[0];
        MainMenu.mainMenu = document.getElementsByClassName(MainMenu.vars.navMenuClass)[0];
        MainMenu.MainMenuLevel1 = MainMenu.mainMenu.getElementsByClassName(MainMenu.vars.navMenuLevel1LiClass);
        MainMenu.navToggle = MainMenu.mainMenu.getElementsByClassName(MainMenu.vars.navToggleClass);
        MainMenu.navMobileMenuToggle = document.getElementById(MainMenu.vars.navMobileMenuToggleClass);
    },
    initMainMenuDesktop: () => {
        // Init drop down menu on desktop
        for (let i = 0; i < MainMenu.MainMenuLevel1.length; i++) {

            MainMenu.MainMenuLevel1[i].addEventListener('mouseenter', (e) => {

                if (Helpers.getWindowSize().width > MainMenu.vars.breakpoint) {
                    let subMenu = MainMenu.MainMenuLevel1[i].getElementsByTagName('ul')[0];

                    if (subMenu) {
                        // MainMenu.openBlock(subMenu);
                        Helpers.openBlock(subMenu, MainMenu.vars.openUlClass);
                    }
                }
            });
            MainMenu.MainMenuLevel1[i].addEventListener('mouseleave', (e) => {

                if (Helpers.getWindowSize().width > MainMenu.vars.breakpoint) {
                    let subMenu = MainMenu.MainMenuLevel1[i].getElementsByTagName('ul')[0];

                    if (subMenu) {
                        // MainMenu.closeBlock(subMenu);
                        Helpers.closeBlock(subMenu, MainMenu.vars.openUlClass);
                    }
                }
            });
        }
    },
    initMainMenuMobile: () => {
        for (let i = 0; i < MainMenu.navToggle.length; i++) {
            MainMenu.navToggle[i].addEventListener('click', (e) => {
                e.preventDefault();

                let menu = MainMenu.navToggle[i].parentNode.nextSibling;

                if (menu.classList.contains(MainMenu.vars.openUlClass)) {
                    Helpers.closeBlock(menu, MainMenu.vars.openUlClass);
                } else {
                    Helpers.openBlock(menu, MainMenu.vars.openUlClass);
                }
            });
        }
    },
    initSwitchHeader: () => {
        let screenOffset = 20;

        window.addEventListener('scroll', function(e) {
            let scrollY = window.pageYOffset;

            if (!MainMenu.sibNavBar.classList.contains(MainMenu.vars.navBarScrolledClass) && scrollY >= screenOffset) {
                MainMenu.sibNavBar.classList.add(MainMenu.vars.navBarScrolledClass);
            }
            if (MainMenu.sibNavBar.classList.contains(MainMenu.vars.navBarScrolledClass) && scrollY < screenOffset) {
                MainMenu.sibNavBar.classList.remove(MainMenu.vars.navBarScrolledClass);
            }
        });
    },
    hamburgerMenuSwitch: () => {

        MainMenu.navMobileMenuToggle.addEventListener('click', function(e) {

            if (MainMenu.navMobileMenuToggle.classList.contains(MainMenu.vars.activeClass)) {
                Helpers.closeBlock(MainMenu.mainMenu, MainMenu.vars.openUlClass);

                MainMenu.closeAllMenu();
            } else {
                Helpers.openBlock(MainMenu.mainMenu, MainMenu.vars.openUlClass);
            }

            MainMenu.navMobileMenuToggle.classList.toggle(MainMenu.vars.activeClass);

            MainMenu.body.classList.toggle(MainMenu.vars.activeMenuClass);
            MainMenu.body.classList.toggle(MainMenu.vars.bodyHiddenClass);
            MainMenu.htmlEl.classList.toggle(MainMenu.vars.bodyHiddenClass);
        });
    },
    closeAllMenu: () => {
        let openedMenu = MainMenu.mainMenu.getElementsByClassName(MainMenu.vars.openUlClass);

        for (let i = 0; i < openedMenu.length; i++) {
            Helpers.closeBlock(openedMenu[i], MainMenu.vars.openUlClass);
        }
    }
};

export default MainMenu;
