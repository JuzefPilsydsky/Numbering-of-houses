<template>
    <ul>
        <li v-for="build in buildNumbers" :class="[validateNumbers(build) ? 'correct': 'wrong']">{{build}}</li>
    </ul>
</template>

<script>
export default {
    props: {
        buildNumbers:[String],
        validateNumbers: Function,
    }
}
</script>