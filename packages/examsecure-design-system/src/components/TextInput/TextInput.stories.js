import React from 'react';

import TextInput from './TextInput';

const story = {
  title: 'TextInput',
  component: TextInput,
};

export default story;

const Template = (args) => (
  <TextInput
    onBlur={() => {}}
    onChange={(x) => {
      console.log(x);
    }}
    {...args}
  />
);

export const DefaultTextInput = Template.bind({});
DefaultTextInput.args = {
  label: 'Sample Label',
};

export const TextInputWithIcon = Template.bind({});
TextInputWithIcon.args = {
  label: 'Sample Label',
  iconLeft: 'User',
};
