import {useForm} from 'react-hook-form'
import { ConfColors } from '../../types/type'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMyContext } from '../context';

export default function ConfigColors(){

    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, setValue} = useForm<ConfColors>()
    const { getConfigColor, backURL } = useMyContext(); 

    useEffect(() => {
        setValue("colorP", getConfigColor.colorP);
        setValue("colorS", getConfigColor.colorS);
        // Establece los valores para otros campos aquí
    }, [getConfigColor, setValue]);

    const onSubmit = (data: ConfColors) =>{

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

            if(data.colorP === ""){
                data.colorP = '#ffffff'
            }
            if(data.colorS === ""){
                data.colorS = '#000000'
            }
            formData.append('type', 'configColor')
            formData.append('colorP', data.colorP)
            formData.append('colorS', data.colorS)

            axios.post(`${backURL}/auth/config/colors`, formData, { headers }).then((res) => {console.log(res), setIsLoading(false);})

        } catch (error) {
            setIsLoading(false);
            console.log('No se pudo guardar los cambios. Error:', error)
        }
    }   

    return(
        <div className="min-w-[380px] max-w-md">
            <form className="mx-5" onSubmit={handleSubmit((data: any)=> {onSubmit(data);})}>
                <div className="col-span-full">
                    <label htmlFor="colorP" className="block text-sm font-medium leading-6 text-gray-900">Color Principal</label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input type="color" {...register("colorP")} id="colorP" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className="col-span-full">
                    <label htmlFor="colorS" className="block text-sm font-medium leading-6 text-gray-900">Color Secundario</label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input type="color" {...register("colorS")} id="colorS" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
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