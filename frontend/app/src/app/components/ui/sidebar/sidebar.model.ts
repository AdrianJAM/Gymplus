export interface SidebarMenuItem{
    icon: string;
    label: string;
    route: string;
}

export interface SidebarConfig{
    title: string;
    menuItems: SidebarMenuItem[];
}