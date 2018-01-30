import { LINE_BREAK } from "./util";

const DATE_KEY = 'occuredOn';
const data = ['type,side,occuredOn,amount,fee,price,baseCurrency,quoteCurrency,total,feeCurrency,currency'];
const keys = data[0].split(',');

export default function (transactions) {

    const rowData = transactions.map((transaction) => {
        return keys.map((k) => {
            if (k === DATE_KEY) return transaction[k].toISOString();

            return transaction[k];
        }).join(',');
    });

    return {
        data: data.concat(rowData).join(LINE_BREAK),
        mimeType: 'application/csv',
        extension: 'csv'
    };
};