import {useForm} from 'react-hook-form'
import axios from 'axios';
import { ConfLinks } from '../../types/type'
import { useEffect, useState } from 'react';
import { useMyContext } from '../context';


export default function ConfigLinks(){

    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, setValue} = useForm<ConfLinks>()
    const { getConfigLink, backURL} = useMyContext(); 

    useEffect(() => {
        setValue("facebook", getConfigLink.facebook);
        setValue("instagram", getConfigLink.instagram);
        setValue("twiter", getConfigLink.twiter);
        setValue("linkGoogle", getConfigLink.linkGoogle);
        // Establece los valores para otros campos aquí
    }, [getConfigLink, setValue]);


    const onSubmit = (data: ConfLinks) =>{
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

            formData.append('type', 'configLink')
            formData.append('facebook', data.facebook)
            formData.append('instagram', data.instagram)
            formData.append('twiter', data.twiter)
            formData.append('linkGoogle', data.linkGoogle)

            // console.log({headers: headersToken})

            axios.post(`${backURL}/auth/config/links`, formData, {headers} ).then((res) => {console.log(res),setIsLoading(false);}).catch((err)=> {
                setIsLoading(false);
                console.log(err);
                // if(err.response.data.message === 'Access denied'){
                //    outAccount()
                // }
                
            })
        } catch (error) {
            setIsLoading(false);
            console.log('No se pudo guardar los cambios. Error:', error)
        }
    } 

    return(
        <div className="min-w-[380px] max-w-md">
            <form className="mx-5" onSubmit={handleSubmit((data: any)=> {onSubmit(data);})} encType="multipart/form-data">
                <div className="col-span-full">
                    <div className="col-span-full">
                        <label htmlFor="facebook" className="block text-sm font-medium leading-6 text-gray-900">Facebook</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input type="url" {...register("facebook")} id="facebook" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="twiter" className="block text-sm font-medium leading-6 text-gray-900">Twiter</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input type="url" {...register("twiter")} id="twiter" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="instagram" className="block text-sm font-medium leading-6 text-gray-900">Instagram</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input type="url" {...register("instagram")} id="instagram" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="linkGoogle" className="block text-sm font-medium leading-6 text-gray-900">Link Google Maps</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input type="url" {...register("linkGoogle")} id="linkGoogle" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                        </div>
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
                    </button>
                </div>
            </form>
        </div>
    )
}