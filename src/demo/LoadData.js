import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { utils } from 'asany';

const APPLICATION = gql`
  query getApplication($id: ID!) {
    app: application(id: $id) {
      ...ApplicationInfo
      rootRoute: route(path: "root") {
        ...RouteParts
        __typename
      }
      loginRoute: route(path: "login") {
        ...RouteParts
        __typename
      }
      layoutRoute: route(path: "layout") {
        ...RouteParts
        __typename
      }
      configuration {
        ezoffice {
          id
          name
          description
          configuration {
            id
            host
          }
        }
        variables {
          key
          value
        }
      }
      routes {
        ...RouteParts
      }
      __typename
    }
  }
  fragment ApplicationInfo on Application {
    id
    name
    description
    enabled
    logo
    path
    dingtalkIntegration
    ezofficeIntegration
  }
  fragment RouteParts on Route {
    id
    name
    path
    type
    authorized
    authority
    hideInMenu
    hideChildrenInMenu
    hideInBreadcrumb
    redirect
    component
    icon
    index
    enabled
    parent {
      id
      path
    }
    configuration
  }
`;

export default ({ children }) => {
  const { data, loading } = useQuery(APPLICATION, {
    variables: { id: '5cc2a9d305297b47dc26c5da' },
  });
  return (
    <>
      {React.cloneElement(React.Children.only(children), {
        project:
          loading && !data
            ? null
            : {
                name: data.app.name,
                type: 'application',
                data: {
                  routes: utils.routeTree(data.app.routes)[0].routes,
                },
              },
      })}
    </>
  );
};
