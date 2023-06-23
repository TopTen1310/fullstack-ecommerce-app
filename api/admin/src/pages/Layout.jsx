import MainHeader from '../components/MainHeader'
import { Outlet } from "react-router-dom";

export default function Layout({ user }) {
    return (
        <>
            <MainHeader user={user} />
            <Outlet />
        </>
    )
}
