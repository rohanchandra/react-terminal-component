import React from 'react';
import { storiesOf } from '@storybook/react';

import ReactTerminal from 'ReactTerminal';
import ReactThemes from 'themes';

const demoThemeProps = {
  inputStr: 'echo command text looks like this'
};

storiesOf('ReactTerminal - Themes', module)
  .add('with default theme', () => (
    <ReactTerminal {...demoThemeProps} />
  ))
  .add('with custom height and width', () => (
    <ReactTerminal theme={{ ...ReactThemes.default, height: '25vh', width: '50%' }} {...demoThemeProps} />
  ))
  .add('with Magpie theme', () => (
    <ReactTerminal theme={ReactThemes.magpie} {...demoThemeProps} />
  ))
  .add('with Ember theme', () => (
    <ReactTerminal theme={ReactThemes.ember} {...demoThemeProps} />
  ))
  .add('with Dye theme', () => (
    <ReactTerminal theme={ReactThemes.dye} {...demoThemeProps} />
  ))
  .add('with Forest theme', () => (
    <ReactTerminal theme={ReactThemes.forest} {...demoThemeProps} />
  ))
  .add('with Hacker theme', () => (
    <ReactTerminal theme={ReactThemes.hacker} {...demoThemeProps} />
  ))
  .add('with Sea theme', () => (
    <ReactTerminal theme={ReactThemes.sea} {...demoThemeProps} />
  ))
  .add('with Light theme', () => (
    <ReactTerminal theme={ReactThemes.light} {...demoThemeProps} />
  ));
