import React from 'react'
import { Outlet } from 'react-router'

const Body = () => {
  return (
    <>
    <h1>Body start</h1>
    <Outlet/>
    <h1>Body end</h1>
    </>
  )
}

export default Body