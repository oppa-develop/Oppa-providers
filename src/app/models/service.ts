export interface Service {

  service_id?: number
  category_id?: number
  title?: string
  super_category?: string
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
  
  id?: number
  name?: string
  type?: string
  categories_category_id?: number
}
