<script setup lang="ts">
    import { RouterLink, useRoute } from 'vue-router';
    import useIssue from '../composables/useIssue';
    import IssueCard from '../components/issue-list/IssueCard.vue';
    import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';

    const route = useRoute()
    const { id = '' } = route.params

    const { issueQuery, issueCommentsQuery } = useIssue( +id )

</script>

<template>
    <RouterLink class="text-white" :to="`/`">
        Go Back
    </RouterLink>

    <!-- Header -->
    <LoaderSpinner 
        v-if="issueQuery.isLoading.value" 
        :thickness="1" 
        size="1.5rem" 
        :show-text="false" 
        color="white"    
    />

    <IssueCard v-else-if="issueQuery.data.value" :issue="issueQuery.data.value " />
    
    <p v-else>
        Issue with ID {{ id }} not found
    </p>

    <!-- Comments -->
    <LoaderSpinner 
        v-if="issueCommentsQuery.isLoading.value" 
        :thickness="1" 
        size="1.5rem" 
        :show-text="false" 
    />

    <div v-else-if="issueCommentsQuery.data.value" class="column">
        <span class="text-h3 q-mb-md">
            Comments ({{ issueCommentsQuery.data.value.length }})
        </span>

        <IssueCard 
            v-for="comment of issueCommentsQuery.data.value"
            :key="comment.id"
            :issue="comment"
        />
    </div>
</template>

<style scoped>

</style>