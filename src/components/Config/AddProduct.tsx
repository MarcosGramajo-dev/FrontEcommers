import {useForm} from 'react-hook-form'
import { AddNewProduct } from '../../types/type'
import { useState } from 'react';
import axios from 'axios';
import { useMyContext } from '../Context';
import Check from '../../images/check.svg'
import Cross from '../../images/cross.svg'

import { PhotoIcon } from '@heroicons/react/24/solid'


export default function AddProduct(){

    const [isLoading, setIsLoading] = useState(false);
    const [stateCheck, setstateCheck] = useState(false);
    const [stateCross, setstateCross] = useState(false);

    const { register, handleSubmit, setValue} = useForm<AddNewProduct>()
    const { backURL } = useMyContext(); 
    const [ checkboxState, setChecboxState ] = useState(false)
    const [arrayPhotos, setArrayPhotos] = useState<any>([
        {
          public_id: "",
          secure_url: "",
        },
      ]);

    function onChangeInput (e:any) {
        setChecboxState(e.target.checked)
    }

    const clearInputs = () => {

        setValue("idProduct", "");
        setValue("modelo", "");
        setValue("age", 0);
        setValue("motor", "");
        setValue("km", 0);
        setValue("combustible", "");
        setValue("esUnSlide", false);
        setArrayPhotos([{
            public_id:"",
            secure_url:""
        }])
    }
    
    arrayPhotos
    const onSubmit = (data: AddNewProduct) =>{
        try {
            setIsLoading(true)
            const timestamp = new Date().getTime();
            const randomPart = Math.random().toString(36).substring(2, 10);
            
            data.idProduct = `${timestamp}${randomPart}`
            
            const formData = new FormData();

            let localFormData = localStorage.getItem('formData');
            let token

            if (localFormData) {
                const parsedLocalFormData = JSON.parse(localFormData)
                token = parsedLocalFormData?.token
            }

            if (!token) {
                throw new Error('Token not found');
            }


            // let headers = {
            //     'Authorization': `Bearer ${token}`,
            //     'Content-Type': 'multipart/form-data',
            // }

            formData.append('idProduct', data.idProduct)
            formData.append('modelo', data.modelo)
            formData.append('age', data.age.toString())
            formData.append('km', data.km.toString())
            formData.append('combustible', data.combustible)
            formData.append('esUnSlide', checkboxState.toString())
            formData.append("motor", data.motor);
            
            setPhoto(data.photos)
            
            function setPhoto(photos: FileList | null) {
                if (photos && photos.length > 0) {
                    for (let i = 0; i < photos.length; i++) {
                        const photo = photos[i];
                        formData.append(`photo${i + 1}`, photo);
                        // if (photo.size < 1000000) {
                            
                        // } else {
                        // console.log(`Tamaño máximo de imagen (foto ${i + 1}): 1MB`);
                        // }
                    }
                }
            }
            console.log(data)
            axios.post(`${backURL}/addProduct`, formData ).then(() => {
                setIsLoading(false)
                setstateCheck(true);
                setTimeout(() => {
                    setstateCheck(false);
                    clearInputs();
                }, 3000);
            }).catch(error => {
                setIsLoading(false)
                setstateCross(true);
                setTimeout(() => {
                    setstateCross(false);
                }, 3000);
                console.log('errorAPI', error)})
        } catch (error) {
            setIsLoading(false)
            setstateCross(true);
            setTimeout(() => {
                setstateCross(false);
            }, 3000);
            console.log('No se pudo agregar el nuevo producto. Error:', error)
        }
    }   

    return(
        <div className="min-w-[350px] max-w-md">
            <form className="mx-5" onSubmit={handleSubmit((data: any)=> {onSubmit(data);})}>
                <h1>Agrega un nuevo producto</h1>
                <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="modelo">Modelo</label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input type="text" {...register("modelo")} required id="modelo" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="age">Año</label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input type="number" {...register("age")} required id="age" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="km">Kilometros</label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input type="number" {...register("km")} id="km" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="motor">Motor</label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input type="text" {...register("motor")} id="motor" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className="col-span-full">
                    <label htmlFor="combustible">Combustible</label>
                    <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
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
                            <input className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" type="checkbox" onChange={() => onChangeInput(event)} id="esUnSlide"/>                    
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
        </div>
    )
}