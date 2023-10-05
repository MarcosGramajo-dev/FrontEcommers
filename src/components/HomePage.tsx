import { useMyContext } from './Context';
import { useMyContextModal } from './ContextModal';
// import { useState } from 'react';
// import axios from 'axios';
import Carouse from './Carouse'
import Shop from './Shop'
import BigModal from './BigModal'

export default function HomePage(){
    
    const {getConfigColor} = useMyContext(); 
    const {objectModal} = useMyContextModal(); 
    
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
                    {/* <BigModal 
                        modelo={props.modelo}
                        age={props.age}
                        km={props.km}
                        combustible={props.combustible}
                        motor={props.motor}
                        key={props.idProduct}
                        idProduct={props.idProduct}
                        photos={props.photos}
                    /> */}
                    <BigModal 
                        modelo={objectModal.modelo}
                        age={objectModal.age}
                        km={objectModal.km}
                        combustible={objectModal.combustible}
                        motor={objectModal.motor}
                        key={objectModal.idProduct}
                        idProduct={objectModal.idProduct}
                        photos={objectModal.photos}
                    />
            </div>


            
            
        </div>
    )
}