import React from "react";
import UserLayout from "./UserLayout";
function UserRoute({ component: C, appProps, ...rest }) {
    return <UserLayout><C {...appProps} /></UserLayout>
}
export default UserRoute