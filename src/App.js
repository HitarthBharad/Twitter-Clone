import React,{Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Component/Register'
import Login from './Component/Login'
import Home from './Component/Home'
import Addtwit from './Component/Addtwit'
import Setprofile from './Component/Setprofile'
import Visitor from './Component/Visitor'
import MyProfile from './Component/MyProfile'
import Edit from './Component/Edit'
import Edittweet from './Component/Edittweet'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path ='/signup' component={Register}/>
          <Route path='/home' component={Home}/>
          <Route path='/post' component={Addtwit}/>
          <Route path='/setup' component={Setprofile}/>
          <Route path='/visit' component={Visitor} />
          <Route path='/my' component={MyProfile}/>
          <Route path='/edit' component={Edit}/>
          <Route path='/edwit' component={Edittweet} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
