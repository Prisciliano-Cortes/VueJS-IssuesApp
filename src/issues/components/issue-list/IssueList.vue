<script setup lang="ts">
    import { Issue } from 'src/issues/interfaces/issue';
    import IssueCard from './IssueCard.vue'

    interface Props {
        issues: Issue[]
    }

    defineProps<Props>()

</script>

<template>
    <div class="row">
        <IssueCard 
            v-for="issue of issues" 
            :key="issue.id" 
            :issue="issue" 
        />
    </div>
</template>

<style scoped>

</style>