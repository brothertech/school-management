'use client';

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";

interface BreadcrumbProps {
  pageTitle: string;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle }) => {
  const pathname = usePathname();
  const { t } = useTranslation();

  // Derive the last non-empty segment of the current path
  const segments = (pathname || "").split("/").filter(Boolean);
  const lastSegment = segments.length > 0 ? segments[segments.length - 1] : "";

  // Compute title from pages.<segment> with fallback to provided pageTitle
  const resolvedTitle = lastSegment
    ? t(`pages.${lastSegment}`, pageTitle)
    : pageTitle;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90" x-text="pageName">
        {resolvedTitle}
      </h2>
      <nav>
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              href="/"
            >
              {t("navigation.home")}
              <svg
                className="stroke-current"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li className="text-sm text-gray-800 dark:text-white/90">{resolvedTitle}</li>
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
