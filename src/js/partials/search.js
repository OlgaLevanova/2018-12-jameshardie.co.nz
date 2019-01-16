const AlgoliaSearch = {
    bindEvents: () => {
        if (window.algoliasearch) {
            AlgoliaSearch.init();
        }
    },

    init: () => {
        // show search results when search form submits or keyword changes
        const searchForm = document.getElementsByClassName('sib-search__form')[0];
        const client = algoliasearch('JIEP16R28S', '7198be3082103b4617045afaac47e83e');
        const searchKeyword = searchForm.getElementsByClassName('form-control')[0];

        let searchResultsPage = document.getElementsByClassName('sib-search__results')[0];
        let indexName = 'skeleton_dev';
        let hotSearch = false;
        let autoSearch = false;
        let perPage = 5;

        if (searchForm) {
            // Configurable Options for search module.
            // Refer to right search index
            if (searchForm.hasAttribute('data-index')) {
                indexName = searchForm.getAttribute('data-index')
            }
            // determine how the search results should work
            if (searchForm.hasAttribute('data-hotsearch')) {
                hotSearch = searchForm.getAttribute('data-hotsearch') == 'true';
            }
            // determine
            if (searchForm.hasAttribute('data-autosearch')) {
                autoSearch = searchForm.getAttribute('data-autosearch') == 'true';
            }
            // total items per page
            if (searchForm.hasAttribute('data-perpage')) {
                perPage = parseInt(searchForm.getAttribute('data-perpage'));
            }
        }
        const index = client.initIndex(indexName);

        if (hotSearch) {
            searchKeyword.addEventListener('keyup', (e) => {
                AlgoliaSearch.buildResults(index, searchKeyword.value, perPage);
            });
        } else {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                AlgoliaSearch.buildResults(index, searchKeyword.value, perPage);
            });
        }

        if (autoSearch) {
            AlgoliaSearch.buildResults(index, searchKeyword.value, perPage);
        }

        // Bind event on load-more button
        const loadMoreButton = document.getElementsByClassName('sib-search__more')[0];
        if (loadMoreButton.length) {
            loadMoreButton.addEventListener('click', (e) => {
                e.preventDefault();
                let results = document.getElementsByClassName('search-result');
                let showCounter = 0;
                let displayed = 0;
                for (let i = 0; i < results.length; i++) {
                    if (showCounter < perPage && results[i].classList.contains('inactive')) {
                        results[i].classList.remove('hidden');
                        showCounter++;
                    }
                    if (!results[i].classList.contains('hidden')) {
                        displayed++;
                    }
                }
                AlgoliaSearch.buildResultStats(displayed, results.length);
            });
        }
    },

    buildResults: (index, keyword, perPage) => {
        const searchResultsTitle = document.getElementsByClassName('sib-search__title')[0];
        const searchResults = document.getElementsByClassName('sib-search__results')[0];
        let totalResults = 0;
        index.search(keyword, function(err, content) {
            let result = '';
            searchResultsTitle.innerHTML = `There are ${content.hits.length} result${content.hits.length > 1 ? 's' : ''} for '${content.query}'.`;
            for (let i = 0; i < content.hits.length; i++) {
                totalResults++;
                let row = content.hits[i];
                // console.log(content.hits[i]);
                let itemImage = (row.image && row.image !== '') ? `<div class="sib-search__item-image" style="background: url(${row.image}) no-repeat center center"></div>` : '';
                let resultClass = i < perPage ? '' : 'hidden';
                result = `<a href="${row.url}" class="sib-search__item ${resultClass}">
                            ${itemImage}
                            <div class="sib-search__item-content">
                                <div class="sib-search__item-title">${row.title}</div>
                                <div class="sib-search__item-description">${row._highlightResult.content ? row._highlightResult.content.value : ''}</div>
                            </div>
                        </a>`;
            }
            searchResults.innerHTML = result;
            // build status & load-more button
            AlgoliaSearch.buildResultStats(perPage, content.hits.length);
        });
        if (totalResults <= 0) {
            // when search result is empty
            searchResultsTitle.innerHTML = `There are no results for '${keyword}'.`;
        }
    },

    buildResultStats: (perPage, totalRows) => {
        const searchStats = document.getElementsByClassName('sib-search__stats')[0];
        let displayed = perPage > totalRows ? totalRows : perPage;
        let statMessage = displayed === 0 ? 'No results found' : `Showing ${displayed} of ${totalRows} results`;
        document.getElementsByClassName('sib-search__stats-total')[0].innerHTML = statMessage;
        if (perPage < totalRows) {
            searchStats.getElementsByClassName('sib-search__more')[0].classList.remove('hidden');
        } else {
            searchStats.getElementsByClassName('sib-search__more')[0].classList.add('hidden');
        }
    },
};

module.exports = AlgoliaSearch;
