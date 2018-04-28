import React from 'react'
import {Button} from 'antd'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

export default () => (
  <Router>
    <Switch>
      <Route path='/' exact render={() => <Button>hello</Button>} />
    </Switch>
  </Router>
)
