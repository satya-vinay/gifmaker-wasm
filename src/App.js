import './App.css';
import  { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import { useEffect, useState } from 'react';
import FileInput from './components/FileInput';
import Header from './components/Header'; 
const ffmpeg = createFFmpeg({log:true});
function App() {
  const [ready, setReady] = useState(false)
  const [video,setVideo] = useState();
  const [gif,setGif] = useState()
  const load = async()=>{
    await ffmpeg.load();
    setReady(true);
  }
  useEffect(()=>{
    load();
  },[])

  // Refrence: https://github.com/ffmpegwasm/ffmpeg.wasm/blob/master/docs/api.md
  const convertToGif = async ()=>{
    ffmpeg.FS('writeFile','test.mp4',await fetchFile(video))

    //Run the FFMpeg cmd
    await ffmpeg.run('-i','test.mp4','-t','2.5','-ss','2.0','-f','gif','out.gif')

    const data = ffmpeg.FS('readFile','out.gif');

    const url = URL.createObjectURL(new Blob([data.buffer],{type:'image/gif'}))
    setGif(url)
  }

  return ready?(
    <div className="App"> 
      <Header/>
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      {video && <video controls width="250" src={URL.createObjectURL(video)}></video>}
     <input type="file" onChange={(e)=>setVideo(e.target.files?.item(0))} className="m-2 self-center"/>
{/* <FileInput/> */}
     <h3> Result:</h3>
     <button class="convert bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={convertToGif}>Convert</button>
     {gif && <img src={gif} className="m-2"/>}
    </div>
    </div>
  ):(<p>Loading....</p>)
  
}

export default App;
