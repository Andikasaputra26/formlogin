import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/contextprovider";
import axiosClient from "../axiosClient";

const Register = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient
            .post("/register", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">Create A New Account</h1>
                <form onSubmit={handleSubmit}>
                    <input ref={nameRef} type="text" placeholder="Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="btn btn-block">Sign Up</button>
                    <p className="message">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                    {errors && (
                        <div className="error-messages">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Register;
