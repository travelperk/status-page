import React, {useState, useEffect} from 'react'
import {logOut, openLoginPopup, registerUserChanges, User} from './api'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import Toast from './components/Toast'
import styled from 'styled-components'
import Button from './components/Button'
import Home from './pages/home/Home';

const LoginPage = styled.div`
display: flex;
height: 100vh;
width: 100vw;
justify-content: center;
align-items: center;
`

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    registerUserChanges(setUser)
  }, [])

  if (user === null) {
    return <LoginPage>
      <Button onClick={openLoginPopup}>Login</Button>
    </LoginPage>
  }

  if (!user) {
    return <LoginPage>Loading...</LoginPage>
  }

  if (!user.email || !user.email.endsWith('@travelperk.com')) {
    return <Toast action={logOut} actionText="Logout">
      You need to log in with your TravelPerk account.
    </Toast>
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/create" component={() => <div>Create</div>}/>
        <Route path="/update" component={() => <div>Update</div>}/>
        <Route path="/" exact component={Home}/>
        <Redirect to="/"/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
