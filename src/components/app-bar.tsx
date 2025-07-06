import {SidebarTrigger, useSidebar} from "@/components/ui/sidebar.tsx";
import BreadcrumbComponent from "@/components/breadcrumb.tsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FiUser} from "react-icons/fi";
import {Label} from "@/components/ui/label.tsx";
import {IoMdSettings} from "react-icons/io";
import {MdOutlineLogout} from "react-icons/md";
import type {IMenuRoot} from "@/components/app-sidebar.tsx";
import {NavLink, useNavigate} from "react-router-dom";
import {LuUserRoundCog} from "react-icons/lu";

export default function AppBarComponent({navMain}:IMenuRoot) {
    const { open } = useSidebar();
    const navi = useNavigate()
    const handleSignOut = () => {
        navi("/auth-sign-in")
    }
    return (
        <header  className={`fixed top-0 justify-between left-0 right-0 z-50 h-12 flex items-center gap-4 px-2 transition-all duration-300  dark:bg-background 
                ${
            open ? "md:ml-64 md:max-w-[calc(100%-16rem)]" : "ml-0 max-w-full"
        }`}>
            <div className={"flex flex-row items-center gap-5 justify-center"}>
                <SidebarTrigger className="-ml-1" />
                <BreadcrumbComponent navMain={navMain}/>
            </div>
            <div className={"flex flex-row items-center gap-5 justify-center"}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline"
                                className={"rounded-full h-8 w-8 cursor-pointer"}>
                            <FiUser/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 m-2" align="start">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <NavLink to={"/profile"}>
                                <DropdownMenuItem  className={"cursor-pointer"}>
                                    <Label>Profile</Label>
                                    <DropdownMenuShortcut>
                                        <LuUserRoundCog/>
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </NavLink>
                            <NavLink to={"/setting"}>
                                <DropdownMenuItem className={"cursor-pointer"}>
                                    <Label>Settings</Label>
                                    <DropdownMenuShortcut>
                                        <IoMdSettings/>
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </NavLink>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}
                                          className={"cursor-pointer"}>
                            <Label className={"text-red-500"}>Log out</Label>
                            <DropdownMenuShortcut>
                                <MdOutlineLogout className={"text-red-500"} />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}