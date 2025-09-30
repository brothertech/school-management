import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { UnreadProvider } from '@/context/UnreadContext';
import { SettingsProvider } from '@/context/SettingsContext';
import { ReduxProvider } from '@/components/providers/ReduxProvider';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`} suppressHydrationWarning={true}>
        <ReduxProvider>
          <ThemeProvider>
            <SettingsProvider>
              <AuthProvider>
                <UnreadProvider>
                  <SidebarProvider>{children}</SidebarProvider>
                </UnreadProvider>
              </AuthProvider>
            </SettingsProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
