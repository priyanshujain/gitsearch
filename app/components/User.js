var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');


function RepoGrid (props) {
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

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username : ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    var value = event.target.value;
    this.setState(function(){
      return {
        username : value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }
  render() {
    return(
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>{this.props.label}</label>
        <input
          id = 'username'
          placeholder = 'Enter github username'
          type = 'text'
          value = {this.state.username}
          autoComplete = 'off'
          onChange = {this.handleChange}
         />
         <button className='submitbutton' type='submit' disabled={!this.state.username}>
           Search
         </button>
      </form>
    )
  }
}

UserInput.PropTypes = {
  id : PropTypes.string.isRequired,
  label : PropTypes.string.isRequired,
  onSubmit : PropTypes.func.isRequired
}
UserInput.defaultProps = {
  label : 'username'
}

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName : '',
      userImg : null,
      repos: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit(id, username){
      api.fetchUserRepos(username)
        .then(function(repos){
          this.setState(function(){
            var newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Img'] = 'https://github.com/' + username + '.png?size=200';
            newState['repos'] = repos;
            return newState;
          });
        }.bind(this));
  }
  handleReset(id) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      newState[id + 'Repos'] = null;
      return newState;
    });
  }
  render() {
    var userName = this.state.userName;
    var userImg = this.state.userImg;
    var repos = this.state.repos;

    return (
      <div>
        <div className='column'>
          {!userName &&
          <UserInput
            id='user'
            label='Search more than 22M Githubbers'
            onSubmit={this.handleSubmit}
           />}

           {userImg !== null &&
            <UserPreview
              avatar={userImg}
              username={userName}
              onReset={this.handleReset}
              id='user'
            />}
            {this.state.repos !== null &&
              <h2>List of Repos of {userName}</h2>
            }
          {this.state.repos !== null &&
            <RepoGrid
               repos={this.state.repos}
               onReset={this.handleReset}
             />}
        </div>
      </div>
    )
  }
}

module.exports = User;
