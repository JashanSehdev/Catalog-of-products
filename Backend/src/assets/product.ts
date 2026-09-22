export type Product = {
    id : number,
    publisher_email : string
    product_name : string,
    description : string,
    img_url : string,
    price : number,
}

export type InputProduct = {
    publisher_email : string
    product_name : string,
    description : string,
    img_url : string,
    price : number
}


export const productData : Product[] = [
  {
    "id": 1,
    "publisher_email": "rahul.sharma@example.com",
    "product_name": "Sony WH-1000XM5",
    "description": "Premium wireless noise-cancelling headphones with excellent sound quality and long battery life.",
    "img_url": "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80",
    "price": 29999
  },
  {
    "id": 2,
    "publisher_email": "neha.verma@example.com",
    "product_name": "Apple MacBook Air M2",
    "description": "Lightweight and powerful laptop featuring Apple's M2 chip, ideal for work, coding, and everyday use.",
    "img_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqLYkLog61KjatSXKT7Wg6fCG31166Az7j_Fn0wsz6_Q&s=10",
    "price": 89999
  },
  {
    "id": 3,
    "publisher_email": "arjun.mehta@example.com",
    "product_name": "Nike Air Max 270",
    "description": "Comfortable lifestyle sneakers with a modern design and responsive cushioning for everyday wear.",
    "img_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    "price": 12999
  }
]