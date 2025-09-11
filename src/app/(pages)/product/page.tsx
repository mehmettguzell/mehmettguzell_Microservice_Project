import Link from "next/link";

export default function Product() {
    const productId = 100;
    return (
        <>
            <h1>Product Page</h1>
            <Link href="/">Home</Link>
            <h2>
                <Link href="/product/1">Product 1</Link>
            </h2>
            <h2>
                <Link href="/product/2">Product 2</Link>
            </h2>
            <h2>
                <Link href="/product/3" replace>Product 3</Link>
            </h2>
            <h2>
                <Link href={`/product/${productId}`}>Product {productId}</Link>
            </h2>
        </>
    );
}