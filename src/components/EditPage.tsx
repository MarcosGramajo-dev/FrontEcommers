
import ConfigBasic from './Config/ConfigBasic'
import ConfigColors from './Config/ConfigColors'
import ConfigLinks from './Config/ConfigLinks'
import TableProduct from './Config/TableProduct'
import AddProduct from './Config/AddProduct'
import CreateUser from './Config/CreateUser'

import Gear from '../images/Gear.svg'
import Palette from '../images/Palette.svg'
import Share from '../images/Share.svg'
import ClipboardPlus from '../images/ClipboardPlus.svg'
import Table from '../images/Table.svg'
import avatar from '../images/account_circle.svg'
import { useState } from 'react'
import { useMyContext } from './Context'


export default function EditPage(){ 
    const { getConfigColor} = useMyContext(); 


    const [gear, setGear] = useState(true)
    const [palette, setPalette] = useState(false)
    const [share, setShare] = useState(false)
    const [clipboardPlus, setClipboardPlus] = useState(false)
    const [table, setTable] = useState(false)
    const [user, setUser] = useState(false)


    function toggleConfig(type = ""){
        switch(type){
            case "Gear":
                setGear(true)
                setPalette(false)
                setShare(false)
                setClipboardPlus(false)
                setTable(false)
                setUser(false)
                break;
            case "Palette":
                setGear(false)
                setPalette(true)
                setShare(false)
                setClipboardPlus(false)
                setTable(false)
                setUser(false)
                break;
            case "Share":
                setGear(false)
                setPalette(false)
                setShare(true)
                setClipboardPlus(false)
                setTable(false)
                setUser(false)
                break;
            case "ClipboardPlus":
                setGear(false)
                setPalette(false)
                setShare(false)
                setClipboardPlus(true)
                setTable(false)
                setUser(false)
                break;
            case "Table":
                setGear(false)
                setPalette(false)
                setShare(false)
                setClipboardPlus(false)
                setTable(true)
                setUser(false)
                break;
            case "user":
                setGear(false)
                setPalette(false)
                setShare(false)
                setClipboardPlus(false)
                setTable(false)
                setUser(true)
                break;

            default:
                setGear(true)
                setPalette(false)
                setShare(false)
                setClipboardPlus(false)
                setTable(false)
                break;
        }
    }

    return(
        <div className="flex h-full">
            <div className="w-[50px] h-screen" style={{ backgroundColor: getConfigColor.colorS }}>
                <button className="m-2" onClick={() => toggleConfig("Gear")}><img src={Gear} alt="Gear"/></button>
                <button className="m-2" onClick={() => toggleConfig("Palette")}><img src={Palette} alt="Palette"/></button>
                <button className="m-2" onClick={() => toggleConfig("Share")}><img src={Share} alt="Share"/></button>
                <button className="m-2" onClick={() => toggleConfig("ClipboardPlus")}><img src={ClipboardPlus} alt="ClipboardPlus"/></button>
                <button className="m-2" onClick={() => toggleConfig("Table")}><img src={Table} alt="Table"/></button>
                <button className="m-2" onClick={() => toggleConfig("user")}><img src={avatar} alt="user"/></button>
            </div>
            <div className="w-full flex justify-center">
                {gear && <ConfigBasic/>}
                {palette && <ConfigColors/>}
                {share && <ConfigLinks/>}
                {clipboardPlus && <AddProduct/>}
                {table && <TableProduct/>}
                {user && <CreateUser/>}
            </div>
        </div>
    )
}