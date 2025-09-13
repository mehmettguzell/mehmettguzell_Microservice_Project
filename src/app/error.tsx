"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";

export default function ErrorBoundary({error, reset}: {error: Error, reset: () => void}) {
    const router = useRouter();
    const reload = () => {
        startTransition(() => {
            router.refresh();
            reset();
        });
    };

    const homePage = () => {
        startTransition(() => {
            router.push("/");
        });
    };

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1 className="text-4xl sm:text-5xl font-bold text-center">
                    Something went wrong!
                </h1>
                <ul className="font-mono list-inside list-disc text-lg sm:text-xl text-center">
                    <li className="tracking-[-.01em]">
                        {error.message}
                    </li>
                </ul>
                <div className="flex gap-3 sm:gap-4 items-center flex-col sm:flex-row justify-center w-full">
                    <button 
                        onClick={reload}   
                        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-[158px]"
                    >
                        Try again
                    </button>
                    <button 
                        onClick={homePage} 
                        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-[158px]"
                    >
                        Home Page
                    </button>
                </div>
            </main>
        </div>
    );
}
