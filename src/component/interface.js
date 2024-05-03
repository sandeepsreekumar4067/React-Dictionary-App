import { useEffect, useState } from 'react';
import '../style/interface.css'
import WordList from './wordlist';
const Interface = () => {
    const [data,setdata] = useState(null)
    const [path,setpath] = useState(null)
    const [word,setword] = useState('')
    const API = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
    const FetchData = () =>{
        fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+word)
        .then((response)=> {
            if(response.ok){
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
    const handleChange = (event) =>{
        setword(event.target.value)
    }
    return ( 
        <div className="interface">
            <div className="box">
               <div className="title">Dictionary</div>
               <div className="input-box">
                <input type="text" value={word} onChange={handleChange} placeholder='Enter the word to search'/>
               </div>
               <button onClick={FetchData}>Search</button>
               {path && <WordList path={path} />}
            </div>
        </div>
     );
}
 
export default Interface;