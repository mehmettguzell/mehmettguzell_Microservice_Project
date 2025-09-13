import { get } from 'http';
import {fetcher} from '../lib/fetcher';
import {Inventory} from '../types/index';

const BASE = process.env.INVENTORY_SERVICE_URL;

export const addInventory = (Inventory:Omit<Inventory, 'id'>) => fetcher<Inventory>(`${BASE}`, {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify(Inventory),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getAllInventory = () => fetcher<Inventory[]>(`${BASE}/all`, {cache:'no-store'});

export const getInventoryBySkuCode = (skuCode: string) => fetcher<Inventory>(`${BASE}/${skuCode}`, {cache: 'no-store',});

export const isSkuCodeValid = (skuCode: string) => fetcher<boolean>(`${BASE}/validate?skuCode=${skuCode}`, {cache:'no-store'});

export const isInStock = (skuCode:string, quantity:number) => fetcher<boolean>(`${BASE}/validate?skuCode=${skuCode}&quantity=${quantity}`, {cache:'no-store'});

export const addStock = (id: number, quantity: number) =>
  fetcher<Inventory>(`${BASE}/addStock/${id}`, {
    cache: 'no-store',
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  });


export const setQuantityZeroBySkuCode = (skuCode: string) => fetcher<Inventory>(`${BASE}?skuCode=${skuCode}`, {cache:'no-store', method:'DELETE' })

export const setQuantityZeroById = (id:number) => fetcher<Inventory>(`${BASE}?id=${id}`, {cache:'no-store', method:'DELETE' })
