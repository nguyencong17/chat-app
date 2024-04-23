import moment from "moment";
import generateRandomSentence from "../(pages)/chat/bot";

export const fetchUserLogin = async () => {
  const user = await fetch('http://localhost:8000/users');
  if (!user.ok) {
    throw new Error('failed to fetch api');
  }
  return user.json(); // Parse JSON response
}

export const fetchSidebar = async () => {
  const sidebar = await fetch('http://localhost:8000/sidebar');
  if (!sidebar.ok) {
    throw new Error('failed to fetch api');
  }
  return sidebar.json(); // Parse JSON response
}

export const fetchChatRoom = async () => {
  const chatrooms = await fetch('http://localhost:8000/chatrooms');
  if (!chatrooms.ok) {
    throw new Error('failed to fetch api');
  }
  return chatrooms.json(); // Parse JSON response
}

export const fetchChatting = async () => {
  const chatrooms = await fetch('http://localhost:8000/chattings');
  if (!chatrooms.ok) {
    throw new Error('failed to fetch api');
  }
  return chatrooms.json(); // Parse JSON response
}

// capitalizeFirstLetter
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}

export const pushInputMessage = async (roomID: string, message: string) => {

  // Lấy thời gian hiện tại
  const currentDate = moment();
  // Chuyển đổi sang múi giờ cục bộ
  const localTime = currentDate.local();
  // Định dạng thời gian cục bộ
  const formattedLocalTime = localTime.format('YYYY-MM-DDTHH:mm:ss');

  // submit message 
  const submitmessage = {
    "id": `${roomID}-${formattedLocalTime}`,
    "sender": "admin",
    "receiver": `${roomID}`,
    "timestamp": `${formattedLocalTime}`,
    "content": `${message}`
  }

  // request send a message
  const requestSend = await fetch('http://localhost:8000/chattings', {
    method: 'POST',
    body: JSON.stringify(submitmessage),
    headers: {
      'Content-Type': 'application/json'
    },
  })

  const dataSend = await requestSend.json();
  return dataSend;
}

export const pushBotMessage = async (roomID: string, message: string) => {

  // Lấy thời gian hiện tại
  const currentDate = moment();
  // Chuyển đổi sang múi giờ cục bộ
  const localTime = currentDate.local();
  // Định dạng thời gian cục bộ
  const formattedLocalTime = localTime.format('YYYY-MM-DDTHH:mm:ss');

    // bot generate message
    const bot = generateRandomSentence(5);
    const botAI = capitalizeFirstLetter(bot)
    const botMessage = {
      "id": `bot${roomID}${formattedLocalTime}`,
      "sender": `${roomID}`,
      "receiver": 'admin',
      "timestamp": `${formattedLocalTime}`,
      "content": `${botAI}`
    }
    // Repuest generate message from bot
    const requestBot = await fetch('http://localhost:8000/chattings', {
      method: 'POST',
      body: JSON.stringify(botMessage),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const dataBot = await requestBot.json()
    
  return dataBot;
}