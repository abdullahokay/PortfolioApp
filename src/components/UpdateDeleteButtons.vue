<template>
    <div id="Buttons">
        <v-btn x-small color="#768DDE" @click="updateCoinCountInPortfolio()">
            <v-icon>
                mdi-update
            </v-icon>
        </v-btn>
        <v-btn x-small color="#FF1C1C" @click="deleteCoinFromPortfolio()" class="ml-7">
            <v-icon>
                mdi-delete
            </v-icon>
        </v-btn>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: {
        selectedCoin: [],
        count: {
            type: Number,
            default: 1
        }
    },

    name: 'UpdateDeleteButtons',

    methods: {
        ...mapActions(['deleteCoinFromPortfolio']),
        ...mapActions(['saveCoinToPortfolio']),

        updateCoinCountInPortfolio() {
            if (this.count > this.countOfCoin) {
                this.$store.dispatch('saveCoinToPortfolio', { data: this.selectedCoin, count: this.count - this.countOfCoin })
            }

            else if (this.count < this.countOfCoin) {
                this.$store.dispatch('deleteCoinFromPortfolio', { data: this.selectedCoin, count: this.countOfCoin - this.count })
            }

            else {
                return 1;
            }
        },
        
        deleteCoinFromPortfolio() {
            this.$store.dispatch('deleteCoinFromPortfolio', { data: this.selectedCoin, count: this.count })
        }
    },

    computed: {
        countOfCoin() {
            return this.$store.state.portfolio.filter(coin => coin === this.selectedCoin).length
        }
    }
}
</script>