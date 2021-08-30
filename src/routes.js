import React from "react";
import {Switch, Route} from 'react-router-dom'
import {HashRouter} from 'react-router-dom'
import Audiences from './components/Audiences'
import Details from './components/Details'

export default(
    <HashRouter>
        <Switch>
            <Route exact path='/' component={Audiences}/>
            <Route path='/audience/:id' component={Details}/>

        </Switch>
    </HashRouter>
)