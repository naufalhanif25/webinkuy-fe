export function getDateTime (): string {
    const now = new Date();
    const pad = (currentDateTime: number) => currentDateTime.toString().padStart(2, "0");
    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1);
    const year = now.getFullYear();
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());

    return `${day}-${month}-${year} ${hours}:${minutes}`;
}