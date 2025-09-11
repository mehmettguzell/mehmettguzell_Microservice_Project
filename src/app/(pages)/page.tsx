import Link from "next/link";

export default function Home() {
    return (
        <>
            <h1>Home Page</h1>
            <Link href="/product">Products</Link>
            <Link href="/order">Orders</Link>
            <Link href="/inventory">Inventorys</Link>
        </>
    );
}