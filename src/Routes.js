import React from 'react'
import ARComponent from './components/arscan';
import GetNotes from './components/prep';
import Assess from './components/learn';
import Upload from './components/upload';
import LoadBo from './components/loadBo';
import { Route } from 'wouter';

const Routes = () => {

  return (
    <>
        <Route exact path="/prep" component={GetNotes} />          
        <Route path="/ar" component={ARComponent} />
        <Route path="/learn" component={Assess} />
        <Route path="/upload" component={Upload} />
        <Route exact path="/" component={LoadBo} />     
    </>
  )
}

export default Routes
