import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

export default () => (
  <Router>
    <Switch>
      <Route path='/' exact render={() => <div className='hello'>hello you!</div>} />
    </Switch>
  </Router>
)
