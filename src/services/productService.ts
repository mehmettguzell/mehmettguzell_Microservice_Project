import {fetcher} from '../lib/fetcher';
import {Product} from '../types/index';

const BASE =
  process.env.NODE_ENV === 'test'
    ? 'http://localhost:9000/api/product'
    : '/api/product';

export const createProduct = (product:Omit<Product,'id'>) => fetcher<Product>(`${BASE}`, {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
        'Content-Type': 'application/json',
        }
});

export const getAllProducts = () => fetcher<Product[]>(`${BASE}/all`, { cache: 'no-store' });

export const getProductById = (id: string) => fetcher<Product>(`${BASE}/${id}`, { cache: 'no-store' });

export const searchProductsByName = (name: string) => fetcher<Product[]>(`${BASE}/search?name=${name}`, { cache: 'no-store' });

export const getProductsByCategory = (category: string) => fetcher<Product[]>(`${BASE}/category?category=${category}`, { cache: 'no-store' });

export const updateProduct = (id: string, product: Partial<Omit<Product, 'id'>>) => fetcher<Product>(`${BASE}/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
    headers: {
        'Content-Type': 'application/json',
    }
});

export const deleteProduct = (id: string) => fetcher<{ message: string }>(`${BASE}?id=${id}`, {cache: 'no-store',method: 'DELETE',});