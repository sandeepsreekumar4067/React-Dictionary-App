import { useEffect, useState } from 'react';
import '../style/interface.css'
import WordList from './wordlist';
import { FaSearch } from "react-icons/fa";

const Interface = () => {
    const [data,setdata] = useState(null)
    const [path,setpath] = useState(null)
    const [word,setword] = useState('')
    const [handling,sethandling] = useState(false)
    const API = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
    const FetchData = () =>{
        if(word.length>0){
            fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+word)
            .then((response)=> {
                if(response.ok){
                    sethandling(true)
                    return response.json()
                }else{
                    throw new Error("Stop Typing Nonsense")
                }
            })
            .then((data)=>{
                if(data.length>0){
                    setpath(data[0].meanings[0].definitions[0].definition)
                    
                }else{
                    throw new Error("No Definition Found")
                }
            })
            .catch((e)=>{
                setpath(e.toString())
            })
            setword('')
        }
    }
    const handleChange = (event) =>{
        setword(event.target.value)
        sethandling(false)
        setpath(null)
    }
    return ( 
        <div className="interface">
            <div className="box">
               <div className="title">
                Dictionary App
               </div>
               <div className="input-box">
                <input type="text" placeholder='Search Words...' value={word} onChange={handleChange}/>
                <div className="input-icon" onClick={FetchData} >
                <FaSearch size={20} color='black' />
                </div>
               </div>
                <div className={`result${handling?' animate':''}`} >
                    {path && <WordList path={path}/>}
                </div>
            </div>
        </div>
     );
}
 
export default Interface;