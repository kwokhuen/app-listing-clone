import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Listing from 'scenes/Listing'

export default () => (
  <Router>
    <Switch>
      <Route path='/' exact component={Listing} />
    </Switch>
  </Router>
)
