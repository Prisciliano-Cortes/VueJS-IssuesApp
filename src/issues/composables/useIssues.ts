import { useQuery } from '@tanstack/vue-query'
import { Issue, State } from '../interfaces/issue'
import { githubApi } from 'src/api/githubApi'
import useStore from './useStore'

const getIssues = async(labels: string[], state: State):Promise<Issue[]> => {

    const params = new URLSearchParams()

    if ( state ) {
        params.append('state', state)
    }

    if ( labels.length > 0 ) {
        const labelString = labels.join(',')

        params.append('labels', labelString)
    }

    params.append('per_page', '10')

    const { data } = await githubApi.get<Issue[]>('/issues', {
        params
    })

    return data
}

const useIssues = () => {

    // const issueStore = useIssuesStore()

    // const { labels, state } = storeToRefs( issueStore )

    const { labels, state } = useStore()

    const issuesQuery = useQuery(
        ['issues', { labels, state }],
        () => getIssues(labels.value, state.value)
    )

    return {
        issuesQuery
    }
}

export default useIssues