import React from "react";
import AdminLayout from "../Admin/AdminLayout";
function AdminRoute({ component: C, appProps, ...rest }) {
    return <AdminLayout><C {...appProps} /></AdminLayout>
}
export default AdminRoute