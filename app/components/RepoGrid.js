var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

function RepoGrid (props) {
  var match = props.match;
  return (
    <ul className='repo-list'>
      {props.repos.map(function(repo, index){
        return (
          <li key={repo.name} className='repo-item'>
            <div className='repo'>
              <ul className='space-list-items'>
                <li><a href={repo.html_url}><h2 className='repotitle'>{repo.name}</h2></a></li>
                <li>Description: {repo.description}</li>
                <li>{repo.stargazers_count} stars</li>
                <li>language: {repo.language}</li>
                {repo.has_issues !== false &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: '?repoName=' + repo.full_name
            }}>
              Issues
          </Link>}
              </ul>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

module.exports = RepoGrid;
