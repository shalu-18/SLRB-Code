import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Routes, Route } from "react-router-dom";
import { ROUTES } from './Components/Route';
import UserRoute from './Components/Users/UserRoute';
import NormalRoute from './Components/NormalRoute';
import { ToastContainer } from 'react-toastify';
import AdminRoute from "./Components/Admin/AdminRoutes";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {
          ROUTES?.map((route) => {
            if(route?.isAdmin){
              return <Route key={route?.path} path={route?.path} element={<AdminRoute component={route?.component} />} />
            }
            else if (route?.isProtected) {
              return <Route key={route?.path} path={route?.path} element={<UserRoute component={route?.component} />} />
            }
            else {
              return <Route key={route?.path} path={route?.path} element={<NormalRoute component={route?.component} />} />
            }
          })
        }
      </Routes>
    </>
  );
}

export default App;
