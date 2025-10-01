"use client";
import React, { useEffect, useRef, useState,useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
  UserIcon,
  GroupIcon,
  FileIcon,
  DollarLineIcon,
  DocsIcon,
  FolderIcon,
  PencilIcon,
  ChatIcon,
} from "../icons/index";
import { BellIcon } from "lucide-react";
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from "@/context/AuthContext";


// Ensure props type is declared before use
interface AppSidebarProps {
  groupsUnreadCount?: number;
}


type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  badge?: number;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const AppSidebar: React.FC<AppSidebarProps> = ({ groupsUnreadCount = 0 }) => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const { t } = useTranslation();
  const { user, isModuleVisible } = useAuth();

  // Function to filter navigation items based on user's module visibility
  const filterNavItems = (items: NavItem[]): NavItem[] => {
    if (!user?.module_visibility) return items;

    return items.filter((item) => {
      // Map navigation items to module visibility keys
      const moduleMap: Record<string, string> = {
        'Students': 'students',
        'Teachers': 'teachers',
        'Classes': 'classes',
        'Subjects': 'subjects',
        'Exams': 'exams',
        'Timetable': 'timetable',
        'Attendance': 'attendance',
        'Fees': 'fees',
        'Library': 'library',
        'Transport': 'transport',
        'Messaging': 'messaging',
        'Groups': 'groups',
        'Announcements': 'announcements',
        'Parent Portal': 'parent_portal',
        'Student Portal': 'student_portal',
        'Reports': 'reports',
        'CBT': 'cbt',
        'Recruitment': 'recruitment',
        'Question Bank': 'cbt', // Question Bank is part of CBT module
      };

      const moduleKey = moduleMap[item.name];
      
      // Always show Dashboard and Settings
      if (item.name === 'Dashboard' || item.name === 'Private Dashboard' || item.name === 'Settings') {
        return true;
      }

      // If no module mapping exists, show the item (for custom items)
      if (!moduleKey) return true;

      // Check if user has access to this module using the AuthContext helper
      return isModuleVisible(moduleKey as any);
    });
  };

  const navItems: NavItem[] = filterNavItems([
    // Super Admin gets both dashboards
    ...(user?.roles?.includes('Super Admin')
      ? [
        {
          icon: <GridIcon />,
          name: 'Dashboard',
          subItems: [
            { name: 'Private Dashboard', path: "/" },
            { name: 'Advanced Dashboard', path: "/advanced-dashboard" },
          ],
        },
      ]
      : []),
    
    // Admin-only dashboard (explicit Admin Dashboard)
    ...(user?.primary_role === 'Admin' && !user?.roles?.includes('Super Admin')
      ? [
        {
          icon: <GridIcon />,
          name: 'Dashboard',
          subItems: [
            { name: 'Private Dashboard', path: "/" },
            { name: 'Admin Dashboard', path: "/admin-dashboard" },
          ],
        },
      ]
      : []),
    
    // Private (role-based) dashboard for everyone else
    ...(user?.primary_role === 'Student' ? [
      {
        icon: <GridIcon />,
        name: 'Private Dashboard',
        path: "/students",
      }
    ] : []),
    // Private (role-based) dashboard for everyone else
    ...(user?.primary_role === 'Teacher' ? [
      {
        icon: <GridIcon />,
        name: 'Private Dashboard',
        path: "/",
      }
    ] : []),
    ...(user?.primary_role === 'Parent' ? [
      {
        icon: <GridIcon />,
        name: 'Private Dashboard',
        path: "/parent-portal",
      }
    ] : []),
    
    {
      icon: <GroupIcon />,
      name: 'Students',
      path: "/students",
    },
    {
      icon: <UserCircleIcon />,
      name: 'Teachers',
      path: "/teachers",
    },
    {
      icon: <FileIcon />,
      name: 'Classes',
      path: "/classes",
    },
    {
      icon: <DocsIcon />,
      name: 'Subjects',
      path: "/subjects",
    },
    {
      icon: <FileIcon />,
      name: 'Exams',
      path: "/exams",
    },
    {
      icon: <CalenderIcon />,
      name: 'Timetable',
      path: "/timetable",
    },
    {
      icon: <ListIcon />,
      name: 'Attendance',
      path: "/attendance",
    },
    {
      icon: <DollarLineIcon />,
      name: 'Fees',
      path: "/fees",
    },
    {
      icon: <BellIcon/>,
      name: 'Announcements',
      path: "/announcements",
    },
    {
      icon: <ChatIcon />,
      name: 'Messaging',
      path: "/messaging",
    },
    {
      icon: <GroupIcon />,
      name: 'Groups',
      path: "/groups",
      badge: groupsUnreadCount > 0 ? groupsUnreadCount : undefined,
    },
    {
      icon: <FileIcon />,
      name: 'Question Bank',
      path: "/question-bank",
    },
    {
      icon: <UserCircleIcon />,
      name: 'Recruitment',
      subItems: [
        { name: 'Job Openings', path: "/recruitment/job-openings" },
        { name: 'Candidates', path: "/recruitment/candidates" },
        { name: 'Analytics', path: "/recruitment/analytics" },  
      ],
    },
  ]);

const othersItems: NavItem[] = filterNavItems([
  {
    icon: <DocsIcon />,
    name: 'Library',
    path: "/library",
  },
  {
    icon: <FolderIcon />,
    name: 'Transport',
    path: "/transport",
  },
  {
    icon: <PieChartIcon />,
    name: 'Reports',
    path: "/reports",
  },
  // {
  //   icon: <UserCircleIcon />,
  //   name: 'Parent Portal',
  //   path: "/parent-portal",
  // },
  {
    icon: <UserIcon />,
    name: 'Student Portal',
    path: "/student-portal",
  },
  {
    icon: <PencilIcon />,
    name: 'Settings',
    subItems: user?.roles?.includes('Super Admin') || user?.primary_role === 'Admin'
      ? [
          { name: 'System Settings', path: "/settings" },
          { name: 'User Settings', path: "/user-settings" },
        ]
      : [
          { name: 'User Settings', path: "/user-settings" },
        ],
  },
]);

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
              <div className="flex items-center">
                {nav.badge !== undefined && (
                  <span className="ml-auto mr-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {nav.badge}
                  </span>
                )}
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              </div>
            )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <div className="flex items-center justify-between flex-1">
                    <span className={`menu-item-text`}>{nav.name}</span>
                    {nav.badge !== undefined && (
                      <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {nav.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;
   const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname,isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="flex items-center gap-2">
             <div>
               <Image
                className="dark:hidden"
                src="/images/logo/logo.png"
                alt="Logo"
                width={40}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo.png"
                alt="Logo"
                width={40}
                height={40}
              />
             </div>
             <h1 className="text-2xl font-bold">MySchool</h1>
            </div>
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
       
      </div>
    </aside>
  );
};

export default AppSidebar;
