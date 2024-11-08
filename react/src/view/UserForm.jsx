import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    // Fetch data if id exists (for edit user)
    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data);
                })
                .catch(() => {
                    setLoading(false);
                    navigate("/users");
                });
        }
    }, [id]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
        if (user.id) {
            // PUT request to update user
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(() => {
                    setLoading(false);
                    navigate("/users"); // Redirect to users list after successful update
                })
                .catch((err) => {
                    setLoading(false);
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors); // Set validation errors
                    }
                });
        } else {
            // POST request to create a new user
            axiosClient
                .post("/users", user)
                .then(() => {
                    setLoading(false);
                    navigate("/users"); // Redirect to users list after successful creation
                })
                .catch((err) => {
                    setLoading(false);
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors); // Set validation errors
                    }
                });
        }
    };

    return (
        <>
            {user.id ? (
                <h1>Update User: {user.name}</h1>
            ) : (
                <h1>Create New User</h1>
            )}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            value={user.name}
                            onChange={(ev) =>
                                setUser({ ...user, name: ev.target.value })
                            }
                            placeholder="Name"
                        />
                        <input
                            value={user.email}
                            onChange={(ev) =>
                                setUser({ ...user, email: ev.target.value })
                            }
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            value={user.password}
                            onChange={(ev) =>
                                setUser({ ...user, password: ev.target.value })
                            }
                            placeholder="Password"
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}
