import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL, getConfig } from "../../helper/config";
import { setCurrentUser, setLoggedInOut, setToken } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";

export default function Header() {
    const { isLoggedIn, user, token } = useSelector((state) => state.user);
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/user`,
                    getConfig(token)
                );
                dispatch(setCurrentUser(response.data.user));
            } catch (error) {
                console.log(error);
                if (error?.response?.status === 401) {
                    dispatch(setLoggedInOut(false));
                    dispatch(setCurrentUser(null));
                    dispatch(setToken(""));
                }
            }
        };
        if (token) getLoggedInUser();
    }, [token]);

    const logoutUser = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/user/logout`,
                getConfig(token)
            );
            dispatch(setLoggedInOut(false));
            dispatch(setCurrentUser(null));
            dispatch(setToken(""));
            toast.success(response.data.message, {
                position: "top-right",
            });
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">
                    React Stock Images
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    location.pathname === "/" ? "active" : ""
                                }`}
                                aria-current="page"
                                to="/"
                            >
                                <i className="bi bi-house"></i> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    location.pathname === "/upload"
                                        ? "active"
                                        : ""
                                }`}
                                aria-current="page"
                                to="/upload "
                            >
                                <i className="bi bi-upload"></i> Upload
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    location.pathname === "/cart"
                                        ? "active"
                                        : ""
                                }`}
                                aria-current="page"
                                to="/cart "
                            >
                                <i className="bi bi-bag"></i> Cart {`(${cartItems.length})`}
                            </Link>
                        </li>
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            location.pathname === "/profile"
                                                ? "active"
                                                : ""
                                        }`}
                                        aria-current="page"
                                        to="/profile"
                                    >
                                        <i className="bi bi-person"></i>
                                        {user?.name}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="nav-link border-0 bg-light"
                                        onClick={() => logoutUser()}
                                    >
                                        <i className="bi bi-person-fill-down"></i>
                                        {"Logout"}
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            location.pathname === "/register"
                                                ? "active"
                                                : ""
                                        }`}
                                        to="/register"
                                    >
                                        <i className="bi bi-person-add"></i>{" "}
                                        Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            location.pathname === "/login"
                                                ? "active"
                                                : ""
                                        }`}
                                        to="/login"
                                    >
                                        <i className="bi bi-person-fill-up"></i>{" "}
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
