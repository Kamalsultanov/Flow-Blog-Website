import { Navigate } from "react-router";
import { isAuthenticated } from "../../../authService/Auth";

const AdminRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/admin-login" />;
};
export default AdminRoute;
