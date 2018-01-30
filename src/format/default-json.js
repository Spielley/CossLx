export default function (transactions) {
    return {
        data: JSON.stringify(transactions),
        mimeType: 'application/json',
        extension: 'json'
    };
};