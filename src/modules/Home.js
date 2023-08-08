import React from 'react'
import Coinstable from '../components/Coinstable'
import Banner from '../components/Banner/Banner'
//our home page have two section 1st one is banner 2nd one is table of crypto
const Home = () => {
  return (
    <div>
      <Banner />
      <Coinstable />
    </div>
  )
}

export default Home
