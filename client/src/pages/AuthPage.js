import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  
  useEffect(() => {
    console.log(error)
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  })

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (error) {}
  }

  const loginHandler = async (req, res) => {
    try {
      const data = await request('api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (error) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="row">
          <div className="card blue darken-2">
            <div className="card-content white-text">
              <span className="card-title">Авторизация</span>
              <div>
                <div className="input-field">
                  <input 
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler} 
                />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input 
                  placeholder="Введите пароль"
                  id="password" 
                  name="password"
                  type="password"
                  value={form.password} 
                  onChange={changeHandler} 
                />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
            </div>
            <div className="card-action">
              <button className="btn yellow darken-4" style={{ marginRight: 10 }} onClick={loginHandler} disabled={loading}>Войти</button>
              <button className="btn gray lighten-1 black-text" onClick={registerHandler} disabled={loading}>Регистрация</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}