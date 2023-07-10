'use client';

import { Tabs as FbTabs } from 'flowbite-react';
import { FC, memo } from 'react';

type Props = {
  tabTitles: string[];
};

export const Tabs: FC<Props> = memo(function Tabs({ tabTitles }) {
  return (
    <FbTabs.Group
      aria-label="Tabs with underline"
      style="underline"
      className="bg-white"
    >
      {tabTitles.map((tabTitle) => (
        <FbTabs.Item key={tabTitle} title={tabTitle} className="w-full">
          <p></p>
        </FbTabs.Item>
      ))}
    </FbTabs.Group>
  );
});
