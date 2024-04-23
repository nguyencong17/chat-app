'use client'
import ChatBox from "@/app/_component/ChatBox";
import ChatRoom from "@/app/_component/ChatRoom"
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react"
import { pushBotMessage, pushInputMessage } from "@/app/_api/routes";
import moment from "moment";

const Chat = (props: any) => {
  const chatrooms = props.chatrooms;

  const [chatHistory, setChatHistory] = useState([]);
  const [chatData, setChatData] = useState({});
  const [chatId,setChatId] = useState('0');
  const chatParams = useSearchParams();
  const roomID = chatParams.get('chatid') || '';
  // const [date, setDate] = useState([]);

  async function getChattings() {
    try {
      const chatresult = await fetch('http://localhost:8000/chattings');
      if (!chatresult.ok) {
        throw new Error('failed to fetch api');
      }
      const result = await chatresult.json(); // Parse JSON response

      setChatHistory(result);
    } catch (error) {
      console.error(error);
    }
  }

  function getParams() {
    setChatId(roomID);
  }

  useEffect(() => {
    getChattings()
  },[])
  
  useEffect(() => {
    getParams()
  },[roomID])

  function filterMessage (filterList: any) {
    // Tạo một đối tượng để lưu trữ tin nhắn theo ngày
    const messagesByDate = {};

    // Phân loại các tin nhắn đã lọc thành các ngày
    filterList.forEach((message: any) => {
      // Lấy timestamp của tin nhắn
      const timestamp = moment(message.timestamp);
      // Lấy ngày gửi của tin nhắn (không tính giờ, phút, giây)
      const date = timestamp.startOf('day').format('YYYY-MM-DD');
      // Nếu ngày này chưa có trong đối tượng messagesByDate, tạo một mảng mới
      if (!messagesByDate[date]) {
          messagesByDate[date] = [];
      }
      
      // Thêm tin nhắn vào mảng tương ứng với ngày gửi
      messagesByDate[date].push(message);
    });

    // Convert thành mảng 
    const ouput = Object.keys(messagesByDate).map(date => ({
      date,
      message: messagesByDate[date]
    }));

    return ouput;
  }

  function handleLoadChatData(itemchooseID: string){
  // Lọc các tin nhắn giữa các user và admin
  const filterList = chatHistory.filter(
    ((item: any) => 
        item.receiver == itemchooseID && item.sender == 'admin' ||
        item.receiver == 'admin' && item.sender == itemchooseID 
    ));
    const dataFilter = filterMessage(filterList);
    // buildChunk
    setChatData(dataFilter);
  }

  async function handleSubmitMessage(message: string) {

    // // Check Typing Message
    if(message === '') return;

    const dataSend = await pushInputMessage(roomID, message);
    const dataBot = await pushBotMessage(roomID, message);

    let updatedChatHistory = chatHistory.concat(dataSend);
    updatedChatHistory = updatedChatHistory.concat(dataBot);
    setChatHistory(updatedChatHistory);
    // Filter Data and Render New Data
    const updateFilterList = updatedChatHistory.filter(
      ((item: any) => 
       item.receiver == chatId && 
       item.sender == 'admin' || 
       item.receiver == 'admin' && 
       item.sender == chatId
      ));
      console.log("Filter List", updateFilterList);
    const newData = filterMessage(updateFilterList);
    console.log(newData);
    setChatData(newData);

    console.log('Submit success, Done!');
  }
  
  return(
    <div className="flex max-h-full h-full">
    <div className="w-[350px] border-r border-gray-200 h-full">
      <ChatRoom chatrooms={chatrooms} handleLoadChatData={handleLoadChatData}/>
    </div>
    
    <div className="flex-1">
      <ChatBox chatData={chatData} handleSubmitMessage={handleSubmitMessage}/>
    </div>
  </div>
  )

}

export default Chat;