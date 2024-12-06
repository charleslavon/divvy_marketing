'use client';

import { PagodaUiProvider, Toaster } from '@near-pagoda/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
import s from './RootLayout.module.scss';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div lang="en" suppressHydrationWarning className={s.wrapper}>
      <PagodaUiProvider
        value={{
          Link,
          useRouter,
        }}
      >
        <Header />
        <Toaster />
        <main>{children}</main>
        <Footer />
      </PagodaUiProvider>
    </div>
  );
}
