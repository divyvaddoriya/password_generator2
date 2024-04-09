import { useState ,useCallback,useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const  [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
const [password,setpassword]=useState('')
const passwordRef=useRef(null);
const passwordGenerator= useCallback(()=>{
  let pass='';
  let str='QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
  if(numberAllowed) str+='1234567890'
  if(charAllowed) str+='!@#$%^&*()'
  let len=str.length;
  for(let i=0;i<length;i++){
    pass+=str.charAt(Math.floor(Math.random()*len+1))
  }
  setpassword(pass);
} ,[length,numberAllowed,charAllowed] );

useEffect(()=>{
passwordGenerator();
},[length,numberAllowed,charAllowed])

const copyPasswordToClipboard=()=>{
  window.navigator.clipboard.writeText(password);
  passwordRef.current?.select()
}
  return (
 <>
<div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500  '>
  <h1 className='text-white my-3 text-center'>password generator</h1>
  <div className='flex shadow rounded-lg overflow-hidden mb-4'> 
    <input
     type="text" 
     value={password}
     className='outline-none w-full py-1 px-3'
     placeholder='password'
     readOnly
     ref={passwordRef}
     />
     <button
     onClick={copyPasswordToClipboard}
     className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
     >copy</button>
  </div>
  <div
  className='flex text-sm gap-x-2'
  >
    <div className='flex items-center gap-x-1 '>
      <input type="range"
      min={6}
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={(e)=>setlength(e.target.value)}
      name=''
      id=''
        />
        <label htmlFor="length">length : {length}</label>
    <div className='flex items-center gap-x-1 '>
      <input type="checkbox"
      name=''
      defaultChecked={numberAllowed}
      onChange={()=>setnumberAllowed((prev)=>!prev)}
      />
      <label htmlFor="number">Numbers</label>
      <input type="checkbox"
      name=''
      defaultChecked={charAllowed}
      onChange={()=>setcharAllowed((prev)=>!prev)}
      />
      <label htmlFor="character">character</label>
    </div>
  </div>
</div>
</div>
 </>  
  )
}

export default App
