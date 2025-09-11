export default async function Review({params}: 
    {
        params: 
        Promise<{productId: string, reviewId: string}>
    }
    ){
        
    const {productId, reviewId} = await params;
    return <h1>Review Details Page ProductId: {productId}, ReviewId {reviewId}</h1>;
}