import type {IMenuRoot} from "@/components/app-sidebar.tsx";
import {useLocation} from "react-router-dom";
import {useMemo} from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage, BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import * as React from "react";

export default  function BreadcrumbComponent({navMain}:IMenuRoot) {
    const location = useLocation();

    const breadcrumbs = useMemo(() => {
        const path = location.pathname;
        const items: { label: string; url: string }[] = [];

        outer: for (const group of navMain) {
            for (const item of group.items) {
                for (const sub of item.sub_items) {
                    for (const act of sub.sub_activity || []) {
                        if (path === act.url) {
                            items.push({ label: item.title, url: "#" });
                            items.push({ label: sub.title, url: sub.url });
                            items.push({ label: act.title, url: act.url });
                            break outer;
                        }
                    }

                    if (path === sub.url) {
                        items.push({ label: item.title, url: "#" });
                        items.push({ label: sub.title, url: sub.url });
                        break outer;
                    }
                }

                if (path === item.url) {
                    items.push({ label: item.title, url: item.url });
                    break outer;
                }
            }
        }

        return items;
    }, [location.pathname, navMain]);


    return (
        <Breadcrumb>
            <BreadcrumbList className="mt-1">
                {breadcrumbs.map((item, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            {index !== breadcrumbs.length - 1 ? (
                                item.url === "#" ? (
                                    <span className="text-muted-foreground">{item.label}</span>
                                ) : (
                                    <BreadcrumbLink href={item.url} className="text-foreground">
                                        {item.label}
                                    </BreadcrumbLink>
                                )
                            ) : (
                                <BreadcrumbPage>{item.label}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}