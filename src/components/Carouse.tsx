import { useMyContext } from './Context';
import { useState, useEffect } from 'react';
import axios from 'axios'
import {AddNewProduct} from '../types/type'

export default function HomePage(){

    const { backURL } = useMyContext(); 

    const [getAllProducts, setGetAllProducts] = useState<AddNewProduct[]>([])
 
    const AllProducts = async () => {
        const response = await axios.get(`${backURL}/product`);
        setGetAllProducts(response.data)
    }


    useEffect(() => {
        AllProducts()
    },[])

    return(
            <div className="w-3/5 text-end m-auto my-5 max-xl:w-1/2 max-lg:mr-0 max-md:w-full ">
                <div>
                    <p className="text-xl text-gray-500">
                    {
                        getAllProducts.map((element: any)=>(
                            element.esUnSlide ? <a href={'#' + element.modelo}  className="text-lg max-lg:text-base uppercase text-gray-500 p-2 hover:text-gray-700 hover:font-bold active:font-bold active:text-gray-700">{element.modelo} | </a> : null
                        ))
                    }
                    </p>
                </div>
                <div className="flex h-[550px] w-[880px] overflow-hidden scroll-m-0 scroll-smooth scroll-p-0 max-xl:h-[350px] max-xl:w-[650px] max-lg:w-full max-lg:h-[300px] max-md:max-w-[100vw]">
                    {getAllProducts.map((element: any) =>
                        element.esUnSlide ? (
                        <div id={element.modelo} key={element.modelo} className="max-md:max-w-[100vw]">
                            <div
                            className="object-cover overflow-x-hidden relative h-[550px] w-[880px] max-xl:h-[350px] max-xl:w-[650px] max-lg:w-[500px] max-lg:h-[300px] max-md:w-[100vw] animate-fade-down animate-once animate-ease-in-out"
                            >
                            <img
                                src={element.photos[0].secure_url}
                                alt={element.photos[0].public_id}
                                className="object-fill w-full h-full max-lg:w-[500px] max-lg:h-[300px] max-md:w-[100vw] "
                            />
                            <div className="absolute top-0 w-full h-full  left-0 clip-diagonal"></div>
                            </div>
                        </div>
                        ) : null
                    )}
                </div>
                <div className="flex justify-center relative top-[-25px]">
                    <a className=" text-center cursor-pointer transformFirstButton flex items-center justify-center w-40 h-14 max-lg:w-32 max-lg:h-10 shadow-gray-600 shadow-md bg-[#eb5a29] text-white border-solid border-2 border-[#eb5a29] hover:text-[#eb5a29] hover:bg-white">
                        Exterior
                    </a>
                    <a className="text-center cursor-pointer w-52 h-20 max-lg:w-40 max-lg:h-14 max-lg:top-[-10px] flex items-center justify-center relative top-[-14px] shadow-gray-600 shadow-md z-10 bg-[#eb5a29] text-white px-5 border-solid border-2 border-[#eb5a29] hover:text-[#eb5a29] hover:bg-white">
                        Ver publicacion
                    </a>
                    <a className="text-center transformFirstLast cursor-pointer flex items-center justify-center w-40 h-14 max-lg:w-32 max-lg:h-10 shadow-gray-600 shadow-md bg-[#eb5a29] text-white border-solid border-2 border-[#eb5a29] hover:text-[#eb5a29] hover:bg-white">
                        Interior
                    </a>
                </div>
            </div>
    )
}