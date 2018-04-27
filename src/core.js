import { any as anyFilter } from './filter';
import { defaultJson } from './format'; 

export let exchangeSource = 'COSS';
export const TransactionType = Object.freeze({
    BUY:   'buy',
    SELL:  'sell',
    DEPOSIT: 'deposit',
    WITHDRAWAL: 'withdrawal'
});
export const TradeSide = Object.freeze({
    MARKET: 'market',
    LIMIT: 'limit' 
});

export class Transaction {
    constructor(data) {
        this.type = data.type;
        this.side = data.side;
        this.occuredOn = data.occuredOn;
        this.amount = data.amount;
        this.fee = data.fee || 0;

        if (this.isTrade) {
            this.side = data.side;
            this.price = data.price;
            this.baseCurrency = data.baseCurrency;
            this.quoteCurrency = data.quoteCurrency;
            this.total = data.total;
            this.feeCurrency = this.quoteCurrency;
        } else {
            this.currency = data.currency;
        }

        Object.freeze(this);
    }

    get isTrade() {
        return this.type === TransactionType.BUY || this.type === TransactionType.SELL;
    }

    get isTransfer() {
        return !this.isTrade;
    }
}

export class ExportService {
    constructor(ledgerService, saveFile) {
        this._ledgerService = ledgerService;
        this._saveFile = saveFile;
    }

    exportLedger(format, filter) {
        format = format || defaultJson;
        filter = filter || anyFilter;

        return this._ledgerService.transactions().then((transactions) => {
            const formatted = format(transactions.filter(filter));
            const blob = new Blob([formatted.data], {
                type: formatted.mimeType
            });

            this._saveFile(blob, 'transactions.' + formatted.extension);
        });
    }
}
