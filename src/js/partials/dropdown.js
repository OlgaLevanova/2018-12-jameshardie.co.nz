import $ from 'jquery';
const Dropdown = {
    init: () => {
        const dropdown = $('.dropdown__label');
        if (dropdown) {
            Dropdown.dropdown(dropdown);
        }
    },
    dropdown: (dropdown) => {
        dropdown.on('click', function() {
            if ($(this).hasClass('open')) {
                $(this).removeClass('open');
                $(this).next().removeClass('open');
            } else {
                $(this).addClass('open');
                $(this).next().addClass('open');
            }
        });
    },
};

export default Dropdown;
