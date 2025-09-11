import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Product ${params.id}`,
    description: `Details about product ${params.id}`,
  };
}


export default async function ProductDetails({params}: {params: Promise<{productId: string}>}) {

    const productId = (await params).productId;
    return <h1>Product Details Page {productId}</h1>;
}