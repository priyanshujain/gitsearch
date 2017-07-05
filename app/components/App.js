var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var Switch = ReactRouter.Switch;

var Nav = require('./Nav');
var User = require('./User');
var Repo = require('./Repo');
var Home = require('./Home');

class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/user' component={User} />
            <Route path='/repo' component={Repo} />
            <Route render={function () {
              return <p>Not Found</p>
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}

module.exports = App;
