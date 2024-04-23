export interface User {
  id: string
  name: string
  media: string
}

export interface Menu {
  id: number
  media: string
  title: string
  link: string
  subnav: 
  {
    id: number
    navitem: string
  }[]
}

export interface ChatData {
  id: string
  type: string
  content: string
  sender: string
  receiver: string
  timestamp: string
}