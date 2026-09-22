export type Product = {
    id : number,
    product_name : string,
    description : string,
    Image : string,
    price : string,
}

export type InputProduct = {
    product_name : string,
    description : string,
    Image : string,
    price : string
}


export const productData : Product[] = [
    {
    id: 1,
    product_name: "MacBook Air M3",
    Image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    description: "Lightweight Apple laptop with the M3 chip, Retina display, and excellent battery life.",
    price: "99999"
  },
  {
    id: 2,
    product_name: "Sony WH-1000XM5",
    Image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
    description: "Premium wireless headphones with active noise cancellation and high-quality sound.",
    price: "29999"
  },
  {
    id: 3,
    product_name: "iPhone 15 Pro",
    Image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
    description: "Powerful smartphone featuring a titanium design, advanced camera system, and A17 Pro chip.",
    price: "119999"
  },
]