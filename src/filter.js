export function isTrade(transaction) {
    return transaction.isTrade;
}

export function isTransfer(transaction) {
    return transaction.isTransfer;
}

export function and(...filters) {
    return (transaction) => filters.every(filter => filter(transaction));
}

export function isType(type) {
    return (transaction) => transaction.type === type;
}

export function not(filter) {
    return (transaction) => !filter(transaction);
}

export function or(...filters) {    
    return (transaction) => filters.some(filter => filter(transaction));
}

export function occurredBetween(start, end) {
    return (transaction) => {
        const occuredOn = transaction.occuredOn;

        return (!start || occuredOn >= new Date(start)) && (!end || occuredOn <= new Date(end));
    };
}

export function any() {
    return true;
}
