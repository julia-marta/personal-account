import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import Main from '../main/main';
import Contacts from '../contacts/contacts';
import {AppRoute} from '../../const';

const {ROOT, CONTACTS} = AppRoute;

const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact component={Main} path={ROOT} />
        <PrivateRoute exact component={Contacts} path={CONTACTS} />
      </Switch>
    </Router>
  );
};

export default App;
