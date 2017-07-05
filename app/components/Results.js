var React = require('react');
var PropTypes = require('prop-types');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var IssueGrid = require('./IssueGrid');

class LabelInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelname : ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    var value = event.target.value;
    this.setState(function(){
      return {
        labelname : value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.labelname
    );
  }
  render() {
    return(
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>{this.props.label}</label>
        <input
          id = 'reponame'
          placeholder = 'Enter labels'
          type = 'text'
          value = {this.state.reponame}
          autoComplete = 'off'
          onChange = {this.handleChange}
         />
         <button className='submitbutton' type='submit' disabled={!this.state.labelname}>
           Filter
         </button>
      </form>
    )
  }
}

LabelInput.PropTypes = {
  id : PropTypes.string.isRequired,
  label : PropTypes.string.isRequired,
  onSubmit : PropTypes.func.isRequired
}
LabelInput.defaultProps = {
  label : 'labelname'
}

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelName: '',
      labelRepoName: '',
      issues: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit(id, labelname){
      var reponame = this.state.labelRepoName+'+label:'+labelname;
      api.fetchRepoIssues(reponame)
        .then(function(issues){
          this.setState(function(){
            var newState = {};
            newState[id + 'Name'] = labelname;
            newState[id + 'labelRepoName'] = reponame;
            newState['issues'] = issues;
            return newState;
          });
        }.bind(this));
  }
  handleReset(id) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = '';
      newState['issues'] = null;
      return newState;
    });
  }
  componentDidMount() {
    var repo = queryString.parse(this.props.location.search);
    var reponame = repo.repoName;

    api.fetchRepoIssues(reponame)
      .then(function(issues){
        this.setState(function(){
          var newState = {};
          newState['labelRepoName'] = reponame;
          newState['issues'] = issues;
          newState['labelName'] = '';
          return newState;
        });
      }.bind(this));
  }
  render() {
    var issues = this.state.issues;

    return (
      <div>
        <div className='column'>
          { this.state.issues !== null &&
          <LabelInput
            id='label'
            label='Search into issues by label'
            onSubmit={this.handleSubmit}
           />}
            {issues !== null &&
              <h2>List of Issues</h2>
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

module.exports = Results;
