<script setup lang="ts">

    interface Props {
        buttons: FabButton[]
    }

    interface FabButton {
        icon: string;
        color?: string;
        size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
        action: () => void
    }

    defineProps<Props>()
</script>

<template>
    <div class="fab">
        <q-btn 
            v-for="button of buttons"
            :key="button.icon"
            class="q-mr-sm"
            round
            :color="button.color || 'primary'"
            :icon="button.icon"
            :size="button.size || 'lg'"
            @click="button.action"
        />
    </div>
</template>

<style scoped>
    .fab {
        position: fixed;
        bottom: 30px;
        right: 30px;
    }
</style>