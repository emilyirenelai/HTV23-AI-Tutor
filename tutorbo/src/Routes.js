import React from 'react'
import ARComponent from './components/ardino';
import GetNotes from './components/prep'
import { Route } from 'wouter';

const Routes = () => {

  return (
    <>
        <Route exact path="/" component={GetNotes} />          
        <Route path="/ar" component={ARComponent} />
    </>
  )
}

export default Routes
