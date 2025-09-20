"use client";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-pink-100 to-yellow-100 flex items-center justify-center p-8 sm:p-20">
      <main className="relative flex flex-col gap-10 max-w-3xl w-full backdrop-blur-lg bg-white/30 shadow-2xl rounded-3xl p-10 sm:p-16 animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-800 via-sky-600 to-sky-400 mb-6 text-center sm:text-left">
          🚀 My First Microservice Project
        </h1>
        <ol className="list-decimal list-inside space-y-6 text-gray-700 text-base sm:text-lg">
          <li className="relative pl-4 hover:pl-6 transition-all duration-500 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500">
            Welcome to my first microservice project with Next.js 13!
          </li>
          <li className="relative pl-4 hover:pl-6 transition-all duration-500 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500">
            This project is a simple e-commerce application that demonstrates
            the use of Next.js 13 features such as server components, API
            routes, and more.
          </li>
        </ol>
      </main>
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
