// Types & Interfaces Imports
import { ProductDataProps } from '@/types/product';

export const mockProduct = {
  id: 123,
  title: 'Test Product',
  description: 'This is a test product description',
  price: 99.99,
  images: ['/test-image.jpg'],
  rating: 4.5,
};

// Product without rating for specific tests
export const mockProductWithoutRating = {
  ...mockProduct,
  rating: undefined,
};

export const mockProducts: ProductDataProps[] = [
  {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    description:
      'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
    price: 9.99,
    images: [
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png',
    ],
    rating: 4.94,
  },
  {
    id: 2,
    title: 'Eyeshadow Palette with Mirror',
    description:
      "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    price: 19.99,
    images: [
      'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png',
    ],
    rating: 3.28,
  },
  {
    id: 3,
    title: 'Powder Canister',
    description:
      'The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.',
    price: 14.99,
    images: ['https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png'],
    rating: 3.82,
  },
  {
    id: 4,
    title: 'Red Lipstick',
    description:
      'The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.',
    price: 12.99,
    images: ['https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png'],
    rating: 2.51,
  },
  {
    id: 5,
    title: 'Red Nail Polish',
    description:
      'The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.',
    price: 8.99,
    images: ['https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/1.png'],
    rating: 3.91,
  },
  {
    id: 6,
    title: 'Calvin Klein CK One',
    description:
      "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
    price: 49.99,
    images: [
      'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/1.png',
      'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/2.png',
      'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/3.png',
    ],
    rating: 4.85,
  },
  {
    id: 7,
    title: 'Chanel Coco Noir Eau De',
    description:
      'Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.',
    price: 129.99,
    images: [
      'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/1.png',
      'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/2.png',
      'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/3.png',
    ],
    rating: 2.76,
  },
  {
    id: 8,
    title: "Dior J'adore",
    description:
      "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
    price: 89.99,
    images: [
      "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/1.png",
      "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/2.png",
      "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/3.png",
    ],
    rating: 3.31,
  },
  {
    id: 9,
    title: 'Dolce Shine Eau de',
    description:
      "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
    price: 69.99,
    images: [
      'https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/1.png',
      'https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/2.png',
      'https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/3.png',
    ],
    rating: 2.68,
  },
  {
    id: 10,
    title: 'Gucci Bloom Eau de',
    description:
      "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
    price: 79.99,
    images: [
      'https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/1.png',
      'https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/2.png',
      'https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/3.png',
    ],
    rating: 2.69,
  },
];
