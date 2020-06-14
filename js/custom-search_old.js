function initializeSearch(indexFileName) {
  const getJSON = function(url, callback) {
    console.log('downloading', url);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      const status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
  };

  getJSON(indexFileName, function (err, data) {
    if (err) {
      console.error(err)
      return;
    }

    const idx = lunr.Index.load(data);
    window.SearchIndex = idx;
    window.SearchFor = function (terms) {
      return window.SearchIndex.search(terms);
    };

    console.log('search index succesfully loaded');

    const searchInput = document.getElementById('search-input')
    searchInput.addEventListener('search', function (data) {
      terms = this.value;
      if (terms) {
        const searchResults = window.SearchFor(terms);
        console.log('search results:', searchResults);
        const urls = searchResults.map(function (resultDescription) {
          return resultDescription.ref;
        });
        console.log('search results URLs:', urls);
      }
    });
  })
}