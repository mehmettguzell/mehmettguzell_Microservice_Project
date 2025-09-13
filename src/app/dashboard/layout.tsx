export default function DashboardLayout({ 
    children,
    product,
    addProduct,
}: { 
    children: React.ReactNode,
    product: React.ReactNode,
    addProduct: React.ReactNode
}) {
    return (
        <div>
            <div>{children}</div>
            <div style={{ display: 'flex', flex: 1 }}>{product}</div>
            <div style={{ display: 'flex', flex: 1 }}>{addProduct}</div>
        </div>
    );
}