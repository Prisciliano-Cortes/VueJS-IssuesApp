import { useQuery } from '@tanstack/vue-query'
import { githubApi } from 'src/api/githubApi'
import { Label } from '../interfaces/label'
import { useIssuesStore } from 'src/stores/issues'
import { computed } from 'vue'

const getLabels = async():Promise<Label[]> => {
    const { data } = await githubApi.get<Label[]>('/labels?per_page=100')

    return data
}

const useLabels = () => {

    const issueStore = useIssuesStore()

    const labelsQuery = useQuery(
        ['labels'],
        getLabels,
        {
            staleTime: 1000 * 60 * 60
        }
    )

    const selectedLabel = computed( () => issueStore.labels )

    const toggleLabel = ( label: string ) => {
        issueStore.toggleLabel(label)
    }
    
    return {
        labelsQuery,

        //*** Getter */
        selectedLabel,

        //*** Methods */
        toggleLabel
    }
}

export default useLabels