import {Route, Routes} from "react-router-dom";
import PageNotFoundScreen from "@/app/page-not-found/main.tsx";
import DashboardScreen from "@/app/dashboard/screen.tsx";
import ProfileScreen from "@/app/profile/screen.tsx";
import SystemManagementRoleScreen from "@/app/system-management/system-management-role/screen.tsx";
import SystemManagementUserScreen from "@/app/system-management/system-management-user/screen.tsx";
import {DataTableDemo} from "@/app/system-management/system-management-role/create.tsx";

export default function MainRoutes() {
    return (
        <Routes>
            <Route path={"/dashboard"} element={<DashboardScreen/>}/>
            <Route path={"/profile"} element={<ProfileScreen/>}/>
            <Route path={"/system-management-role"} element={<SystemManagementRoleScreen/>}/>
            <Route path={"/system-management-role-create"} element={<DataTableDemo/>}/>
            <Route path={"/system-management-user"} element={<SystemManagementUserScreen/>}/>
            <Route path={"*"} element={<PageNotFoundScreen/>}/>
        </Routes>
    )
}
