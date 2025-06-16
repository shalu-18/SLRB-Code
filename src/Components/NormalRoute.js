import React from "react";

function NormalRoute({ component: C, appProps, ...rest }) {
    console.log("hello", appProps)
    return <C {...appProps} />
}
export default NormalRoute;