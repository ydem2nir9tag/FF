import React from 'react'
import { Header, Footer } from '../../Components'
import Content from './Content'

const Upload = (props) => {
  return (
        <div style={{display:'flex', flexDirection:'column', height:'100vh'}}>
          <Header/>
          <Content/>
          <Footer/>
      </div>
  )
}

export default Upload