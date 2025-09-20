"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center p-8 sm:p-20">
      <main className="relative flex flex-col gap-10 max-w-3xl w-full backdrop-blur-xl bg-white/30 shadow-2xl rounded-3xl p-10 sm:p-16 animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center sm:text-left text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-400 to-yellow-400 drop-shadow-lg">
          🚀 My First Microservice Project
        </h1>

        <ol className="list-decimal list-inside space-y-6 text-gray-700 text-base sm:text-lg">
          <li className="relative pl-6 hover:pl-8 transition-all duration-500 group">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 transform transition-transform duration-500 group-hover:scale-125"></span>
            Welcome to my first microservice project with Next.js 13!
          </li>

          <li className="relative pl-6 hover:pl-8 transition-all duration-500 group">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 transform transition-transform duration-500 group-hover:scale-125"></span>
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
