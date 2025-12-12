import React, { LazyExoticComponent } from "react";
import { HeaderLink, RouteItem } from "../types/header";

export const buildRoutes = (links: HeaderLink[]) => {
  let routes: RouteItem[] = [];
  links.forEach((item: HeaderLink) => {
    if (item.element) {
      const Component = item.element as unknown as LazyExoticComponent<
        React.ComponentType<any>
      >;
      routes.push({
        path: item.link,
        element: <Component />,
      });
    }
    if (item.children && item.children.length > 0) {
      item.children.forEach((child: HeaderLink) => {
        const ChildComponent = child.element as unknown as LazyExoticComponent<
          React.ComponentType<any>
        >;
        routes.push({
          path: child.link,
          element: <ChildComponent />,
        });
        if (child.children && child.children.length > 0) {
          child.children.forEach((innerChild: HeaderLink) => {
            const ChildComponent =
              innerChild.element as unknown as LazyExoticComponent<
                React.ComponentType<any>
              >;
            routes.push({
              path: innerChild.link,
              element: <ChildComponent />,
            });
            if (innerChild.children && innerChild.children.length > 0) {
              innerChild.children.forEach((innerChildInner: HeaderLink) => {
                const ChildComponent =
                  innerChildInner.element as unknown as LazyExoticComponent<
                    React.ComponentType<any>
                  >;
                routes.push({
                  path: innerChildInner.link,
                  element: <ChildComponent />,
                });
              });
            }
          });
        }
      });
    }
  });

  return routes;
};
