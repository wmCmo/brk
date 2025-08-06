export default function getButtonStyle(primary: boolean) {
    return {
        className: 'rounded-2xl drop-shadow-2xl px-4 py-2',
        style: { background: primary ? "#5EA500" : "#9F9FA9" }
    };
}
