<template>
    <div>{{data.name}}{{count}}</div>
</template>
<script>
import json from '../../../data/config.json'
export default {
    name: 'homeIndex',
    data () {
        return {
            data: json
        }
    },
    computed: {
        count () {
            return this.$store.state.count
        }
    }
}
</script>
<style scoped lang="scss">

</style>
