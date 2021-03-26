import React from 'react';
import Button from './Button';

const story = {
  title: 'Button',
  component: Button,
};

export default story;

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Button',
  variant: 'primary',
  size: 'medium',
};

export const Secondary = Template.bind({});
Secondary.args = {
  size: 'medium',
  variant: 'secondary',
  label: 'Secondary Button',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  size: 'medium',
  variant: 'tertiary',
  label: 'Tertiary Button',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  variant: 'primary',
  label: 'Medium Primary Button',
  width: '200px',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  variant: 'primary',
  label: 'Small Primary Button',
};
