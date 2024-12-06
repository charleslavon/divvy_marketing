import type { ReactElement } from 'react';

import RootLayout from '@/components/layouts/RootLayout';

export function useDefaultLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
}
