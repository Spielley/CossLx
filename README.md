# COSS Ledger Export (CossLx)

Export your Cryptocurrency One Stop Shop (COSS) transactions in various formats from your browser's console: there's no such feature on https://coss.io yet so until they implement it then it might be useful to you.

# Usage

For now the library is meant to be used directly from the browser's console and I also haven't bothered creating a UI yet. Hopefully non-programmers will still figure it out!

1. Log into COSS
2. Press F12 to open the browser's dev tools
3. Copy-paste the snippet below into the console: this will load the library and perform the export.
```js
jQuery.getScript('https://github.com/plalx/CossLx/releases/download/v1.0.1-beta/browser-api.js').then(function () {
    const ft = CossLx.filter;
   
    //Set the export format
    const format = CossLx.format.coinTracking;

    //Set a filter, e.g. ft.occurredBetween('01 Apr 2017', '31 Mar 2018');
    const filter = ft.any;
 
    CossLx.exportLedger(format, filter);
});
```
4. Change the format & filter to something that suits your needs
5. Run the code and save/open the output file

# Known limitations

The deposits & withdrawals API doesn't return the withdrawal fees so these will not be accounted for at this time. Still, I'm planning on implementing an estimate of fees calculation based on the current fees table eventually.

# API overview
```js
CossLx.exportLedger(format, filter): Promise
```

## Export formats
Formats are just `function(transactions): { data: string, mimeType: string, extension: string}` functions which are responsible for transforming raw transactions into a consumer-specific format.

The current list of supported formats is quite minimal, but feel free to open an issue to request your favorite tracking's site format. 

### Currently supported formats: `CossLx.format.`
- Default (JSON): `defaultJson`
- Default (CSV): `defaultCsv`
- [BitcoinTaxes](https://bitcoin.tax/): `bitcoinTax`
- [CoinTracking](https://cointracking.info/): `coinTracking`

## Filters
Filters are `function(transaction): boolean` functions which can be used to constrain which transactions to output.

### Base filters: `CossLx.filter.`
- `any`
- `and(...filters)`
- `or(...filters)`
- `not(filter)`
- `isType(type: string)`
- `isTrade`
- `isTransfer`
- `occurredBetween(startDate, endDate)`

### Example of use
```js
const ft = CossLx.filter;

//DEPOSIT or BUY that occured between 01 Apr 2017 and 31 Mar 2018
const filter = ft.and(
	ft.or(ft.isType(CossLx.TransactionType.DEPOSIT), ft.isType(CossLx.TransactionType.BUY)),
	ft.occurredBetween('01 Apr 2017', '31 Mar 2018')
);

//Syntacic sugar for modern browsers
const { occuredBetween, isTrade } = CossLx.filter;

const filter = and(occuredBetween('01 Apr 2017', null), isTrade);

```
# Contribute
All contributions are welcome! Feel free to submit a pull request and let me know if you have questions.

# Donate
If this helped and you wish to donate:

- **ETH**: 0xF3aBD49e115781CFfB7DC17fA8fe40a9c175373A
- **COSS**: 0x197cd28fb43c7e39ca6689e547d314bf1a18e76d