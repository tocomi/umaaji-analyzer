import * as Tabs from '@radix-ui/react-tabs';
import { FC, ReactNode, memo } from 'react';

type Props = {
  titles: string[];
  contents: ReactNode[];
};

export const PlaceTabs: FC<Props> = memo(function PlaceTabs({
  titles,
  contents,
}) {
  return (
    <Tabs.Root className="TabsRoot" defaultValue="tab1">
      <Tabs.List className="TabsList" aria-label="Manage your places">
        {titles.map((title, index) => (
          <Tabs.Trigger
            key={title}
            value={`tab${index + 1}`}
            className="TabsTrigger"
          >
            {title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {contents.map((content, index) => (
        <Tabs.Content
          key={index}
          value={`tab${index + 1}`}
          className="TabsContent"
        >
          {content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
});
