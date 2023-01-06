export interface Product {
  _id: string
  id: string
  product_name: string
  product_price: string
  brand: string
  product_image_url: string
  product_info: string
  real_pdp_url: string
}

export interface User {
  _id?: string
  email: string
  password: string
  name?: string
  role?: "admin" | "user"
  createdAt?: Date
}
