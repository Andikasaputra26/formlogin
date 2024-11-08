import { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/contextprovider";
import axiosClient from "../axiosClient";

const DefaultLayout = () => {
    const { user, token, setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = async (ev) => {
        ev.preventDefault();
        try {
            await axiosClient.post("/logout");
            setUser(null);
            setToken(null);
            navigate("/login"); // Mengarahkan ke halaman login setelah logout
        } catch (err) {
            console.error("Error logging out:", err);
        }
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div className="header-left">Header</div>
                    <div className="header-right">
                        {user && user.name ? (
                            <span>Welcome, {user.name}</span>
                        ) : null}
                        <a
                            href="#"
                            onClick={onLogout}
                            className="btn btn-logout"
                        >
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;
