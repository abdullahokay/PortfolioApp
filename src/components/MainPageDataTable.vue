<template ref="mainPageDataTable">
    <div>
        <v-data-table :headers="dataTableHeaders" :items="uniqueSymbols" :items-per-page="5" class="elevation-1">
            <template v-slot:body="{ items }">
                <tbody>
                    <tr v-for="coin in items" :key="coin.symbol">
                        <td>{{ $store.state.portfolio.find(p => p.symbol === coin).symbol }}</td>
                        <td>{{ $store.state.portfolio.find(p => p.symbol === coin).lastPrice }}</td>
                        <td>{{ $store.state.portfolio.find(p => p.symbol === coin).weightedAvgPrice }}</td>
                        <td>{{ symbolCount[coin] }}</td>
                    </tr>
                </tbody>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    name: 'DataTable',

    data: () => ({
        dataTableHeaders: [
            { text: 'Kripto Paralar', align: 'start', sortable: true, value: 'symbol' },
            { text: 'Son Fiyat', value: 'lastPrice', sortable: true},
            { text: 'Ağırlıklı Ortalama Fiyat', sortable: true,value: 'weightedAvgPrice' },
            { text: "Adet", value: "count" },
        ],
    }),

    computed: {
        symbolCount() {
            let count = []
            this.$store.state.portfolio.forEach(coin => {
                if (this.uniqueSymbols.findIndex(s => s === coin.symbol) >= 0) {
                    count[coin.symbol] = count[coin.symbol] ? count[coin.symbol] + 1 : 1;
                }
            });
            return count;
        },

        uniqueSymbols() {
            let symbols = []
            this.$store.state.portfolio.forEach(coin => {
                if (symbols.findIndex(s => s === coin.symbol) < 0) {
                    symbols.push(coin.symbol)
                }
            })
            return symbols
        }
    },
}
</script>