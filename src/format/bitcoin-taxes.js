import { LINE_BREAK, formatUtcDate } from './util';
import { isTrade } from '../filter';
import { exchangeSource } from '../core'

const data = ['Date,Action,Source,Symbol,Volume,Price,Currency,Fee,FeeCurrency'];

export default (transactions) => {
 
    const rowData = transactions.filter(isTrade).map(function (transaction) {
        return [
            formatUtcDate(transaction.occuredOn),
            transaction.type.toString().toUpperCase(),
            exchangeSource,
            transaction.baseCurrency,
            transaction.amount,
            transaction.price,
            transaction.quoteCurrency,
            transaction.fee,
            transaction.feeCurrency
        ].join(',');
    });

    return {
        data: data.concat(rowData).join(LINE_BREAK),
        mimeType: 'application/csv',
        extension: 'csv'
    };
}