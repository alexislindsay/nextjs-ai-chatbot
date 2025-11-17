import React from 'react';
import Image from 'next/image';

export interface Product {
  name: string;
  description: string;
  link: string;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mt-4 max-w-sm mx-auto border border-gray-200 dark:border-gray-700">
      <div className="relative w-full h-48 mb-3 rounded-md overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
        {product.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
        {product.description}
      </p>
      <a
        href={product.link}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 block text-center font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        Get it now
      </a>
    </div>
  );
}
