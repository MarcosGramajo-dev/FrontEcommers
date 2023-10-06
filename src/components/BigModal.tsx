import {useState} from "react";
import { useMyContextModal } from './ContextModal';
import { useMyContext } from './Context';

export type product = {
    modelo: string,
    age: number,
    km: number,
    combustible: string,
    motor: string,
    idProduct: string,
    photos:[{public_id: string, secure_url:string}],
  }

export default function Modal(props: product) {

    const { setShowBigModal, showBigModal } = useMyContextModal();
    const {getConfigColor} = useMyContext(); 

    const [ srcImage, setSrcImage ] = useState< string | null >('')
    const [isImageLoaded, setIsImageLoaded] = useState(false);


    const changeImage = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        setIsImageLoaded(true);
        const newSrcImage = event.currentTarget.getAttribute("src");
        srcImage
        getConfigColor
        if (newSrcImage) {
          setSrcImage(newSrcImage);
          document.getElementById("principalImage")?.setAttribute("src", newSrcImage);
        }
      };
    
    const handleImageLoad = ()=>{
        setIsImageLoaded(false)
    }

  return (
    <>

      {showBigModal ? (
        <>
          <div
            className="animate-jump-in animate-once animate-duration-500 animate-ease-out  justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {props.modelo}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowBigModal(false)}
                  >
                    <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="flex max-md:flex-col">
                    <div>
                        

                        <div>
                            <div className="min-w-[200px] w-full max-w-[550px] max-md:max-w-[450px] h-[380px] max-md:h-[280px] overflow-hidden relative">
                                <div className={`${isImageLoaded ? 'loading-spinner absolute w-full h-full top-0 left-0' : 'hidden'}`} >
                                    <div className="spinner w-10 h-10"></div>
                                </div>
                                <img id="principalImage" onLoad={handleImageLoad} src={props.photos[0].secure_url} alt="" className={`p-5 min-w-[200px] w-full ${isImageLoaded ? ' opacity-75 ' : ''}`}/>
                                
                            </div>
                            <div className="flex justify-center items-center pb-5">
                                { props.photos.map((element)=>(
                                    <img onMouseEnter={changeImage} className="cursor-pointer w-16 p-1 m-1 opacity-80 border border-white hover:opacity-100 hover:border-slate-600" key={element.public_id} src={element.secure_url} alt={element.public_id}/>
                                )) }
                            </div>
                        </div>

                    </div>
                    <div className="relative p-6 flex-col">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                   MODELO
                                </th>
                                <td className="px-6 py-4">
                                    {props.modelo}
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    AÑO
                                </th>
                                <td className="px-6 py-4">
                                    {props.age}
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    COMBUSTIBLE
                                </th>
                                <td className="px-6 py-4">
                                    {props.combustible}
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    MOTOR
                                </th>
                                <td className="px-6 py-4">
                                    {props.motor}
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    KILOMETROS
                                </th>
                                <td className="px-6 py-4">
                                    {props.km}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={2}>
                                    <a href="https://www.google.com" target="_blank">
                                    <button className="w-full h-9 text-white bg-green-600 m-2 border border-green-600 border-solid hover:bg-white hover:text-green-600" >WhatsApp</button>
                                    </a>
                                </td>
                            </tr>
                        </tfoot>
                        </table>
                    
                    
                    
                    
                    
                    </div>
                </div>
                {/*footer*/}
                {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowBigModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowBigModal(false)}
                  >
                    Save Changes
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" ></div>
        </>
      ) : null}
    </>
  );
}