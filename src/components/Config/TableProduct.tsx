import {  useState } from "react"
import {useForm} from 'react-hook-form'
import { useMyContext } from '../Context';
import axios from 'axios';
import {AddNewProduct, EditProduct} from '../../types/type'
// import noPhoto from '../../images/noPhoto.png'
import Check from '../../images/check.svg'
import Cross from '../../images/cross.svg'

import { PhotoIcon } from '@heroicons/react/24/solid'


export default function TableProduct(){
    
    const [isLoading, setIsLoading] = useState(false);
    const [stateCheck, setstateCheck] = useState(false);
    const [stateCross, setstateCross] = useState(false);
    // const [ checkboxState, setChecboxState ] = useState(false)


    const {register, handleSubmit, setValue} = useForm<EditProduct>()
    const { getAllProducts, backURL, AllProducts } = useMyContext(); 
    const [arrayPhotos, setArrayPhotos] = useState<any>([
        {
          public_id: "",
          secure_url: "",
        },
      ]);

    // function onChangeInput (e:any) {
    //     setChecboxState(e.target.checked)
    // }

    // const clearInputs = (event: any) => {
    //     event.preventDefault

    //     setValue("idProduct", "");
    //     setValue("modelo", "");
    //     setValue("age", 0);
    //     setValue("motor", "");
    //     setValue("km", 0);
    //     setValue("combustible", "");
    //     setValue("esUnSlide", false);
    //     setArrayPhotos([{
    //         public_id:"",
    //         secure_url:""
    //     }])
    // }

    const editProduct = ( id: string) => {
        if(id === ""){

            return console.log('idProduct esta vacio')

        } else{
            getAllProducts.forEach( product => {
                if(product.idProduct === id){
                    setValue("idProduct", product.idProduct);
                    setValue("modelo", product.modelo);
                    setValue("age", product.age);
                    setValue("motor", product.motor);
                    setValue("km", product.km);
                    setValue("combustible", product.combustible);
                    setValue("esUnSlide", product.esUnSlide);
    
                    setArrayPhotos(product.photos);
                      
                }
            } )
        }
    }

    const deleteProduct = ( id: string) => {
        axios.get(`${backURL}/auth/deleteProduct/${id}`,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            }).then((res) => {console.log(res), AllProducts()})
    }

    const onSubmit = (data: AddNewProduct) =>{
        try {
            
            setIsLoading(true);
            let localFormData = localStorage.getItem('formData');
            let token

            if (localFormData) {
                const parsedLocalFormData = JSON.parse(localFormData)
                token = parsedLocalFormData?.token
            }

            if (!token) {
                throw new Error('Token not found');
            }


            let headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        
            if(data.idProduct === ""){
                throw new Error("Este es un error personalizado.");
            }
            
            const formData = new FormData();

            setPhoto(data.photos)
            
            function setPhoto(photos: FileList | null) {
                if (photos && photos.length > 0) {
                for (let i = 0; i < photos.length; i++) {
                    const photo = photos[i];
            
                    if (photo.size < 1000000) {
                        formData.append(`photo${i + 1}`, photo);
                    } else {
                    console.log(`Tamaño máximo de imagen (foto ${i + 1}): 1MB`);
                    }
                }
                }
            }

            formData.append('idProduct', data.idProduct)
            formData.append('modelo', data.modelo)
            formData.append('age', data.age.toString())
            formData.append('km', data.km.toString())
            formData.append('combustible', data.combustible)
            formData.append('esUnSlide', data.esUnSlide.toString())

            console.log(data)

            axios.post(`${backURL}/auth/updateProduct`, formData, { headers }).then((res) => {
                console.log(res)
                setIsLoading(false)
                setstateCheck(true);
                setTimeout(() => {
                    setstateCheck(false);
                }, 3000);
            })
        } catch (error) {
            setIsLoading(false)
            setstateCross(true);
            setTimeout(() => {
                setstateCross(false);
            }, 3000);
            console.log('No se puedo guardar los cambios Error:', error)
        }
    }   

    return(
        <div className="min-w-[380px] max-w-7xl flex max-md:flex-col  max-sm:w-full">
            <form className="mx-5 my-3" onSubmit={handleSubmit((data: any)=> {onSubmit(data);})}>
                <h1 className="px-3 py-3 ">Editar Producto</h1>
                <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="modelo">Modelo</label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                        <input type="text" {...register("modelo")} id="modelo" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                        <input type="hidden" {...register("idProduct")} id="idProduct"/>
                    </div>
                </div>
                <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="age">Año</label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                        <input type="number" {...register("age")} required id="age" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="km">Kilometros</label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                        <input type="number" {...register("km")} id="km" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="motor">Motor</label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                        <input type="text" {...register("motor")} id="motor" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className="col-span-full">
                    <label htmlFor="combustible">Combustible</label>
                    <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                        <select {...register("combustible")} required id="combustible" className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" >
                            <option value="nafta">Nafta</option>
                            <option value="gasoil">Gasoil</option>
                            <option value="electrico">Electrico</option>
                        </select>
                    </div>
                </div>
                <div className="col-span-full my-4">
                    <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" type="checkbox" id="esUnSlide"/>                    
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="comments" className="font-medium text-gray-900">
                                ¿Aparece en el Slide Principal?
                            </label>
                        </div>
                    </div>
                </div>
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Podes subir 4 fotos por producto
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label htmlFor="photos" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                <span>Upload a file</span>
                                <input type="file" accept="image/*" multiple={true} {...register("photos")} id="photos" className="sr-only"/>
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 1MB</p>
                    </div>
                </div>
                <div className="flex flex-wrap">
                    {arrayPhotos.map((element:any) => (
                        <img className="w-[200px]" src={element.secure_url} alt={element.public_id} key={element.public_id}/>
                    ))}
                </div>

                <div className="col-span-full" >
                    <button className="my-3 flex w-full justify-between rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit" disabled={isLoading}>
                        <div >
                            Guardar cambios
                        </div>
                        <div className="loading-spinner" style={{ display: isLoading ? 'block' : 'none' }}>
                            <div className="spinner"></div>
                        </div>
                        { stateCheck ? <img src={Check} alt="check" style={{width:'30px'}} /> : <></> }
                        { stateCross ? <img src={Cross} alt="cross" style={{width:'30px'}} /> : <></> }
                    </button>
                </div>
            </form>
            <div className="relative overflow-x-auto my-3">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-3 py-3">
                                Modelo
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Año
                            </th>
                            <th scope="col" className="px-3 py-3">
                                ¿Es un Slide?
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Accion
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllProducts.map((element: EditProduct) => (
                            <tr key={element.idProduct} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{element.modelo}</th>
                                <td className="text-center">{element.age}</td>
                                <td className="text-center">{element.esUnSlide.toString()}</td>
                                <td className="flex py-2">
                                    <button className="font-medium mx-2 text-center text-blue-600 dark:text-blue-500 hover:underline" onClick={()=> editProduct(element.idProduct)}>Editar</button>
                                    <button className="font-medium mx-2 text-center text-blue-600 dark:text-blue-500 hover:underline" onClick={()=> deleteProduct(element.idProduct)}>Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}