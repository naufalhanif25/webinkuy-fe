export async function generateOrderId (): Promise<string> {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const timestamp = now.getFullYear().toString() + pad(now.getMonth() + 1) + pad(now.getDate()) + pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());
    const randomSalt = Math.random().toString(36).substring(2, 12);
    const rawString = `${timestamp}-${randomSalt}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(rawString);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((data) => data.toString(16).padStart(2, "0")).join("");

    return `INV-${hashHex.substring(0, 16).toUpperCase()}`;
}
