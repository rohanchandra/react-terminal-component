import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/ReactTerminal.js');
  require('../stories/ReactTerminal_state.js');
  require('../stories/ReactTerminal_prompt.js');
  require('../stories/ReactTerminal_themes.js');
  require('../stories/ReactTerminal_output.js');
}

configure(loadStories, module);
