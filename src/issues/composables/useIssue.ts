//import { computed } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { githubApi } from 'src/api/githubApi'
import { Issue } from '../interfaces/issue'

const sleep = ():Promise<boolean> => {
    return new Promise( resolve => {
        setTimeout(() => {
            resolve(true)
        }, 2000);
    })
}

const getIssue = async( issueNumber: number ):Promise<Issue> => {

    await sleep()

    const { data } = await githubApi.get<Issue>(`/issues/${ issueNumber }`)

    return data
}

const getIssueComments = async( issueNumber: number ):Promise<Issue[]> => {

    const { data } = await githubApi.get<Issue[]>(`/issues/${ issueNumber }/comments`)

    return data
}

interface Options {
    autoLoad?: boolean
}

const useIssue = ( issueNumber: number, options?: Options ) => {

    const { autoLoad = true } = options || {}

    const queryClient = useQueryClient()

    const issueQuery = useQuery(
        ['issue', issueNumber],
        () => getIssue(issueNumber),
        {
            staleTime: 1000 * 60,
            enabled: autoLoad
        }
    )

    const issueCommentsQuery = useQuery(
        ['issue', issueNumber, 'comments'],
        () => getIssueComments(issueNumber),
        //() => getIssueComments(issueQuery.data.value?.number || 0),
        {
            staleTime: 1000 * 15,
            enabled: autoLoad
            //enabled: computed( () => !!issueQuery.data.value)
        }
    )

    const prefetchIssue = ( issueNumber: number ) => {
        queryClient.prefetchQuery(
            ['issue', issueNumber],
            () => getIssue(issueNumber),
            {
                staleTime: 1000 * 60
            }
        )

        queryClient.prefetchQuery(
            ['issue', issueNumber, 'comments'],
            () => getIssueComments(issueNumber),
            {
                staleTime: 1000 * 15,
            }
        )
    }

    const setIssueCacheData = ( issue: Issue) => {
        queryClient.setQueryData(
            ['issue', issue.number],
            issue
        )
    }

    return {
        issueQuery,
        issueCommentsQuery,

        //*** Method */
        prefetchIssue,
        setIssueCacheData
    }
}

export default useIssue