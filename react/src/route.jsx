import { createBrowserRouter } from "react-router-dom";
import Login from "./view/login";
import Register from "./view/register";
import DefaultLayout from "./Components/DefaultLayout";
import GuesLayout from "./Components/GuestLayout";
import Users from "./view/users";
import UserForm from "./view/UserForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/users/new",
                element: <UserForm key="UserCreate" />,
            },
            {
                path: "/users/:id",
                element: <UserForm key="UserUpdate" />,
            },
        ],
    },

    {
        path: "/",
        element: <GuesLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
]);

export default router;
