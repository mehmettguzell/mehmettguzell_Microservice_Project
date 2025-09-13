export default function LoadingSkeleton() {
    return ( 
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin mb-6"></div>           
        <p className="text-gray-700 text-lg font-medium animate-pulse">
            Loading, please wait...
        </p>
        <div className="mt-8 w-3/4 space-y-4">
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-2/3"></div>
        </div>
    </div>
    )};