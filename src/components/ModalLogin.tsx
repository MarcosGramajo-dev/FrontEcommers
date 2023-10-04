import { useForm, Controller } from 'react-hook-form';
import {useState} from 'react'
import { useMyContext } from './Context'
import avatar from '../images/user-login-avatar.svg'
import person from '../images/person.svg'
import lock from '../images/lock.svg'
import { UserInfo } from '../types/type'
import axios from 'axios'

export default function ModalLogin(){
    const {register, handleSubmit, control} = useForm<UserInfo>()
    const { getConfigColor, setShowModal, showModal, backURL, loginUser} = useMyContext(); 

    const [resError, setResError] = useState('')


    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = (data:UserInfo) => {
        try {
            setIsLoading(true);
            const formData = {
                user: data.user,
                pass: data.pass,
                token: "",
                _id: "",
                role: ""
            }

            axios.post(`${backURL}/login`, formData)
            .then((res) => {
                console.log(res);
                setIsLoading(false);
                formData.token = res.data.token
                if (res.data.error){
                    setResError(res.data.error)
                }
                loginUser(formData)
                setResError('')
            })
            .catch((error) => {
                setIsLoading(false);
                console.log('Error de Axios:', error);
                setResError(error.response.data.error)
            });

            // axios.post(`${backURL}/auth/login`, formDataJSON).then((res) => {console.log(res),setIsLoading(false);})
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false);
            console.log('No se pudo guardar los cambios. Error:', error)
        }
    }

    return(
        <div>
            {showModal ? (
            <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-sm">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">
                        Iniciar Sesion
                    </h3>
                    <button
                        className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                    >
                        <span className=" text-black w-6 text-2xl outline-none focus:outline-none flex items-center justify-center h-6">
                        ×
                        </span>
                    </button>
                    </div>
                    {/*body*/}
                    <img src={avatar} alt="avatar" className="m-auto mb-3 w-24 mt-3" />
                    <form onSubmit={handleSubmit((data: any)=> {onSubmit(data);})}>
                        <div className="relative px-6 flex-auto">
                            <div className="relative flex w-full flex-wrap items-stretch mb-3">
                            <Controller
                                name="user"
                                control={control}
                                rules={{
                                    required: 'Username is required',
                                }}
                                render={({ field }) => (
                                    <>
                                        <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                            <img src={person} alt="person"/>
                                        </span>
                                        <input 
                                        type="text" 
                                        {...register("user")} 
                                        placeholder="Usuario" 
                                        className="px-3 py-2 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
                                        onChange={(e) => {
                                            field.onChange(e);
                                        }}
                                        />
                                    </>
                                )}
                            />
                            
                            </div>
                            <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                <Controller
                                    name="pass"
                                    control={control}
                                    rules={{
                                        required: 'Username is required',
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                                <img src={lock} alt="lock"/>
                                            </span>
                                            <input 
                                            type="password" 
                                            placeholder="Contraseña" 
                                            {...register("pass")} 
                                            className="px-3 py-2 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
                                            onChange={(e) => {
                                                field.onChange(e);
                                            }}
                                            />
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 rounded-b flex-col">
                            
                            <button
                                className=" w-full text-white text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                
                                type="submit"
                                style={{backgroundColor: getConfigColor.colorP}}
                            >
                                <div >
                                    Iniciar Sesion
                                </div>
                                <div className="loading-spinner" style={{ display: isLoading ? 'block' : 'none' }}>
                                    <div className="spinner"></div>
                                </div>
                            </button>
                            <button 
                                className="w-full text-red-500 border border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                onClick={() => setShowModal(false)}
                                
                            >
                                Cancelar
                            </button>
                            <p className="text-red-500">{resError}</p>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}
        </div>
    )
}