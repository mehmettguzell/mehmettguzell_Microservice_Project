"use client";

export default function ErrorBoundary({error}: {error: Error}) {
    return <div>Something went wrong: {error.message}</div>;
}
