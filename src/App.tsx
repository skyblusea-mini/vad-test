import React, { useEffect, useReducer, useState } from "react"
import ReactDOM from "react-dom"
import { useMicVAD, utils } from "@ricky0123/vad-react"
import axios from "axios"



export const aiClient = axios.create({
  baseURL: 'http://192.168.0.236:4201/',
  headers: {
    'Content-Type': 'application/json',
  },
})
const getRes = async (base64) => {

  const res = await aiClient.post('stt', {
    "audio_type": "wav",
    "base64_file": base64
  })
  console.log(res)
}


const App: React.FC = () => {

  const [base64, setBase64] = useState('')
  const [audioList, setAudioList] = useState([])
  const vad = useMicVAD({
    onSpeechEnd: (audio) => {

      const wavBuffer = utils.encodeWAV(audio)
      const base64 = utils.arrayBufferToBase64(wavBuffer)
      const url = `data:audio/wav;base64,${base64}`

      getRes(base64)

      setAudioList((old) => [url, ...old])
    },
  })




  return (
    <div>
      <button onClick={vad.toggle}>Toggle VAD</button>
      {vad.listening && <div>VAD is running</div>}
      {!vad.listening && <div>VAD is NOT running</div>}
      {vad.userSpeaking && <UserSpeaking />}
      {!vad.userSpeaking && <UserNotSpeaking />}
      <ol id="playlist">
        {audioList.map((audioURL) => {
          return (
            <li key={audioURL.substring(-10)}>
              <audio controls src={audioURL} />
            </li>
          )
        })}
      </ol>
    </div>
  )
}



export default App;

function UserSpeaking() {
  return <span style={{ color: "green" }}>user is speaking</span>
}

function UserNotSpeaking() {
  return <span style={{ color: "red" }}>user is not speaking</span>
}