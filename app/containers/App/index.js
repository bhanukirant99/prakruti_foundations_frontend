/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import HomePage from 'containers/HomePage';
import HomepageMentor from 'containers/HomepageMentor';
import LoginPage from 'containers/LoginPage';
import SignupPage from 'containers/SignupPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CoursePage from 'containers/CoursePage';
import MasterclassPage from 'containers/MasterclassPage';
import ProfilePage from 'containers/ProfilePage';
import DiscussionForum from 'containers/DiscussionForum';
import DiscussionSolutionsPage from 'containers/DiscussionSolutionsPage';
import PrivateRoute from './PrivateRouter';
import NoMatch from '../NoMatch';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute path="/homepage" component={HomePage} />
        <PrivateRoute path="/homepagementor" component={HomepageMentor} />
        <PrivateRoute path="/coursepage" component={CoursePage} />
        <PrivateRoute path="/masterclasspage" component={MasterclassPage} />
        <PrivateRoute path="/profilepage" component={ProfilePage} />
        <PrivateRoute path="/discussionforum" component={DiscussionForum} />
        <PrivateRoute
          path="/discussionsolutions"
          component={DiscussionSolutionsPage}
        />
        <Route component={NoMatch} />
      </Switch>
    </BrowserRouter>
  );
}
