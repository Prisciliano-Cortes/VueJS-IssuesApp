<script setup lang="ts">
    import { ref } from 'vue';
    import useIssues from '../composables/useIssues';
    import IssueList from '../components/issue-list/IssueList.vue'
    import NewIssueDialog from '../components/NewIssueDialog.vue';
    import FloatingButtons from '../components/FloatingButtons.vue';
    import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
    import FilterSelector from '../components/filter-selector/FilterSelector.vue';
import useLabels from '../composables/useLabels';

    const { issuesQuery } = useIssues()
    const { labelsQuery } = useLabels()

    const isOpen = ref<boolean>(false)

    const openDialog = () => {
        isOpen.value = true
    }
</script>

<template>
    <div class="row q-mb-md">
        <div class="col-12">
            <span class="text-h4">GitHub Issues</span>
        </div>
    </div>

    <div class="row">
        <div class="col -xs-12 col-md-4">
            <!-- Filter Selector -->
            <FilterSelector />
        </div>

        <div class="col-xs-12 col-md-8">
            <!-- Loader -->
            <LoaderSpinner v-if="issuesQuery.isLoading.value" color="white" />

            <!-- IssueList -->
            <IssueList v-else :issues="issuesQuery.data?.value || []" />
        </div>
    </div>

    <!-- FloatingButtons -->
    <FloatingButtons 
        :buttons="[
            {
                icon: 'add',
                color: 'primary',
                size: 'lg',
                action: openDialog
            }
        ]" 
    />

    <!-- Dialog new Issue -->
    <NewIssueDialog
        v-if="labelsQuery.data"
        :isOpen="isOpen" 
        :labels="labelsQuery.data.value?.map( label => label.name ) || []" 
        @onClose="isOpen = false" 
    />
</template>

<style scoped>

</style>