import React from 'react';
import { IonApp } from '@ionic/react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './theme/variables.css';
import Register from './pages/Register';
import Token from './pages/Token';
import Enter from './pages/Enter';
import Login from './pages/Login';
import HomePov1 from './pages/HomePov1';
import CompanyPov1 from './pages/CompanyPov1';
import FormCompany from './pages/FormCompany';

const App: React.FC = () => {
  return (
    <IonApp>
      <Router>
        <Switch>
          <Route path="/enter" component={Enter} />   
          <Route path="/login" component={Login} /> 
          <Route path="/register" component={Register} /> 
          <Route path="/token" component={Token} /> 
          <Route path="/home_entrepreneurs" component={HomePov1} /> 
          <Route path="/companies_entrepreneurs" component={CompanyPov1} /> 
          <Route path="/companies_form" component={FormCompany} /> 
          <Route exact path="/">
            <Redirect to="/enter" />
          </Route>
        </Switch>
      </Router>
    </IonApp>
  );
};

export default App;