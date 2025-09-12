"use client";

import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productService";
import { Product } from "@/types";

export default function TestProducts() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getAllProducts()
        .then(setProducts)
        .catch(console.error);
    }, []);

    return (
        <div>
            {products.map(p => (
                <div key={p.id}>{p.name}</div>
            ))}
        </div>
    )
}