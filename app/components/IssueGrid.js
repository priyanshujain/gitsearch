var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

function IssueGrid (props) {
  var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
  return (
    <div>
      <ul className='issue-list'>
        {props.issues.map(function(issue, index){
          var date = issue.created_at.slice(0, -1).split('T')[0].split('-');
          var month = monthNames[date[1] -1];

          return (
            <li key={issue.id} className='issue-item'>
              <div className='issue'>
                <ul className='space-list-items'>
                  <li><a href={issue.url}><h2 className='issuetitle'>{issue.title}</h2></a></li>
                  <li>#{issue.number} created at {date[2]}  {month}  {date[0]} by <a href={issue.user.html_url}>@{issue.user.login}</a></li>
                </ul>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
IssueGrid.propTypes = {
  issues: PropTypes.array.isRequired
}


module.exports = IssueGrid;
