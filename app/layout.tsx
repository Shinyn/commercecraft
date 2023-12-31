import './globals.css';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Commerce Craft - E-commerce dashboard',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex justify-left">
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
