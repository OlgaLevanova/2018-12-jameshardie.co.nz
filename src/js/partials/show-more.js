import Helpers from '../modules/helpers';

const ShowMore = {
    LoadMoreButtons: null,
    allItems:[],
    showInitNumber:[],
    buttonClass:'show-more',
    itemHiddenClass:'show-more__item--hidden',
    showNumberItemsData:'data-show-number-items',
    allItemsData: 'data-show-more-item',
    setVars: () => {
        ShowMore.LoadMoreButtons = document.getElementsByClassName(ShowMore.buttonClass);

        for (let i = 0; i < ShowMore.LoadMoreButtons.length; i++) {
            ShowMore.showInitNumber[i] = Number(ShowMore.LoadMoreButtons[i].getAttribute(ShowMore.showNumberItemsData));

            let parentElement = Helpers.getParentByClass(ShowMore.LoadMoreButtons[i], 'row');
            let siblingElement = Helpers.getSibling(parentElement);

            ShowMore.allItems[i] = siblingElement.querySelectorAll(`[${ShowMore.allItemsData}]`);
        }
    },
    init: () => {

        // Set all variables
        ShowMore.setVars();

        if (ShowMore.LoadMoreButtons.length > 0) {
            ShowMore.bindEvents();
        }
    },
    bindEvents: () => {

        ShowMore.showInit();
        ShowMore.buttonClick();
    },
    showInit: () => {
        for (let i = 0; i < ShowMore.showInitNumber.length; i++) {
            for (let j = 0; j < ShowMore.showInitNumber[i]; j++) {
                ShowMore.allItems[i][j].classList.remove(ShowMore.itemHiddenClass);
            }
        }
    },
    buttonClick: () => {
        for (let i = 0; i < ShowMore.LoadMoreButtons.length; i++) {
            ShowMore.LoadMoreButtons[i].addEventListener('click', function() {
                ShowMore.showAll(i);
            });
        }
    },
    showAll: (i) => {

        for (let j = ShowMore.showInitNumber[i]; j < ShowMore.allItems[i].length; j++) {
            ShowMore.allItems[i][j].classList.remove(ShowMore.itemHiddenClass);
        }

        ShowMore.hideButton(i);
    },
    hideButton: (i) => {
        ShowMore.LoadMoreButtons[i].removeEventListener('click', function() {
            ShowMore.showAll(i);
        });
        ShowMore.LoadMoreButtons[i].outerHTML = '';
    }
};

export default ShowMore;
