import { LINE_BREAK, formatDate } from './util';
import { TransactionType, exchangeSource } from '../core'

const data = ['Type,Buy,Cur.,Sell,Cur.,Fee,Cur.,Exchange,Group,Comment,Date'];

export default (transactions) => {
 
    const rowData = transactions.map(function (transaction) {
        
        const exportType = transaction.isTrade? 'Trade' : transaction.type === TransactionType.DEPOSIT? 'Deposit' : 'Withdrawal';
        const typeBasedData = transaction.isTrade? mapTrade(transaction) : mapTransfer(transaction);
        
        return [exportType]
            .concat(typeBasedData)
            .concat([
                exchangeSource,
                '',
                '',
                formatDate(transaction.occuredOn)
            ]).join(',');
    });

    return {
        data: data.concat(rowData).join(LINE_BREAK),
        mimeType: 'application/csv',
        extension: 'csv'
    };
}

function mapTrade(transaction) {
    return transaction.type === TransactionType.BUY?
        [
            transaction.amount,
            transaction.baseCurrency,
            transaction.total,
            transaction.quoteCurrency,
            transaction.fee,
            transaction.feeCurrency
        ] : [
            transaction.total,
            transaction.baseCurrency,
            transaction.amount,
            transaction.quoteCurrency,
            transaction.fee,
            transaction.feeCurrency
        ];
}

function mapTransfer(transaction) {

    return transaction.type === TransactionType.DEPOSIT? 
        [
            transaction.amount,
            transaction.currency,
            '',
            '',
            '',
            ''
        ] :
        [
            '',
            '',
            transaction.amount,
            transaction.currency,
            '',
            ''
        ];
}