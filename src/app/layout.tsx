import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster"
import { getSiteSettings } from '@/lib/data-loader';
import { Background } from '@/components/background';


export const metadata: Metadata = {
  title: 'Profolio | Your Professional Showcase',
  description: 'A personal portfolio site to showcase your best work.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        <Background backgroundUrl={siteSettings.backgroundUrl} />
        <div className="relative z-10 flex min-h-screen flex-col bg-background/80 supports-[backdrop-filter]:bg-background/60 supports-[backdrop-filter]:backdrop-blur-sm">
          <Header settings={siteSettings} />
          <main className="flex-grow">{children}</main>
          <Footer settings={siteSettings} />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
