// @ts-ignore
import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import ReactQueryProvider from '@/providers/reactQuery';
import { ThemeProvider } from '@/components/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Digital Shop',
  description: 'digital shop to buy digital stuff',
};

export default function RootLayout({
  children, //slot for children
}: Readonly<{
  children: React.ReactNode;
  ads: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>
              <div>{children}</div>
              <Toaster />
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
