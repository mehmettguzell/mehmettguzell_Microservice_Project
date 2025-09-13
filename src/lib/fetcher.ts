export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
    const res  = await fetch(url, {credentials: 'include', ...options});
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
        const message = data?.message || data?.error || text || res.statusText;
        const err = new Error(message);
        (err as any).status = res.status;
        throw err;
    }
    return data as T;
}