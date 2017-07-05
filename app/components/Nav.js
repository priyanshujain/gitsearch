var React = require('react');
//var Link = require('react-router-dom').Link;
var NavLink = require('react-router-dom').NavLink;

function Nav () {
  return (
    <div>
      <h1 className='title'>GitHub Search</h1>
      <ul className='nav'>
        <li>
          <NavLink exact activeClassName='active' to='/'>
          Home
        </NavLink>
        </li>
        <li>
          <NavLink activeClassName='active' to='/user'>
          User
        </NavLink>
        </li>
        <li>
          <NavLink activeClassName='active' to='/repo'>
          Repository
        </NavLink>
        </li>
      </ul>
    </div>
  )
}

module.exports = Nav;
