import Head from 'next/head'
import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { nanoid } from 'nanoid'

// no dotenv

const socket = io.connect('http://localhost:8000')


export default function Home() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [userId, setUserId] = useState('')

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const sendChat = (e) => {
    e.preventDefault()
    socket.emit('chat', { message, userId })
    setMessage('')
  }

  useEffect(() => {
    socket.on('chat', (payload) => {
      setChat([...chat, payload])
    })
  })

  useEffect(()=>{
    setUserId(nanoid(5))
  },[])

  return (
    <div>
      <Head>
        <title>ChatPod</title>
        <meta name="description" content="A private chatting application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex flex-col-reverse mx-auto font-mono">
        <div className="toast toast-top">
        {chat.map((item, index) => {
            return (
              <div className={`alert ${userId == item.userId ? "alert-success": "alert-info"}`} key={index}>
                <span>{item.message}</span>
                <span className="badge badge-warning">{item.userId}</span>
              </div>
            )
          })}
        </div>
        <form onSubmit={sendChat} className="text-left ml-10">
        <h1 className="title-font font-semibold text-3xl mb-5 underline">ChatPod</h1>
        <p>
            Your user id for this session is:
            <span className='badge badge-accent'>{userId}</span>
          </p>
          <input
            type="text"
            name="chatbox"
            id="chatbox"
            placeholder="Let's chat..."
            value={message}
            onChange={handleChange}
            className="input input-bordered input-primary w-full max-w-xs my-10"
          />
          <button type="submit" className="btn btn-sm btn-primary pl-2 ml-2">
            send
          </button>
        </form>
      </main>

      <footer className="text-center w-full p-3 border-t-2 font-light bg-black">
        <p>
          Developed by{' '}
          <a
            href="https://saditya9211.me"
            target="_blank"
            className="badge badge-success badge-outline"
          >
            saditya9211
          </a>
        </p>
      </footer>
    </div>
  )
}
