'use client'
import useStore from '@/app/store';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import classes from './style.module.css';
import { useRouter } from 'next/router';

type ChatRooms = {
  id: string
  name: string
  status: string
  media: string
}

type ChatRoomProps = {
  chatrooms: ChatRooms[]
  handleLoadChatData: (id: any) => void
}
const ChatRoom: React.FC<ChatRoomProps> = ({ chatrooms, handleLoadChatData }) => {
  const lastMessage = useStore((state: any)  => state.lastMessage)
  const [activeLink, setActiveLink] = useState(''); 

  function handleClick(id: any) {
    setActiveLink(id)
    handleLoadChatData(id)
  }
  return(
    <>
      <div className='flex flex-col h-full max-h-full overflow-scroll'>
        {chatrooms && chatrooms.map((item,index) => {
          const {id, name, status, media} = item;
          return(
            <Fragment key={index}>
              <Link 
                href={{ pathname: 'chat', query: {chatid: id}}} className={`${activeLink === id ? `${classes.active}` : ''} flex gap-4 items-center cursor-pointer p-4 id-${id} relative`} 
                onClick={() => handleClick(id)}
              >
                <div className='inline-block rounded-full relative'>
                  <Image src={media} alt='Image' width={32} height={32} className='rounded-full'/>
                  <div className={`inline-block w-[11px] h-[11px] border-2 border-white absolute right-[-4px] bottom-0 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                </div>
                <div>
                  <h6 className='h6'>{name}</h6>
                  <p className=''>{lastMessage}</p>
                </div>
              </Link>
            </Fragment>
          )
        })}
      </div>
    </>
  )
};

export default ChatRoom;
