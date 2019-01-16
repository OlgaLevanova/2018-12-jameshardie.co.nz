import Helpers from '../modules/helpers';

const FlippingCard = {
    trigger:'flipping-card__wrap',
    activeClass:'flip',
    triggers:null,
    init: () => {
        FlippingCard.triggers = document.getElementsByClassName(FlippingCard.trigger);

        FlippingCard.showBack();
        FlippingCard.showFace();
    },
    showBack: () => {
        for (let i = 0; i < FlippingCard.triggers.length; i++) {
            FlippingCard.triggers[i].addEventListener('click', (e) => {
                e.stopPropagation();

                let activeCard = Helpers.getParentByClass(e.target, FlippingCard.trigger);

                if (!activeCard.classList.contains(FlippingCard.activeClass)) {
                    activeCard.classList.add(FlippingCard.activeClass);
                }
            });
        }
    },
    showFace: () => {
        for (let i = 0; i < FlippingCard.triggers.length; i++) {
            FlippingCard.triggers[i].addEventListener('mouseleave', (e) => {
                e.stopPropagation();

                let activeCard = e.target;

                if (activeCard.classList.contains(FlippingCard.activeClass)) {
                    activeCard.classList.remove(FlippingCard.activeClass);
                }
            });
        }
    }
};

export default FlippingCard;
