import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar"
import type { IconType } from "react-icons";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import { NavLink, useLocation } from "react-router-dom";
import { Label } from "@/components/ui/label.tsx";
import Logo from "@/assets/react.svg";
import { GoDotFill } from "react-icons/go";

export interface IMenuRoot {
    navMain: IMenuLevel1[];
}

interface IMenuLevel1 {
    title: string;
    items: IMenuLevel2[];
}

interface IMenuLevel2 {
    title: string;
    icon: IconType;
    url: string;
    sub_items: IMenuLevel3[];
}

interface IMenuLevel3 {
    title: string;
    icon: IconType;
    url: string;
    sub_activity: IMenuLevel4[];
}

interface IMenuLevel4 {
    title: string;
    is_sub_activity: boolean;
    url: string;
}

export function AppSidebar({ navMain }: IMenuRoot) {
    const location = useLocation();
    const { toggleSidebar } = useSidebar()

    const handleNavClick = () => {
        if (window.innerWidth < 768) {
            toggleSidebar()
        }
    };
    return (
        <Sidebar className="border-none rounded-none">
            <SidebarHeader className="bg-white">
                <div className="flex flex-row gap-4">
                    <img src={Logo} className="h-10 w-10" alt="logo" />
                    <Label>Shad UI</Label>
                </div>
            </SidebarHeader>
            <SidebarContent className="bg-white">
                {navMain.map((vLevel1, iLevel1) => (
                    <SidebarGroup className="px-2 py-0 mx-0" key={iLevel1}>
                        <SidebarGroupLabel className="font-bold">
                            {vLevel1.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {vLevel1.items.map((vLevel2, iLevel2) => {
                                    const isLevel2Active =
                                        location.pathname.includes(vLevel2.url) ||
                                        vLevel2.sub_items.some((vLevel3) =>
                                            location.pathname.startsWith(vLevel3.url) ||
                                            vLevel3.sub_activity.some((vLevel4) => location.pathname === vLevel4.url)
                                        );

                                    return (
                                        <SidebarMenuItem key={iLevel2}>
                                            {vLevel2.sub_items.length > 0 ? (
                                                <Accordion
                                                    type="single"
                                                    collapsible
                                                    className="w-full"
                                                    defaultValue={
                                                        isLevel2Active ? `item-${iLevel2}` : undefined
                                                    }
                                                >
                                                    <AccordionItem value={`item-${iLevel2}`} className={`rounded-md px-1 ${isLevel2Active ? 'bg-gray-300' : 'bg-none'}`}>
                                                        <AccordionTrigger className={`w-full text-left py-2 cursor-pointer hover:no-underline ${isLevel2Active ? 'bg-gray-300' : 'bg-none'}`}>
                                                            <div className="mx-2 flex items-center gap-2">
                                                                <vLevel2.icon className="h-4 w-4 p-0 m-0" />
                                                                <Label className="cursor-pointer">
                                                                    {vLevel2.title}
                                                                </Label>
                                                            </div>
                                                        </AccordionTrigger>
                                                        <AccordionContent className="pl-3">
                                                            <ul className="flex flex-col gap-1">
                                                                {vLevel2.sub_items.map((vLevel3, iLevel3) => {
                                                                    const isLevel3Active =
                                                                        location.pathname.includes(vLevel3.url) ||
                                                                        vLevel3.sub_activity.some((vLevel4) => location.pathname === vLevel4.url);

                                                                    return (
                                                                        <li key={iLevel3}>
                                                                            {vLevel3.sub_activity.some(sa => sa.is_sub_activity) ? (
                                                                                <Accordion
                                                                                    type="single"
                                                                                    collapsible
                                                                                    defaultValue={isLevel3Active ? `sub-${iLevel3}` : undefined}
                                                                                >
                                                                                    <AccordionItem value={`sub-${iLevel3}`}>
                                                                                        <AccordionTrigger className="w-full cursor-pointer text-left no-underline hover:no-underline">
                                                                                            <div className="flex items-center px-2 gap-2">
                                                                                                <vLevel3.icon className="h-3 w-3" />
                                                                                                <Label>{vLevel3.title}</Label>
                                                                                            </div>
                                                                                        </AccordionTrigger>
                                                                                        <AccordionContent className="">
                                                                                            <ul className="flex flex-col px-2 gap-1">
                                                                                                {vLevel3.sub_activity
                                                                                                    .filter((vLevel4) => vLevel4.is_sub_activity)
                                                                                                    .map((vLevel4, iLevel4) => (
                                                                                                        <li key={iLevel4}>
                                                                                                            <NavLink
                                                                                                                to={vLevel4.url}
                                                                                                                onClick={handleNavClick}
                                                                                                                className={({ isActive }) =>
                                                                                                                    `text-sm transition flex items-center gap-2 rounded-md px-2 py-1 ${
                                                                                                                        isActive
                                                                                                                            ? "bg-accent text-foreground font-medium"
                                                                                                                            : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                                                                                                                    }`
                                                                                                                }
                                                                                                            >
                                                                                                                <GoDotFill className="h-4 w-4" />
                                                                                                                <span>{vLevel4.title}</span>
                                                                                                            </NavLink>
                                                                                                        </li>
                                                                                                    ))}
                                                                                            </ul>
                                                                                        </AccordionContent>
                                                                                    </AccordionItem>
                                                                                </Accordion>
                                                                            ) : (
                                                                                <NavLink
                                                                                    to={vLevel3.url}
                                                                                    onClick={handleNavClick}
                                                                                    className={({ isActive }) =>
                                                                                        `text-sm pt-1 transition flex items-center gap-2 rounded-md px-2 py-1 ${
                                                                                            isActive
                                                                                                ? "bg-accent text-foreground font-medium"
                                                                                                : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                                                                                        }`
                                                                                    }
                                                                                >
                                                                                    <vLevel3.icon className="h-3 w-3" />
                                                                                    <span>{vLevel3.title}</span>
                                                                                </NavLink>
                                                                            )}

                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            ) : (
                                                <SidebarMenuButton
                                                    asChild  className={`${location.pathname.includes(vLevel2.url) ? 'bg-gray-300':'bg-none' }`}
                                                >
                                                    <NavLink
                                                        to={vLevel2.url}
                                                        onClick={handleNavClick}
                                                        className={`flex items-center gap-2 rounded-md px-2 py-1`}
                                                    >
                                                        <vLevel2.icon className="h-4 w-4" />
                                                        <span>{vLevel2.title}</span>
                                                    </NavLink>
                                                </SidebarMenuButton>
                                            )}
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    );
}
