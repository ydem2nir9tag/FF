import { Button } from '@mui/material'
import React from 'react'
import { Header, Footer } from '../../Components'
import { signOutwithGoogle } from '../../service/firebase'
import LogoutIcon from '@mui/icons-material/Logout';
import Content from './Content'



const Account = (props) => {
  const SignOutButton = () => {
    return (
      <Button color="inherit" href="/account" onClick={() => {signOutwithGoogle(); props.logOut()}}>
        <LogoutIcon /> &nbsp; Sign Out
      </Button>
    )
  }

  return (
    <div style={{display:'flex', flexDirection:'column', height:'100vh'}}>
      <Header>
          <SignOutButton/>
      </Header>
      <Content/>
      <Footer/>
    </div>
  )
}

export default Account