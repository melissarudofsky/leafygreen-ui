import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, number } from '@storybook/addon-knobs';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Menu, MenuSeparator, SubMenu, MenuItem } from '.';
import { Align, Justify } from '@leafygreen-ui/popover';
import Icon from '@leafygreen-ui/icon';

function Uncontrolled() {
  return (
    <LeafyGreenProvider>
      <Menu
        align={select('Align', Object.values(Align), Align.Bottom)}
        justify={select('Justify', Object.values(Justify), Justify.Start)}
        trigger={<button>trigger</button>}
        spacing={number('spacing', 15)}
      >
        <MenuItem
          active
          size={select('Size', ['default', 'large'], 'default')}
          glyph={<Icon glyph="Cloud" />}
        >
          Active Menu Item
        </MenuItem>
        <MenuItem description="I am also a description">
          Menu Item With Description
        </MenuItem>
        <MenuItem
          disabled={boolean('Disabled', true)}
          description="I am a description"
        >
          Disabled Menu Item
        </MenuItem>

        <MenuItem href="http://mongodb.design">I am a link!</MenuItem>
      </Menu>
    </LeafyGreenProvider>
  );
}

function Controlled() {
  const [open, setOpen] = useState(false);
  return (
    <LeafyGreenProvider>
      <button onClick={() => setOpen(!open)}>
        trigger
        <Menu
          align={select('Align', Object.values(Align), Align.Bottom)}
          justify={select('Justify', Object.values(Justify), Justify.Start)}
          open={open}
          setOpen={setOpen}
        >
          <MenuItem
            active
            size={select('Size', ['default', 'large'], 'large')}
            glyph={<Icon glyph="Laptop" size="xlarge" />}
          >
            Active Menu Item
          </MenuItem>
          <MenuItem disabled={boolean('Disabled', true)} size="large">
            Disabled Menu Item
          </MenuItem>
          <MenuItem description="I am a description" size="large">
            Menu Item With Description
          </MenuItem>
          <MenuItem href="http://mongodb.design" size="large">
            I am a link!
          </MenuItem>
          <MenuSeparator />
          <MenuItem size="large">Left out of the MenuGroup</MenuItem>
        </Menu>
      </button>
    </LeafyGreenProvider>
  );
}

function SubMenuExample() {
  return (
    <LeafyGreenProvider>
      <Menu trigger={<button>trigger</button>}>
        <SubMenu
          title="Menu Item 1"
          description="https://google.com"
          glyph={<Icon glyph="Cloud" size="xlarge" />}
          active={true}
        >
          <MenuItem>SubMenu Item 1</MenuItem>
          <MenuItem>SubMenu Item 2</MenuItem>
        </SubMenu>
        <SubMenu
          title="Menu Item 2"
          description="https://google.com"
          glyph={<Icon glyph="Laptop" size="xlarge" />}
        >
          <MenuItem>Support 1</MenuItem>
        </SubMenu>
      </Menu>
    </LeafyGreenProvider>
  );
}

storiesOf('Menu', module)
  .add('Controlled', () => <Controlled />)
  .add('Uncontrolled', () => <Uncontrolled />)
  .add('With SubMenus', () => <SubMenuExample />);
