import React from 'react'
import ARComponent from './components/arscan';
import GetNotes from './components/prep';
import Assess from './components/learn';
import Upload from './components/upload';
import { Route } from 'wouter';

const Routes = () => {

  return (
    <>
        <Route exact path="/" component={GetNotes} />          
        <Route path="/ar" component={ARComponent} />
        <Route path="/learn" component={Assess} />
        <Route path="/upload" component={Upload} />
    </>
  )
}

export default Routes
