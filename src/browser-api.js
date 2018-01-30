import { saveAs } from 'file-saver';
import { TransactionType, TradeSide, ExportService, Transaction } from './core';
import * as filter from './filter';
import * as format from './format';

const BUY_ORDER_DIRECTION = 'B';
const NO_LIMIT = 999999;
const MARKET_SIDE = 'market-side';

const LedgerService = (function () {
    return class LedgerService {
        transactions() {
            return Promise.all([trades.call(this), transfers.call(this)]).then((responses) => {
                return responses[0].concat(responses[1]);
            });
        }
    }

    function trades() {
        return fetch('https://profile.coss.io/api/user/history/exchange?limit=' + NO_LIMIT + '&offset=0', {
            credentials: 'same-origin'
        })
        .then(throwOnHttpError)
        .then(function (response) {
            return response.json().then(function (response) {
                return response.payload.actions.items.map(transactionFromRawTrade);
            })
        });
    }

    function throwOnHttpError(response) {
        if (!response.ok) throw new Error(response.status + ': ' + response.statusText);
    
        return response;
    }
    
    function transactionFromRawTrade(trade) {
        return new Transaction({
            type: trade.order_direction === BUY_ORDER_DIRECTION? TransactionType.BUY : TransactionType.SELL,
            side: trade.side === MARKET_SIDE? TradeSide.MARKET : TradeSide.LIMIT,
            occuredOn: new Date(trade.created_at),
            baseCurrency: trade.from_code,
            quoteCurrency: trade.to_code,
            amount: trade.amount,
            price: trade.price,
            fee: trade.transaction_fee_total,
            total: trade.total
        });
    }
    
    function transfers() {
        return fetch('https://profile.coss.io/api/user/history/deposits-and-withdrawals?limit=' + NO_LIMIT + '&offset=0', {
            credentials: 'same-origin'
        })
        .then(throwOnHttpError)
        .then(function (response) {
            return response.json().then(function (response) {
                return response.payload.items.map(transactionFromRawTransfer);
            })
        });
    }

    function transactionFromRawTransfer(transfer) {
        return new Transaction({
            type: TransactionType[transfer.type_code.toUpperCase()],
            occuredOn: new Date(transfer.created_at),
            currency: transfer.currency_code,
            amount: transfer.amount
        });
    }
})();

const exportService = new ExportService(new LedgerService(), saveAs);

export function exportLedger(format, filter) {
     return exportService.exportLedger(format, filter);
}
    
export {
    filter, 
    format, 
    TransactionType, 
    TradeSide 
};
