import * as Tabs from '@radix-ui/react-tabs';
import { FC, ReactNode, memo } from 'react';
import { css } from '../../../styled-system/css';
import { stack } from '../../../styled-system/patterns';

type Props = {
  titles: string[];
  contents: ReactNode[];
};

export const PlaceTabs: FC<Props> = memo(function PlaceTabs({
  titles,
  contents,
}) {
  return (
    <Tabs.Root defaultValue="tab1">
      <Tabs.List
        className={stack({
          direction: 'row',
          gap: 1,
        })}
        aria-label="race places"
      >
        {titles.map((title, index) => (
          <Tabs.Trigger
            key={title}
            value={`tab${index + 1}`}
            className={css({
              w: '100%',
              p: 2,
              '&[data-state=active]': {
                fontWeight: 'bold',
                color: 'cyan.700',
                borderBottomWidth: 2,
                borderBottomColor: 'cyan.700',
              },
            })}
          >
            {title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {contents.map((content, index) => (
        <Tabs.Content
          key={index}
          value={`tab${index + 1}`}
          className={css({ pt: 2 })}
        >
          {content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
});
