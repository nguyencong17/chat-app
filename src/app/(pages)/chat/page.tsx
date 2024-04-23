import { fetchChatRoom, fetchChatting } from "@/app/_api/routes";
import Chat from "./Chat";


export default async function ChatPage() {
  let chatrooms;
  try {
    chatrooms = await fetchChatRoom();
  } catch (error) {
    console.log('Filed to fetch chat rooms', error);
  }

  return(
    <>
      <Chat chatrooms={chatrooms}/>
    </>
  )
};
