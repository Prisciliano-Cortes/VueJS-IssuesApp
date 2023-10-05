<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { MdEditor } from 'md-editor-v3';
    import 'md-editor-v3/lib/style.css';
    import useIssueMutation from '../composables/useIssueMutation';

    interface Props {
        isOpen: boolean;
        labels: string[]
    }

    interface Emits {
        (e: 'onClose'): void
    }

    const emits = defineEmits<Emits>()

    const props = defineProps<Props>()

    const { issueMutation } = useIssueMutation()

    const isOpenModal = ref<boolean>(false)
    const title = ref<string>('')
    const body = ref<string>('')
    // eslint-disable-next-line vue/no-dupe-keys
    const labels = ref<string[]>([])
    
    watch(props, () => {
        isOpenModal.value = props.isOpen
    })

    watch(() => issueMutation.isSuccess.value, (isSuccess) => {
        if (isSuccess) {
            title.value = ''
            body.value = ''
            labels.value = []

            issueMutation.reset()
            emits('onClose')
        }
    })
</script>

<template>
    <div class="q-pa-md q-gutter-sm">  
        <q-dialog v-model="isOpenModal" position="bottom" persistent>
            <q-card style="width: 500px">
                <q-form @submit="issueMutation.mutate({ title, body, labels })">
                    <q-card-section class="column no-wrap">
                        <div>
                            <div class="text-weight-bold">New Issue</div>
                            <div class="text-grey">Add new issue with labels</div>
                        </div>
            
                        <q-space />
                        
                        <div>
                            <q-input 
                                filled
                                dense
                                v-model="title"
                                label="Title"
                                placeholder="Title"
                                class="q-mb-sm"
                                :rules="[ val => !!val || 'Field is required']"
                            />
    
                            <q-select 
                                filled
                                dense
                                v-model="labels"
                                multiple
                                :options="props.labels"
                                use-chips
                                stack-label
                                label="Multiple selection"
                                class="q-mb-sm"
                            />
    
                            <!-- Markdown -->
                            <MdEditor 
                                v-model="body"
                                placeholder="# Markdown"
                                language="en-US"

                            />
                        </div>
                    </q-card-section>
    
                    <q-card-actions align="left">
                        <q-btn 
                            flat
                            label="Cancel"
                            v-close-popup
                            color="red"
                            @click="emits('onClose')"
                            :disable="issueMutation.isLoading.value"
                        />
    
                        <q-space />
    
                        <q-btn 
                            flat
                            type="submit"
                            label="Add issue"
                            color="dark"
                            :disable="issueMutation.isLoading.value"
                        />
                    </q-card-actions>
                </q-form>
            </q-card>
        </q-dialog>
    </div>
</template>

<style scoped>

</style>