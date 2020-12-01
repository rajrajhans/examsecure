import React, {Component} from 'react';
import {Redirect} from "@reach/router";

class PrivateRoute extends Component {
    render() {
        let {component: Comp, isSignedIn, ...props} = this.props;

        return (
            <>
                {isSignedIn ?
                    (<Comp {...props}/>)
                    :
                    (<Redirect to={"/"} noThrow/>)
                }
            </>
        );
    }
}

export default PrivateRoute;
