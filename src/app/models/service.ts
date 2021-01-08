export interface Service {

  id: number
  type: string
  name: string
  price: number
  description: string
  img: string
  serverId?: number
  serverName?: string
  serverRating?: number 
  serverImg?: string
  payment?: {
    date: Date,
    price: number,
    state: string
  }

}
