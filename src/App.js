import defaultLogo from './logo.svg'
import React, { useState, useEffect } from 'react'
import './App.scss'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import {
  actionRootCats,
  actionGoodById,
  actionCatById,
} from './actions'
import { store } from './reducers'
import { CLoginForm,CRegisterForm,CLogout } from './components/LoginRegisterLogout'
import { CDash,CDashboard } from './components/Dashboard'
import {CCategory,Aside} from './components/Categories'
import { CGood} from './components/Goods'
import {CCart} from './components/Cart'

console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
store.dispatch(actionRootCats())
const Header = () => (
  <header>
    <CLogout className='Link'/>
    <Link className='Link' to={`/login`}> Sign In </Link>
    <Link className='Link' to={`/register`}> Register </Link>
    <Link className='Link' to={`/cart`}> Cart </Link>
    <CDash className='Link'/>
  </header>
)


const PageMain = () => <div className="PageMain">ГЛАВНАЯ</div>
const PageCategory = ({
  match: {
    params: { _id },
  },
  getData,
}) => {
  useEffect(() => {
    getData(_id)
  }, [_id])

  return (
    <div className="PageCategory">
      <pre>
        <CCategory /> 
      </pre>
    </div>
  )
}
const CPageCategory = connect(null, { getData: actionCatById })(PageCategory)

const PageGood = ({
  match: {
    params: { _id },
  },
  getData,
}) => {
  useEffect(() => {
    getData(_id)
  }, [_id])
  return (
    <div className="PageGood">
        <CGood /> 
    </div>
  )
}


const CPageGood = connect(null, { getData: actionGoodById })(PageGood)
const Main = () => (
  <main>
    <Aside></Aside>
    <Switch>
      <Route path="/" exact component={PageMain} />
      <Route path="/category/:_id" component={CPageCategory} />
      <Route path="/good/:_id" component={CPageGood} />
      <Route path="/login" component={CLoginForm} />
      <Route path="/register" component={CRegisterForm} />
      <Route path="/cart" component={CCart} />
      <Route path="/dashboard" component={CDashboard} />
    </Switch>
  </main>
)


const history = createHistory()
function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div className="App">
          <Header />
          <Main />
        </div>
      </Provider>
    </Router>
  )
}

export default App
