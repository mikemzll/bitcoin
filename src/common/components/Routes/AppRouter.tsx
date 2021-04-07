import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { DEFAULT_PAGE, BASE_NAME, HOME } from '../../../modules/core/constants/routes';

const AppRouter = () => {
  return (
    <Router basename={BASE_NAME}>
      <div className="page-wrapper">
        <Switch>
          <Route path={HOME.path}>
            <HOME.component />
          </Route>
          <Route path="/" render={() => <Redirect to={DEFAULT_PAGE} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default AppRouter;