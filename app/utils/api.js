var axios = require('axios');

module.exports = {
  fetchUserRepos: function(username) {
    var encodedURI = window.encodeURI('https://api.github.com/users/' + username + '/repos');

    return axios.get(encodedURI)
      .then( function(response) {
          return response.data;
      });
  },
  fetchRepoIssues: function(reponame) {
    var encodedURI = window.encodeURI('https://api.github.com/search/issues?q=repo:'+ reponame + '+state:open&sort=created&order=asc');

    return axios.get(encodedURI)
      .then( function(response) {
          return response.data.items;
      });
  }
};
