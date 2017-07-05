var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var IssueGrid = require('./IssueGrid');


function UserPreview (props) {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={'Image for '+props.username}
         />
         <h2 className='username'>@{props.username}</h2>
      </div>
      <button
        className='reset'
        onClick={props.onReset.bind(null, props.id)}>
        Reset
      </button>
    </div>
  )
}

UserPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

class RepoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reponame : ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    var value = event.target.value;
    this.setState(function(){
      return {
        reponame : value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.reponame
    );
  }
  render() {
    return(
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>{this.props.label}</label>
        <input
          id = 'reponame'
          placeholder = 'Enter repo full name'
          type = 'text'
          value = {this.state.reponame}
          autoComplete = 'off'
          onChange = {this.handleChange}
         />
         <p>For an advanced search using label add +label:'YOUR LABEL NAME' for example chromium/badssl.com+label:subdomain"</p>
         <button className='submitbutton' type='submit' disabled={!this.state.reponame}>
           Search
         </button>
      </form>
    )
  }
}

RepoInput.PropTypes = {
  id : PropTypes.string.isRequired,
  label : PropTypes.string.isRequired,
  onSubmit : PropTypes.func.isRequired
}
RepoInput.defaultProps = {
  label : 'reponame'
}

class Repo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repoUserName: '',
      repoName : '',
      repoUserImg : null,
      issues: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit(id, reponame){
      api.fetchRepoIssues(reponame)
        .then(function(issues){
          this.setState(function(){
            var newState = {};
            newState[id + 'Name'] = reponame;
            var username = reponame.split('/')[0];
            newState[id + 'UserName'] = username;
            newState[id + 'UserImg'] = 'https://github.com/' + username + '.png?size=200';
            newState['issues'] = issues;
            return newState;
          });
        }.bind(this));
  }
  handleReset(id) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'UserName'] = '';
      newState[id + 'Img'] = null;
      newState[id + 'issues'] = null;
      return newState;
    });
  }
  render() {
    var repoName = this.state.repoName;
    var repoUserName = this.state.repoUserName;
    var repoUserImg = this.state.repoUserImg;
    var issues = this.state.issues;

    return (
      <div>
        <div className='column'>
          {!repoUserName &&
          <RepoInput
            id='repo'
            label='Search into more than 62M repositories'
            onSubmit={this.handleSubmit}
           />}

           {repoUserImg !== null &&
            <UserPreview
              avatar={repoUserImg}
              username={repoUserName}
              onReset={this.handleReset}
              id='repo'
            />}
            {this.state.issues !== null &&
              <h2>List of Issues of {repoName}</h2>
            }

          {this.state.issues !== null &&
            <IssueGrid
               issues={this.state.issues}
               onReset={this.handleReset}
             />}
        </div>
      </div>
    )
  }
}

module.exports = Repo;
