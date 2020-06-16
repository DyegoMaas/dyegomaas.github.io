function initializeSearch(searchIndexFilename, searchMetadataFilename) {
  const getJSON = function(url) {
    return new Promise(function (resolve, reject) {
      console.log('downloading', url);
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        const status = xhr.status;
        if (status === 200) {
          resolve(xhr.response);
        } else {
          reject({'status': status, 'value': xhr.response});
        }
      };
      xhr.send();
    })
  };

  const promiseDownloadSearchIndexFile = getJSON(searchIndexFilename);
  const promiseDownloadSearchDataFile = getJSON(searchMetadataFilename);
  Promise
    .all([promiseDownloadSearchIndexFile, promiseDownloadSearchDataFile])
    .then((values) => {
      const indexJson = values[0];
      const metadata = values[1];

      const index = lunr.Index.load(indexJson);
      const searchFor = function (terms) {
        return index.search(terms);
      };
      console.log('search index succesfully loaded');

      const noResultsFoundTemplate = `
      <li>
        <div class="search-result-item">
          <p>Nenhum resultado encontrado.</p>
        </div>
      </li>
      `;
      Mustache.parse(noResultsFoundTemplate);

      const searchResultTemplate = `
        {{#searchResults}}
        <li>
          <div class="search-result-item">
            <a href="{{ completeUri }}">
              <p class="post-card-header-title">{{ title }}</p>
              <div class="post-card-excerpt">
                <p>{{ metadescription }}</p>
              </div>
            </a>
          </div>
        </li>
        {{/searchResults}}
      `;
      Mustache.parse(searchResultTemplate);
      console.log('search result template succesfully parsed');

      const updateSearchResults = (content) => {
        const searchList = document.getElementById('search-results');
        searchList.innerHTML = content;
      };

      const searchInput = document.getElementById('search-input')
      searchInput.addEventListener('search', function () {
        terms = this.value;
        console.log('terms', terms);
        if (terms && terms.length > 0) {
          const searchResults = searchFor(terms);
          console.log(`found ${searchResults.length} results`);

          if (searchResults.length > 0) {
            const searchResultsViewModels = searchResults.map((searchResult) => {
              return metadata.filter((doc => doc.uri === searchResult.ref))[0];
            });
            updateSearchResults(Mustache.render(searchResultTemplate, { 'searchResults': searchResultsViewModels }));
          }
          else {
            updateSearchResults(Mustache.render(noResultsFoundTemplate, {}));
          }
        }
        else {
          updateSearchResults('');
        }
      });

      const searchResultsModal = document.getElementById('search-results-modal');
      const searchButton = document.getElementById('search-button');
      searchButton.addEventListener('click', function () {
        updateSearchResults('');
        searchInput.value = '';
        searchResultsModal.style.display = 'block';
        searchInput.focus();
      });

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("modal-close")[0];
      console.log('span close', span);
      // When the user clicks on <span> (x), close the modal
      span.addEventListener('click', function () {
        console.log('close button clicked');
        searchResultsModal.style.display = "none";
      });
      // When the user clicks anywhere outside of the modal, close it
      window.addEventListener('click', function (event) {
        console.log('window clicked');
        if (event.target == searchResultsModal) {
          searchResultsModal.style.display = 'none';
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
}