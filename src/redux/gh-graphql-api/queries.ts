const graphqlSearchRepoListQuery = `query(
$searchQuery: String!, 
$first: Int, 
$last: Int,
$after: String, 
$before: String, 
)
 {
    search(query: $searchQuery, type: REPOSITORY, first: $first, last: $last, after: $after, before: $before ) {
        repositoryCount  
        edges {
            node {
                ... on Repository {
                    id
                    name
                    primaryLanguage {
                        name
                    }
                    forkCount
                    stargazerCount
                    updatedAt
                }
            }
        }
        pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
        }
    }
}`


const graphqlGetDetailsRepository = `query GetRepositoryDetails($id: ID!) {
    node(id: $id) {
        ... on Repository {
            name
            description
            licenseInfo {
                name
            }
        }
    }
}`



export { graphqlSearchRepoListQuery, graphqlGetDetailsRepository }