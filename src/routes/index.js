import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from 'scenes/Home'

export default () => (
  <Router>
    <Switch>
      <Route path='/' exact component={Home} />
    </Switch>
  </Router>
)
