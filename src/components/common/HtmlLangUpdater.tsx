'use client';

import { useEffect } from 'react';
import { useCurrentLocale } from './LocaleProvider';

export function HtmlLangUpdater() {
  const locale = useCurrentLocale();
  
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  
  return null;
}