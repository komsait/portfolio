import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Khaled Tahoon | Software Engineer & Innovator',
  description: 'Software Engineer, Student, and Innovator specializing in Flutter, Python, Machine Learning, and modern web technologies. Building the future one line of code at a time.',
  keywords: ['Software Engineer', 'Flutter Developer', 'Machine Learning', 'Python', 'Computer Vision', 'UTM Student'],
  authors: [{ name: 'Khaled Tahoon' }],
  creator: 'Khaled Tahoon',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tahoonkhaled.com',
    title: 'Khaled Tahoon | Software Engineer & Innovator',
    description: 'Software Engineer, Student, and Innovator specializing in Flutter, Python, Machine Learning, and modern web technologies.',
    siteName: 'Khaled Tahoon Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khaled Tahoon | Software Engineer & Innovator',
    description: 'Software Engineer, Student, and Innovator specializing in Flutter, Python, Machine Learning, and modern web technologies.',
    creator: '@khaledtahoon',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans bg-gray-950 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}