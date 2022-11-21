import './App.css';
import  { createFFmpeg } from '@ffmpeg/ffmpeg'
import { useEffect, useState } from 'react';
const ffmpeg = createFFmpeg({log:true});
function App() {
  const [ready, setReady] = useState(false)
  const load = async()=>{
    await ffmpeg.load();
    setReady(true);
  }
  useEffect(()=>{
    console.log("ready",ready)
    load();
  },[])
  return (
    <div className="App">
     
    </div>
  );
}

export default App;
