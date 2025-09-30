'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createLocalizedHref, getLocaleFromPath } from '@/lib/routing';

interface LocaleLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  locale?: string; // Optional: force specific locale
}

export function LocaleLink({ 
  href, 
  children, 
  className, 
  onClick, 
  target, 
  rel, 
  locale 
}: LocaleLinkProps) {
  const pathname = usePathname();
  
  // Get current locale from pathname or use provided locale
  const currentLocale = locale || getLocaleFromPath(pathname) || 'en';
  
  // Create localized href
  const localizedHref = createLocalizedHref(href, currentLocale);
  
  return (
    <Link
      href={localizedHref}
      className={className}
      onClick={onClick}
      target={target}
      rel={rel}
    >
      {children}
    </Link>
  );
}

export default LocaleLink;