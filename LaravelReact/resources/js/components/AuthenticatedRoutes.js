import React from "react";
import { Route, Redirect } from "react-router-dom";
import Allstudent from "./Pages/allstudent";


function AuthenticatedRoutes({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                authed === true ? (
                    <Component {...props} exact={true} />

                ) : (
                        <Redirect
                            to={{
                                pathname: '/singin',
                                state: { from: props.location },
                            }}
                        />
                    )
            }
        />
    );
}

export default AuthenticatedRoutes;
