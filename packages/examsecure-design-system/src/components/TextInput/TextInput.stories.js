import React from 'react';

import TextInput from './TextInput';

const story = {
  title: 'TextInput',
  component: TextInput,
};

export default story;

const Template = (args) => <TextInput onChange={() => {}} {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Sample Label',
};
