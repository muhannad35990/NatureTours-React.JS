import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import { NotFound } from "../pages";
import { requireLogin, waitOneSecond, restrictTo } from "./guards/index";
import getRoutes from "./routes";
import Loading from "../components/Loading";

const GLOBAL_GUARDS = [requireLogin, restrictTo, waitOneSecond];

const Router = ({ children }) => {
  const routes = useMemo(() => getRoutes(), []);
  return (
    <BrowserRouter>
      <GuardProvider guards={GLOBAL_GUARDS} loading={Loading} error={NotFound}>
        <Route
          render={(routeProps) =>
            children(
              <Switch>
                {routes.map(
                  (
                    {
                      component,
                      error,
                      exact,
                      ignoreGlobal,
                      loading,
                      meta,
                      path,
                      guards,
                    },
                    i
                  ) => (
                    <GuardedRoute
                      key={i}
                      guards={guards}
                      component={component}
                      exact={exact}
                      error={error}
                      ignoreGlobal={ignoreGlobal}
                      loading={loading}
                      meta={meta}
                      path={path}
                    />
                  )
                )}
              </Switch>,
              routeProps
            )
          }
        />
      </GuardProvider>
    </BrowserRouter>
  );
};

Router.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Router;
