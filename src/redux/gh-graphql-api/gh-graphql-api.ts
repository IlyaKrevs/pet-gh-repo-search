import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SearchRepoListResponse, SearchRepoListVariables, GetDetailsRepoResponse, GetDetailsRepoVariables } from "./types";
import { graphqlSearchRepoListQuery, graphqlGetDetailsRepository } from "./queries";

const myGhAccessToken = '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'

const myBaseQuery = fetchBaseQuery({
    baseUrl: 'https://api.github.com/graphql',
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', `Bearer ${myGhAccessToken}`)
        return headers
    }
})

export const ghGraphqlApi = createApi({
    reducerPath: 'ghGraphql',
    baseQuery: myBaseQuery,
    endpoints: (builder) => ({
        searchRepoList: builder.query<SearchRepoListResponse, Partial<SearchRepoListVariables>>({
            query: (query) => {

                return {
                    url: '',
                    method: 'POST',
                    body: {
                        query: graphqlSearchRepoListQuery,
                        variables: query
                    }
                }
            },
            transformResponse: (response: {
                data: {
                    search: SearchRepoListResponse
                }
            }) => {
                return response.data.search
            }
        }),
        getRepoDetails: builder.query<GetDetailsRepoResponse, string>({
            query: (chosenID) => ({
                url: '',
                method: 'POST',
                body: {
                    query: graphqlGetDetailsRepository,
                    variables: {
                        id: chosenID
                    }
                }
            }),
            transformResponse: (response: {
                data: {
                    node: GetDetailsRepoResponse
                }
            }) => {
                return response.data.node
            }
        })
    })
})

export const { useSearchRepoListQuery, useGetRepoDetailsQuery } = ghGraphqlApi

