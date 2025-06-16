import MY_Bride_Page from "../Components/Users/My_Bride";
import Landingpage from "./CommonComponents/LandingPage";
import MY_Properties from "../Components/Users/My_Properties";
import MortGage from "./MortGage";
import Setting from "../Components/CommonComponents/Setting";
import RequestList from "../Components/Users/RequestList";
import NotaryLandingPage from "../Components/Notary/NotaryLandingPage";
import BankLandingPage from "../Components/Bank/BankLandingpage";
import UpdatePassword from "../Components/Users/UpdatePassword";
import { updatePassword } from "../Services/UsersServices/User_Services";
import VerifyPage from "./Admin/verifyPage"
import PrivacyPolicy from "../Components/CommonComponents/PrivacyPolicy";
import AboutUs from "../Components/CommonComponents/AboutUs";
import TermsConditions from "../Components/CommonComponents/TermsConditions";
import AddProperty_Form from "../Components/Users/Addproperty_Form";
import Admin_Dashbord from "../Components/Admin/AdminDashbord";
import ChangeUserRole from "../Components/Admin/ChangeUserRole";
import ViewSingleUserDetails from "../Components/Admin/ViewSingleUserDetails";
import DeleteSingleUser from "../Components/Admin/DeleteSingleUser";
import PaymentForm from "../Components/Users/PaymentForm"
import SignUp from "../Components/Users/Signup_Formik";
import AdminPropertyPage from "../Components/Admin/AdminPropertyPage"
import SinglePropertyDetails from "../Components/Users/SingleProperty"
import Transactionsmain_page from "../Components/Users/Transaction/TransactionMainPage"
import AdminCustomizepage from "../Components/Admin/Customize";

export const ROUTES = [{
    path: '/',
    component: Landingpage,
    isProtected: false,
    isAdmin: false
},
{
    path: '/userbids',
    component: MY_Bride_Page,
    isProtected: true,
    isAdmin: false
},
{
    path: '/myproperties',
    component: MY_Properties,
    isProtected: true,
    isAdmin: false
},
{
    path: '/mortgage',
    component: MortGage,
    isProtected: true,
    isAdmin: false
},
{
    path: '/setting',
    component: Setting,
    isProtected: true,
    isAdmin: false
},
{
    path: "/signup",
    component: SignUp,
    isProtected: false

},
{
    path: '/payment',
    component: PaymentForm,
    isProtected: false,
    isAdmin: false
},
{
    path: '/singpropertydetail',
    component: SinglePropertyDetails,
    isProtected: true,
    isAdmin: false
},
{
    path: '/guestproperty',
    component: SinglePropertyDetails,
    isProtected: false,
    isAdmin: false
},
{
    path: '/setting',
    component: Setting,
    isProtected: true,
    isAdmin: false
},
{
    path: '/addproperty',
    component: AddProperty_Form,
    isProtected: true,
    isAdmin: false
},
{
    path: '/requestlist',
    component: RequestList,
    isProtected: true,
    isAdmin: false
},
{
    path: '/notary',
    component: NotaryLandingPage,
    isProtected: false,
    isAdmin: false
},
{
    path: '/bank',
    component: BankLandingPage,
    isProtected: false,
    isAdmin: false
},
{
    path: '/transaction',
    component: Transactionsmain_page,
    isProtected: false,
    isAdmin: false
},
{
    path: '/password/reset/:token',
    component: UpdatePassword,
    isProtected: false,
    isAdmin: false
},
{
    path: '/password/update',
    component: updatePassword,
    isProtected: false,
    isAdmin: false
},
{
    path: '/PrivacyPolicy',
    component: PrivacyPolicy,
    isProtected: false,
    isAdmin: false
},
{
    path: '/AboutUs',
    component: AboutUs,
    isProtected: false,
    isAdmin: false
},
{
    path: '/TermsConditions',
    component: TermsConditions,
    isProtected: false,
    isAdmin: false
},
{
    path: '/admin/alluser',
    component: Admin_Dashbord,
    isProtected: true,
    isAdmin: true
},
{
    path: '/admin/change/user/:id',
    component: ChangeUserRole,
    isProtected: true,
    isAdmin: true
},
{
    path: '/admin/view/user/:id',
    component: ViewSingleUserDetails,
    isProtected: true,
    isAdmin: true
},
{
    path: '/admin/delete/user/:id',
    component: DeleteSingleUser,
    isProtected: true,
    isAdmin: true
},
{
    path: '/adminproperty',
    component: AdminPropertyPage,
    isProtected: true,
    isAdmin: true
},
{
    path:'/adminsetting',
    component: Setting,
    isProtected: true,
    isAdmin: true
},
{
    path:'/verify',
    component: VerifyPage,
    isProtected: false,
    isAdmin: false
},
{
    path:'/customize',
    component:AdminCustomizepage,
    isProtected:true,
    isAdmin:true
}
]