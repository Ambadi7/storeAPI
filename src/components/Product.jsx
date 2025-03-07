import React from 'react'
import PropTypes from 'prop-types'
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';

const Product = ({item}) => {
  

  return (
    <div className='flex flex-col w-[400px] bg-slate-800 rounded-md h-[365px] py-3 justify-between'>
        <div className='flex flex-col gap-1 items-center w-full px-4' >
            <div className='flex justify-center items-center w-[170px] h-[170px] bg-white rounded-xl'>
                <img  className='h-38 w-38 object-contain' src={item.image}></img>
            </div>
            <div className=' text-white font-semibold flex-wrap'>
                <h2>{item.title.substring(0,40)}... </h2>

            </div>
            <div className=' text-zinc-400  flex-wrap'>
                <h2>{item.category} </h2>

            </div>
            <div className='flex items-center h-auto  text-white '>
                <h3 className='text-md font-bold'><CurrencyRupeeRoundedIcon/> {item.price}</h3>

            </div>
            <div className=' text-zinc-400  flex-wrap '>
                <h2 className='flex justify-center items-center h-auto w-auto'>{item.rating.rate}  <span className='text-yellow-500'><StarRateRoundedIcon/></span>  &nbsp; &nbsp;   {item.rating.count} <PeopleRoundedIcon/>  </h2>

            </div>
        </div>
        <div className='  flex gap-4 text-slate-800 font-semibold w-full justify-center'>
            <button className='bg-white p-1 rounded-md'>Add to Cart</button>
            <button className='bg-white p-1 rounded-md'>Buy Now</button>
        </div>
    </div>
  )
}

Product.PropTypes = {
    item:PropTypes.item,
}

export default Product