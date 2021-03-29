import React from 'react';

import Title from './Title';

const story = {
  title: 'Title',
  component: Title,
};

export default story;

const Template = (args) => <Title value={'This is a Title.'} />;

export const Default = Template.bind({});
Default.args = {
  value: 'This is a title',
};
