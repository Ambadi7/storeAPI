import { useState } from "react"
import Product from "./components/Product"
import axios from "axios"


function App() {
  const [product,setProduct] = useState([])
  
  const fetchData = async()=>{
    const{data} =await axios.get(`https://fakestoreapi.com/products`)
     console.log(data)
    setProduct(data)
  }
  useState(()=>{
    fetchData()
  })

  
  return (
    <>
      <div>
        <div className="flex h-16 w-full bg-slate-900 text-white justify-center items-center">
          <h1 className="text-2xl font-semibold">All Products</h1>
        </div>
        <div className="bg-gray-300 w-full min-h-screen py-6">
          <div className="flex flex-wrap gap-6  w-auto h-full mx-2 md:mx-12">
            {
              product.map((item)=>{

                return(
                  <div>
                    <Product item={item}/>
                  </div>
                    
  
                )
              })
            } 
          </div>

        </div>
      </div>
      
    </>
  )
}

export default App
