import {
    AppSidebar,
    type IMenuRoot
} from "@/components/app-sidebar.tsx";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar.tsx";
import MainRoutes from "@/routes/main.tsx";
import AppBarComponent from "@/components/app-bar.tsx";

export default function MainLayout({ navMain }: IMenuRoot) {
    return (
        <SidebarProvider>
            {/*slide-bar-menu*/}
            <AppSidebar navMain={navMain} />
            <SidebarInset className={"bg-gray-200"}>
                {/*header*/}
                <AppBarComponent navMain={navMain} />
                <SidebarInset className="pt-13">
                    {/*body*/}
                        <SidebarInset className={"bg-gray-200 p-1 rounded-xl"}>
                            <SidebarInset className={"bg-white rounded-xl"}>
                                    <MainRoutes />
                            </SidebarInset>
                        </SidebarInset>
                </SidebarInset>
            </SidebarInset>
        </SidebarProvider>
    );
}
