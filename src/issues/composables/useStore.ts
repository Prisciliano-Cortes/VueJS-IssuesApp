import { storeToRefs } from 'pinia'
import { useIssuesStore } from 'src/stores/issues'

const useStore = () => {

    const issueStore = useIssuesStore()

    const { labels, state } = storeToRefs( issueStore )

    return {
        labels,
        state
    }
}

export default useStore