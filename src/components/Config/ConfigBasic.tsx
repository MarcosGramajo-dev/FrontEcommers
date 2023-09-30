import axios from 'axios';
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { ConfBasic } from '../../types/type';
import { useMyContext } from '../context';
import Check from '../../images/check.svg'
import Cross from '../../images/cross.svg'

import { PhotoIcon } from '@heroicons/react/24/solid'

export default function ConfigBasic(){

    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, setValue  } = useForm<ConfBasic>();
    const { getConfigBasic, backURL, getConfig } = useMyContext(); 
    const [stateCheck, setstateCheck] = useState(false);
    const [stateCross, setstateCross] = useState(false);

    useEffect(() => {
        setValue("titulo", getConfigBasic.titulo);
        setValue("eslogan", getConfigBasic.eslogan);
        setValue("tel", getConfigBasic.tel);
        setValue("direccion", getConfigBasic.direccion);
        setValue("nameLogo", getConfigBasic.nameLogo);
        setValue("urlImg", getConfigBasic.urlImg);
        setValue("fileName", getConfigBasic.fileName);
        // Establece los valores para otros campos aquí
    }, [getConfigBasic, setValue]);

    const onSubmit = (data: ConfBasic) =>{
        try {
            setIsLoading(true);
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


            let headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }

            formData.append('titulo', data.titulo)
            formData.append('eslogan', data.eslogan)
            formData.append('tel', data.tel.toString())
            formData.append('direccion', data.direccion)
            formData.append('logo', getConfigBasic.nameLogo)
            formData.append('type', 'configBasic')
            formData.append("urlImg", getConfigBasic.urlImg);
            formData.append("fileName", getConfigBasic.fileName);

            if(data.logo[0] != null){
                if(data.logo[0].size < 1000000){
                    formData.append('logo', data.logo[0])
                    axios.post(`${backURL}/auth/config`, formData, {headers}).then((res) => {console.log(res), setIsLoading(false)}).then(()=> getConfig("configBasic")).then(()=>{
                        setIsLoading(false)
                        setstateCheck(true);
                        setTimeout(() => {
                            setstateCheck(false);
                        }, 3000);
                    })
                    }else {
                        console.log("Tamaño maximo de imagen 1mb")
                    }
                    
            } else{
                    axios.post(`${backURL}/auth/config`, formData, {headers}).then(() => setIsLoading(false)).then(()=> getConfig("configBasic")).then(()=>{
                        setIsLoading(false)
                        setstateCheck(true);
                        setTimeout(() => {
                            setstateCheck(false);
                        }, 3000);
                    })
            }
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
        <div className="min-w-[380px] max-w-md">
            <form className="mx-5" onSubmit={handleSubmit((data: any)=> {onSubmit(data);})} encType="multipart/form-data">
                <div className="col-span-full">
                    <div className="group-input">
                        <label htmlFor="titulo" className="block text-sm font-medium leading-6 text-gray-900">Titulo</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input type="text" id="titulo" {...register("titulo")} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="eslogan" className="block text-sm font-medium leading-6 text-gray-900">Eslogan</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <textarea {...register("eslogan")} id="eslogan" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                </div>
                <div>
                    <p className="block text-sm font-medium leading-6 text-gray-900">Icono Actual</p>
                    <div className="my-3">
                        <img className="w-36 " src={getConfigBasic.urlImg != "" ? `${getConfigBasic.urlImg}` : ""} alt={getConfigBasic.nameLogo}/>
                    </div>
                </div>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label htmlFor="logo" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                <span>Upload a file</span>
                                <input type="file" accept="image/*" multiple={false} {...register("logo")} id="logo" className="sr-only"/>
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 1MB</p>
                    </div>
                </div>
                
                <div className="col-span-full">
                    <div className="group-input">
                        <label htmlFor="tel" className="block text-sm font-medium leading-6 text-gray-900">Telefono</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input type="number" {...register("tel")} id="tel" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    
                    <div className="col-span-full">
                        <label htmlFor="direccion" className="block text-sm font-medium leading-6 text-gray-900">Direccion</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input type="text" {...register("direccion")} id="direccion" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                    <input type="hidden" {...register("fileName")} id="fileName"/>
                    <input type="hidden" {...register("urlImg")} id="urlImg"/>
                    </div>
                </div>
                <div className="col-span-full">
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