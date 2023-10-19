import { AddNewProduct } from '../types/type';
import CardM from './CardModel'
import { useMyContext } from './Context';
import axios from 'axios'
import {useState, useEffect} from 'react'

export default function CardModel(){

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
        <div className="w-full flex flex-wrap m-auto justify-between max-md:justify-center">
            {
                getAllProducts.map((element: any)=>(
                    <CardM
                    modelo={element.modelo}
                    age={element.age}
                    km={element.km}
                    combustible={element.combustible}
                    motor={element.motor}
                    key={element.idProduct}
                    idProduct={element.idProduct}
                    photos={element.photos}
                />
                    
                ))
            }
        </div>
    )
}