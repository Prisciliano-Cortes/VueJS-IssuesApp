<script setup lang="ts">
    import { useIssuesStore } from '../../../stores/issues';

    const issueStore = useIssuesStore()
</script>

<template>
    <q-btn-toggle
        v-model="issueStore.state"
        push
        glossy
        toggle-color="primary"
        :options="[
            {label: 'All', value: ''},
            {label: 'Open', value: 'open'},
            {label: 'Closed', value: 'closed'}
        ]"
    />
</template>

<style scoped>

</style>