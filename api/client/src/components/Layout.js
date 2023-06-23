import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import { Outlet } from "react-router-dom";

export default function Layout({ user }) {
    return (
        <>
            <MainHeader user={user} />
            <Outlet />
            <MainFooter />
        </>
    )
}
