import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/menuPage/Menu";
import Signup from "../components/Signup";
import Order from "../pages/dashboard/Order";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UserProfile from "../pages/dashboard/UserProfile";
import CartPage from "../pages/menuPage/CartPage";
import Login from "../components/Login";
import DashboardLayout from "../layout/DashboadLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/menuPage/Payment";
import Chatbot from "../components/AiChat";

// Use the environment variable or fallback to localhost
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:6001";

const router = createBrowserRouter([
  // users
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <Menu /> },
      {
        path: "/order",
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        ),
      },
      { path: "/update-profile", element: <UserProfile /> },
      { path: "/cart-page", element: <CartPage /> },
      { path: "/process-checkout", element: <Payment /> },
    ],
  },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/chat", element: <Chatbot /> },

  // Admin
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "add-menu", element: <AddMenu /> },
      { path: "manage-items", element: <ManageItems /> },
      {
        path: "update-menu/:id",
        element: <UpdateMenu />,
        loader: ({ params }) =>
          fetch(`${BASE_URL}/menu/${params.id}`),
      },
    ],
  },
]);

export default router;
