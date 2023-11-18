import React from 'react'
import { Banner } from '../components/Banner'
import BestSellerBooks from './BestSellerBooks'
import OtherBooks from './OtherBooks'
import Review from './Review'

const Home = () => {
  return (
    <div >
      <Banner/>
      <BestSellerBooks/>
      <OtherBooks/>
      <Review/>
    </div>
  )
}

export default Home