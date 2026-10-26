import type { Metadata } from 'next';

import { pageMetadata, siteTitle, siteDescription } from '@/app/site-metadata';

export const metadata: Metadata = {
  ...pageMetadata(siteTitle, siteDescription, '/'),
  title: { absolute: siteTitle },
};

export default function BrowsePage() {
  return null;
}
