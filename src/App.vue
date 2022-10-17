<template>
    <div class="app">
        <h1><strong>Test task</strong></h1>
        <hr>
        <div class="input-group">
            <input type="text" class="form-control" v-model="number" placeholder="Введіть номер будинку">
            <span class="input-group-btn">
                <Btn type="primary" v-on:click="validateClientNumber">Перевірити</Btn>
            </span>
        </div>
    </div>
    <BuildNumbers :buildNumbers="currentItems" :validateNumbers="validateNumbers" />
    <Pagination v-model="currentPage" :total-page="totalPage" />
</template>

<script>
import BuildNumbers from './BuildNumbers.vue';
import { Pagination } from 'uiv';
import { Btn } from 'uiv';

export default {
    data() {
        return {
            number: '',
            currentPage: 1,
            buildNumbers: [],
        }
    },

    mounted() {
        fetch('/buildingNumbers.txt').then(data => data.text()).then(data => this.buildNumbers = data.split('\n')).catch(console.error)
    },
    computed: {
        currentItems() {
            const lastIndex = this.currentPage * 1000;
            return this.buildNumbers.slice(lastIndex - 1000, lastIndex)
        },

        totalPage() {
            return Math.round(this.buildNumbers.length / 1000)
        },
    },

    components: {
        BuildNumbers,
        Pagination,
        Btn,
    },

    methods: {
        validateClientNumber() {
            if (this.validateNumbers(this.number)) {
                return alert('Number is valid');
            } else {
                return alert('Number is invalid');
            }
        },

        validateNumbers(number) {
            return number == number.match(/[0-9]{0,3}[\/,-][0-9]{0,3}\d/) || number == number.match(/[0-9]{0,3}[а-я][\/,-][0-9]{0,3}\d/);
        },


    },


}

</script>

<style>
.input {
    width: 30%;
    height: inherit;
    border: 1px solid black;
    padding: 10px 15px;
}

.app {
    padding: 20px;
}


.correct {
    text-decoration: underline green;
}

.wrong {
    text-decoration: underline red;
}
</style>
