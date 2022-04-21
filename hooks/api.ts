import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LandingPagesQueryVariables = Exact<{
  filter?: InputMaybe<LandingPageFilter>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['OrderBy']>;
}>;


export type LandingPagesQuery = { __typename?: 'Query', landingPages?: { __typename?: 'LandingPageConnection', totalPage?: number | null, total?: number | null, edges?: Array<{ __typename?: 'LandingPageEdge', node?: { __typename?: 'LandingPage', id?: string | null, name?: string | null, description?: string | null, start?: any | null, end?: any | null, stores?: Array<{ __typename?: 'LandingStore', id?: string | null, name?: string | null } | null> | null } | null } | null> | null } | null };

export type LandingPostersQueryVariables = Exact<{
  filter?: InputMaybe<LandingPosterFilter>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['OrderBy']>;
}>;


export type LandingPostersQuery = { __typename?: 'Query', landingPosters?: { __typename?: 'LandingPosterConnection', totalPage?: number | null, total?: number | null, edges?: Array<{ __typename?: 'LandingPosterEdge', node?: { __typename?: 'LandingPoster', id?: string | null, name?: string | null, background?: any | null, music?: any | null } | null } | null> | null } | null };

export type LandingStoresQueryVariables = Exact<{
  filter?: InputMaybe<LandingStoreFilter>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['OrderBy']>;
}>;


export type LandingStoresQuery = { __typename?: 'Query', landingStores?: { __typename?: 'LandingStoreConnection', totalPage?: number | null, total?: number | null, edges?: Array<{ __typename?: 'LandingStoreEdge', node?: { __typename?: 'LandingStore', id?: string | null, name?: string | null, qrCode?: any | null, leader?: string | null, location?: { __typename?: 'Address', province?: string | null, city?: string | null, district?: string | null, street?: string | null } | null } | null } | null> | null } | null };


export const LandingPagesDocument = gql`
    query landingPages($filter: LandingPageFilter, $page: Int, $pageSize: Int, $orderBy: OrderBy = "createAt_desc") {
  landingPages: landingPagesConnection(
    filter: $filter
    page: $page
    pageSize: $pageSize
    orderBy: $orderBy
  ) {
    totalPage
    total: totalCount
    edges {
      node {
        id
        name
        description
        start
        end
        stores {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useLandingPagesQuery__
 *
 * To run a query within a React component, call `useLandingPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLandingPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLandingPagesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useLandingPagesQuery(baseOptions?: Apollo.QueryHookOptions<LandingPagesQuery, LandingPagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LandingPagesQuery, LandingPagesQueryVariables>(LandingPagesDocument, options);
      }
export function useLandingPagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LandingPagesQuery, LandingPagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LandingPagesQuery, LandingPagesQueryVariables>(LandingPagesDocument, options);
        }
export type LandingPagesQueryHookResult = ReturnType<typeof useLandingPagesQuery>;
export type LandingPagesLazyQueryHookResult = ReturnType<typeof useLandingPagesLazyQuery>;
export type LandingPagesQueryResult = Apollo.QueryResult<LandingPagesQuery, LandingPagesQueryVariables>;
export const LandingPostersDocument = gql`
    query landingPosters($filter: LandingPosterFilter, $page: Int, $pageSize: Int, $orderBy: OrderBy = "createAt_desc") {
  landingPosters: landingPostersConnection(
    filter: $filter
    page: $page
    pageSize: $pageSize
    orderBy: $orderBy
  ) {
    totalPage
    total: totalCount
    edges {
      node {
        id
        name
        background
        music
      }
    }
  }
}
    `;

/**
 * __useLandingPostersQuery__
 *
 * To run a query within a React component, call `useLandingPostersQuery` and pass it any options that fit your needs.
 * When your component renders, `useLandingPostersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLandingPostersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useLandingPostersQuery(baseOptions?: Apollo.QueryHookOptions<LandingPostersQuery, LandingPostersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LandingPostersQuery, LandingPostersQueryVariables>(LandingPostersDocument, options);
      }
export function useLandingPostersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LandingPostersQuery, LandingPostersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LandingPostersQuery, LandingPostersQueryVariables>(LandingPostersDocument, options);
        }
export type LandingPostersQueryHookResult = ReturnType<typeof useLandingPostersQuery>;
export type LandingPostersLazyQueryHookResult = ReturnType<typeof useLandingPostersLazyQuery>;
export type LandingPostersQueryResult = Apollo.QueryResult<LandingPostersQuery, LandingPostersQueryVariables>;
export const LandingStoresDocument = gql`
    query landingStores($filter: LandingStoreFilter, $page: Int, $pageSize: Int, $orderBy: OrderBy = "createAt_desc") {
  landingStores: landingStoresConnection(
    filter: $filter
    page: $page
    pageSize: $pageSize
    orderBy: $orderBy
  ) {
    totalPage
    total: totalCount
    edges {
      node {
        id
        name
        location {
          province
          city
          district
          street
        }
        qrCode
        leader
      }
    }
  }
}
    `;

/**
 * __useLandingStoresQuery__
 *
 * To run a query within a React component, call `useLandingStoresQuery` and pass it any options that fit your needs.
 * When your component renders, `useLandingStoresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLandingStoresQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useLandingStoresQuery(baseOptions?: Apollo.QueryHookOptions<LandingStoresQuery, LandingStoresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LandingStoresQuery, LandingStoresQueryVariables>(LandingStoresDocument, options);
      }
export function useLandingStoresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LandingStoresQuery, LandingStoresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LandingStoresQuery, LandingStoresQueryVariables>(LandingStoresDocument, options);
        }
export type LandingStoresQueryHookResult = ReturnType<typeof useLandingStoresQuery>;
export type LandingStoresLazyQueryHookResult = ReturnType<typeof useLandingStoresLazyQuery>;
export type LandingStoresQueryResult = Apollo.QueryResult<LandingStoresQuery, LandingStoresQueryVariables>;