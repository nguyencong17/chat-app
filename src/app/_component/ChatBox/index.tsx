'use client'
import moment from 'moment'
import React, { Fragment, useEffect, useRef, useState } from 'react'

type ChatProps = {
  chatData: any
  handleSubmitMessage: (message: string) => void
}

const ChatBox: React.FC<ChatProps> = ({ chatData, handleSubmitMessage }) => {
  const messageEl = useRef(null);
  const [submitMessage, setsubmitMessage] = useState('');

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])
  
  const handleInput = (e: any) => {
    handleSubmitMessage(submitMessage);
    setsubmitMessage('');
  }

  return(
    <>
      <div className='relative h-full'>
        <div className='overflow-scroll max-h-full h-full pb-[65px]' id='chatbox' ref={messageEl}>
          {chatData.length > 0 && chatData.map((item: any) => {
            const {date, message} = item;
            return(
              <Fragment key={date}>
                <h1 className='text-center'>{date}</h1>
                {message.length > 0 && message.map((i:any, idx:any) => {
                  const formatTime = moment(i.timestamp).format('h:mmA');
                return (
                  <Fragment key={idx}>
                    <div className={`flex flex-col p-4 ${ i.sender === 'admin' ? 'items-end' : 'items-start' }`}>
                      <p className={`inline-block ${ i.sender === 'admin' ? 'bg-blue-500 text-white' : 'bg-slate-200' } w-auto py-2 px-4 rounded-md`}>{i.content}</p>
                    </div>
                    <p className={`flex flex-col ${ i.sender === 'admin' ? 'items-end pr-4' : 'items-start pl-4 chatdate' }`}>{formatTime}</p>
                  </Fragment>
                )})}
              </Fragment>
            )
          }) } 
        </div>
        <div className='absolute left-0 right-0 bottom-0 p-3 border-t bg-white'>
          <div className='flex justify-between gap-8'>
            <input
            id='inputmessage' 
            type="text"  
            className='text-dark flex-1 focus:border-0 focus:outline-none text-[13px]' 
            placeholder='Type your message' 
            value={submitMessage} 
            onChange={(e) => setsubmitMessage(e.target.value)}
            />
            <button className='bg-gray-100 px-4 py-2' onClick={(e) => handleInput(e)}>Submit</button>
          </div>
        </div>
      </div>
    </>
  )
};

export default ChatBox;