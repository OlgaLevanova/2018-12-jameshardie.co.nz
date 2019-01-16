const Filter = {
    bindEvents: () => {
        const filter = document.getElementsByClassName('filter--button');
        if (filter[0]) {

            Filter.filter();
        }
    },
    filter: () => {
        const filter = document.getElementsByClassName('filter--button');

        for (var i = 0; i < filter.length; i++) {
            filter[i].addEventListener("click", function () {

                const filterActive = this.classList.contains('active')
                if(filterActive ){
                    for (var k = 0; k < filter.length; k++) {
                        filter[k].classList.remove('active')
                    }
                }else{
                    for (var k = 0; k < filter.length; k++) {
                        filter[k].classList.remove('active')
                    }
                    this.classList.add('active');
                }

                const filterType = this.getAttribute('data-filter-type')
                const items = document.getElementsByClassName('filter--item');


                for (var i = 0; i < items.length; i++) {
                    if (filterActive) {
                        items[i].classList.remove('filtered--inactive');

                    } else {
                        if (items[i].getAttribute('data-filter-type') === filterType) {


                            items[i].classList.remove('filtered--inactive');

                        } else {

                            items[i].classList.add('filtered--inactive');

                        }
                    }


                }


            })
        }
    },
};

module.exports = Filter;
