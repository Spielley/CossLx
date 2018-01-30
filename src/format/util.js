export const LINE_BREAK = '\r\n';

export function formatDate(date) {
    return date.getFullYear() + '-' + pad0(date.getMonth() + 1) + '-' + pad0(date.getDate())
        + ' ' + pad0(date.getHours()) + ':' + pad0(date.getMinutes()) + ':' + pad0(date.getSeconds());
}

export function formatUtcDate(date) {
    return date.getUTCFullYear() + '-' + pad0(date.getUTCMonth() + 1) + '-' + pad0(date.getUTCDate())
        + ' ' + pad0(date.getUTCHours()) + ':' + pad0(date.getUTCMinutes()) + ':' + pad0(date.getUTCSeconds())
        + ' -0000';
}

function pad0(num) {
    return ('0' + num).slice(-2);
}