// search list repo types 
export interface SearchRepoListVariables {
    searchQuery: string;
    first: number;
    last: number;
    after: string | null;
    before: string | null;
}
// orderField: 'STARGAZERS' | 'FORKS' | 'UPDATED' | null;

export interface SearchRepoListResponse {
    repositoryCount: number;
    edges: {
        node: RepoListItem;
    }[];
    pageInfo: PageInfo;
}

export interface RepoListItem {
    id: string;
    name: string;
    primaryLanguage: {
        name: string | null;
    } | null;
    forkCount: number;
    stargazerCount: number;
    updatedAt: string;
}

export interface PageInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    endCursor: string | null;
    startCursor: string | null;
}

///////////////////////////////////////////////////////////////////



// chosen repo details

export interface GetDetailsRepoVariables {
    id: string
}

export interface GetDetailsRepoResponse {
    name: string;
    description: string | null;
    licenseInfo: LicenseInfo | null
}

interface LicenseInfo {
    name: string | null;
}

/////////////////////////////////////////////////////////////////////