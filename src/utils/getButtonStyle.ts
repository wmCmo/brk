export default function getButtonStyle(primary: boolean) {
    return {
        className: 'rounded-xl drop-shadow-2xl px-4 py-2 text-white',
        style: { background: primary ? "#5EA500" : "#9F9FA9" }
    };
}
