import { useMyContext } from './Context';
// import { useState } from 'react';
// import axios from 'axios';
import Carouse from './Carouse'
import Shop from './Shop'

export default function HomePage(){
    
    //const [getAllProducts, setGetAllProducts] = useState([])
    
    const {getConfigColor} = useMyContext(); 

    // const AllProducts = async () => {

    //     const response = await axios.get(`${backURL}/product`);

    //     setGetAllProducts(response.data)

    //     console.log(response.data)
    // }

    const colorP = getConfigColor.colorP
    const colorS = getConfigColor.colorS

    console.log(colorP, colorS)

    //const classButtons = `w-40 bg-[${getConfigColor.colorP}] text-white py-2 border-solid border-2 border-[${getConfigColor.colorP}] hover:text-[${getConfigColor.colorP}] hover:bg-white`
    
    return(
        <div>
            <div className="max-w-screen-2xl m-auto p-6 overflow-hidden">
                <div className="flex max-md:flex-col justify-between">
                    <div className="w-2/5 h-[650px] max-xl:h-[450px] max-xl:w-1/2 max-md:w-full flex flex-col justify-around z-10">
                        <div className="w-1/4 h-1 rounded-lg my-5 bg-gray-300"></div>
                        <h1 ><span className="text-6xl font-bold max-lg:text-4xl" style={{color:getConfigColor.colorP}}>GUILLANA</span> <span className="text-6xl font-bold max-lg:text-4xl" style={{color:getConfigColor.colorS}}>AUTOMOTORES</span> </h1>
                        <p className="pt-5 max-lg:pt-0">Somos fanáticos de los autos, ¡y queremos contagiarte esa emoción! No se trata solo de comprar un auto usado, se trata de encontrar ese compañero de rutas que se adapte a tu estilo. </p>
                        <button className="w-40 bg-orange-600 text-white py-2 border-solid border-2 border-orange-600 hover:text-orange-600 hover:bg-white ">
                            Ver más
                        </button>
                        <div className="flex justify-center items-center">
                            <div className="w-1/4 flex  ">
                                <div className="w-8 h-8 rounded-full m-1 bg-gray-300"></div>
                                <div className="w-8 h-8 rounded-full m-1 bg-gray-300"></div>
                            </div>
                            <div className="w-3/4 h-1 rounded-lg bg-gray-300"></div>
                        </div>
                    </div>
                    
                    <Carouse/> 
                </div>
                    <Shop/>
            </div>


            
            
        </div>
    )
}