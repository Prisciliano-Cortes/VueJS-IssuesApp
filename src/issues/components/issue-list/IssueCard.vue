<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import VueMarkdown from 'vue-markdown-render'
    import { Issue, State } from '../../interfaces/issue';
    import { timeSince } from '../../../shared/helpers/time-since';
    import useIssue from '../../composables/useIssue';

    interface Props {
        issue: Issue
    }

    const props = defineProps<Props>()

    const { 
        // prefetchIssue, 
        setIssueCacheData } = useIssue(props.issue.number, { autoLoad: false })

    const onMountEnter = () => {
        //prefetchIssue(props.issue.number)
        setIssueCacheData(props.issue)
    }

</script>

<template>
    <q-card @mouseenter="onMountEnter" class="text-black col-12 q-mb-md" flat bordered>
        <q-item>
            <q-item-section avatar>
                <q-avatar>
                    <img 
                        :src="issue.user.avatar_url"
                        alt="User avatar"
                    >
                </q-avatar>
            </q-item-section>
    
            <q-item-section>
                <q-item-label>
                    <RouterLink :to="`issue/${ issue.number }`">
                    {{ issue.title }}</RouterLink>
                </q-item-label>

                <q-item-label caption>
                    {{ timeSince(issue.created_at.toString()) }}
                </q-item-label>
            </q-item-section>
    
            <q-item-section>
                <q-item-label class="row items-center justify-end">
                    <q-item-label class="q-mr-md">
                        <q-icon name="question_answer" />
                        {{ issue.comments }}
                    </q-item-label>

                    <q-chip v-if="issue.state === State.Closed" color="positive" text-color="white" icon="check">
                        Closed
                    </q-chip>

                    <q-chip v-else color="negative" text-color="white" icon="bug_report"> 
                        Open 
                    </q-chip>
                </q-item-label>
    
            </q-item-section>
        </q-item>
    
        <q-separator />
    
        <q-item-section class="q-pa-md markdown-css">
            <VueMarkdown :source="issue.body" />
        </q-item-section>
    
        <q-separator />
    
        <q-item-section class="q-pa-xs q-gutter-xs">
            <div>
                <q-chip 
                    outline 
                    clickable
                    v-for="label of issue.labels" 
                    :key="label.id"
                    :style="{ color: `#${ label.color }` }" 
                >
                    {{ label.name }}
                </q-chip>
            </div>
        </q-item-section>
    </q-card>
  </template>

<style scoped>
    .markdown-css img {
        width: 250px !important;
    }
</style>