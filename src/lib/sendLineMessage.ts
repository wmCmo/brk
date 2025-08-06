export async function sendLineMessage(to: string, message: object) {
    const res = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, message })
    });
    return res.json();
}
