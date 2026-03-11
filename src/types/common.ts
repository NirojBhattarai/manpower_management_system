export interface IBreadcrumbProps {
  Navone: string;
  Navtwo: string;
}

export interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export interface ISearchSectionProps {
  showAdjustmentIcon: boolean;
  styleClass?: string;
  search?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
}
