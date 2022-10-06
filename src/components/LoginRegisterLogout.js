import { actionFullLogin, actionFullRegister, actionAuthLogout} from '../actions'
import React, { useState } from 'react'
import { connect } from 'react-redux'
const CAuth = connect((state) => ({
  children: `Добро пожаловать! ${ state.auth.payload?.sub?.login || 'Аноним, введите корректные данные'} !`,
}))('div')
const LoginForm = ({ onLogin, children }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(true)
  return (
    <>
      <div>
        <h1> {children}</h1>
        <strong> You must enter at least 5 characters </strong>
        <h2> Login</h2>
        <input
          className="Input"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <h2> Password </h2>
        <input
          type={checked ? 'password' : 'text'}
          className="Input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked)
          }}
        />
        <button
          className="Btn"
          disabled={login.length < 5 || password.length < 5}
          onClick={() => onLogin(login, password)}
        >
          {children}
        </button>
        {<CAuth />}
      </div>
    </>
  )
}
export const CLoginForm = connect(
  (state) => ({
    children: `Sign In`,
  }),
  {
    onLogin: actionFullLogin,
  },
)(LoginForm)

export const CRegisterForm = connect(
  (state) => ({
    children: `Register`,
  }),
  {
    onLogin: actionFullRegister,
  },
)(LoginForm)

export const CLogout = connect(
  (state) => ({
    children: `Logout (${state.auth.payload?.sub?.login || 'Anon'})`,
  }),
  { onClick: actionAuthLogout },
)('a')
