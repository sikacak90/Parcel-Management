/*!



*/
import Index from "views/Index.js";
import AWSPage from "views/examples/AWS.js";
import Login from "views/examples/Login.js";
import Register from "views/examples/Register.js";
import ForgotPassword from "views/examples/ForgotPassword.js";
import Test from "views/examples/QR.js";

var routes = [
  {
    path: `/index/:id`,
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/InsertAWB/:id",
    name: "Insert New AWB",
    icon: "fa fa-check-square",
    component: AWSPage,
    layout: "/auth"
  },
  {
    path: "/login",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    layout: "/auth"
  },
  {
    path: "/camera/:id",
    component: Test,
    layout: "/auth"
  }
];
export default routes;
