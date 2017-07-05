var React = require('react');
var Link = require('react-router-dom').Link;

class Home extends React.Component {
  render() {
    return (
      <div className='home-container'>
        <div className='homeuser'>
          <h1 className='home'>Find your friends and their repos</h1>
          <Link className='submitbutton' to='/user'>Search User</Link>
        </div>
        <div>
          <h1 className='home'>Find open issues of repositories</h1>
          <Link className='submitbutton' to='/repo'>Search Repo</Link>
        </div>
      </div>
    )
  }
}

module.exports = Home;
