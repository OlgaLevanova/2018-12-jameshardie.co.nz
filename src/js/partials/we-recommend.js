import Helpers from '../modules/helpers';

const WeRecommend = {
    weRecommendTrigger: null,
    weRecommendWrapper: null,
    weRecommendBack: null,
    weRecommendTitle: null,
    weRecommendResultWrapper: null,
    weRecommendWrapperData: '[data-recommend]',
    weRecommendItemData: '[data-recommend-item]',
    weRecommendWrapperClass: 'we-recommend__js-wrapper',
    weRecommendTargetClass: 'we-recommend__js-target',
    weRecommendTriggerClass: 'we-recommend__js-trigger',
    weRecommendBackClass: 'we-recommend__js-prev',
    weRecommendTitleClass: 'sib-we-recommend__title',
    weRecommendResultClass: 'sib-we-recommend__result',
    activeClass: 'active-js',
    disableClass: 'disable-js',
    enableClass: 'enable-js',
    weRecommendResultData: 'data-result',
    headerText: [
        ['', 'CHOOSE YOUR STYLE'],
        ['STYLES', 'CHOOSE INSTALLATION TYPE'],
        ['INSTALLATION', 'CHOOSE SURFACE TYPE'],
        ['START AGAIN', 'WE RECOMMEND']
    ],
    result: [0, 0, 0],
    step:0,
    steps: 3,
    timeDelay: 1400,
    timeDelayBack: 400,
    setVars: () => {
        WeRecommend.weRecommendTrigger = document.getElementsByClassName(WeRecommend.weRecommendTriggerClass);

        WeRecommend.weRecommendWrapper = document.querySelectorAll(WeRecommend.weRecommendWrapperData);

        WeRecommend.weRecommendBack = document.getElementsByClassName(WeRecommend.weRecommendBackClass)[0];

        WeRecommend.weRecommendTitle = document.getElementsByClassName(WeRecommend.weRecommendTitleClass)[0];

        WeRecommend.weRecommendResultWrapper = document.getElementsByClassName(WeRecommend.weRecommendResultClass)[0];
    },
    init: () => {

        // Set all variables
        WeRecommend.setVars();

        if (WeRecommend.weRecommendTrigger.length > 0) {

            WeRecommend.bindEvents();
        }
    },
    bindEvents: () => {

        for (let i = 0; i < WeRecommend.weRecommendTrigger.length; i++) {
            WeRecommend.weRecommendTrigger[i].addEventListener('click', function(e) {

                const target = Helpers.getParentByClass(WeRecommend.weRecommendTrigger[i], WeRecommend.weRecommendTargetClass);
                const targetSibling = Helpers.getSibling(target);
                const anotherTrigger = targetSibling.getElementsByClassName(WeRecommend.weRecommendTriggerClass)[0];

                // Stop hover on each option
                targetSibling.classList.add(WeRecommend.disableClass);
                target.classList.add(WeRecommend.activeClass);

                // Hide buttons
                WeRecommend.weRecommendTrigger[i].classList.add(WeRecommend.activeClass);
                anotherTrigger.classList.add(WeRecommend.activeClass);

                WeRecommend.countResult(WeRecommend.step, target.dataset.recommendItem);

                if (WeRecommend.step < (WeRecommend.steps - 1)) {
                    WeRecommend.goNextStep();
                } else {
                    WeRecommend.showResult();
                }

                setTimeout(function () {
                    WeRecommend.changeHeader();
                }, WeRecommend.timeDelay);

                setTimeout(function () {
                    WeRecommend.restoreElementsInStep(
                        WeRecommend.weRecommendTrigger[i],
                        anotherTrigger,
                        target,
                        targetSibling
                    );
                }, WeRecommend.timeDelay);
            });
        }

        WeRecommend.weRecommendBack.addEventListener('click', function(e) {
            if (WeRecommend.step > 0) {

                if (WeRecommend.step < WeRecommend.steps) {
                    WeRecommend.countResult(WeRecommend.step, 0);

                    WeRecommend.goPrevStep();
                } else {
                    WeRecommend.goToStart();
                }

                setTimeout(function () {
                    WeRecommend.changeHeader();
                }, WeRecommend.timeDelayBack);

            }
        });
    },
    goNextStep: () => {

        WeRecommend.weRecommendWrapper[WeRecommend.step + 1].classList.remove(WeRecommend.disableClass);

        WeRecommend.weRecommendWrapper[WeRecommend.step].classList.add(WeRecommend.disableClass);

        WeRecommend.step += 1;
    },
    goPrevStep: () => {

        // Add this class to change animation when user goes back
        WeRecommend.weRecommendWrapper[WeRecommend.step - 1].classList.add(WeRecommend.enableClass);

        WeRecommend.weRecommendWrapper[WeRecommend.step].classList.add(WeRecommend.disableClass);

        WeRecommend.step -= 1;

        setTimeout(function () {
            WeRecommend.weRecommendWrapper[WeRecommend.step].classList.remove(WeRecommend.disableClass);
            WeRecommend.weRecommendWrapper[WeRecommend.step].classList.remove(WeRecommend.enableClass);
        }, WeRecommend.timeDelay);
    },
    goToStart: () => {
        WeRecommend.step = 0;

        WeRecommend.weRecommendWrapper[0].classList.add(WeRecommend.enableClass);
        // WeRecommend.weRecommendWrapper[0].classList.remove(WeRecommend.disableClass);

        const resultBlock = WeRecommend.weRecommendResultWrapper.getElementsByClassName(WeRecommend.activeClass)[0];

        WeRecommend.weRecommendResultWrapper.classList.remove(WeRecommend.activeClass);

        setTimeout(function () {
            resultBlock.classList.remove(WeRecommend.activeClass);

            WeRecommend.weRecommendWrapper[0].classList.remove(WeRecommend.disableClass);
            WeRecommend.weRecommendWrapper[0].classList.remove(WeRecommend.enableClass);
        }, WeRecommend.timeDelay);
    },
    restoreElementsInStep: (
        trigger,
        anotherTrigger,
        target,
        targetSibling
    ) => {
        // Set hover on each option
        targetSibling.classList.remove(WeRecommend.disableClass);
        target.classList.remove(WeRecommend.activeClass);

        // Show buttons
        trigger.classList.remove(WeRecommend.activeClass);
        anotherTrigger.classList.remove(WeRecommend.activeClass);
    },
    changeHeader: () => {
        WeRecommend.weRecommendBack.innerText = WeRecommend.headerText[WeRecommend.step][0];
        WeRecommend.weRecommendTitle.innerText = WeRecommend.headerText[WeRecommend.step][1];

        if (WeRecommend.step === 0) {
            WeRecommend.weRecommendBack.classList.remove(WeRecommend.activeClass);
        } else {
            WeRecommend.weRecommendBack.classList.add(WeRecommend.activeClass);
        }
    },
    countResult: (step, result) => {
        WeRecommend.result[step] = Number(result);
    },
    showResult: () => {
        const resultBlock = WeRecommend.weRecommendResultWrapper.querySelectorAll(`[${WeRecommend.weRecommendResultData}='${WeRecommend.result.join('')}']`)[0];

        resultBlock.classList.add(WeRecommend.activeClass);
        WeRecommend.weRecommendResultWrapper.classList.add(WeRecommend.activeClass);

        WeRecommend.weRecommendWrapper[WeRecommend.step].classList.add(WeRecommend.disableClass);

        WeRecommend.step += 1;
    }
};

export default WeRecommend;
