import { Navigate } from "react-router-dom";

export default function Protected({ user, children, redirect = "/login" }) {
    if (!user) {
        return <Navigate to={redirect} replace />
    }
    return children
}
