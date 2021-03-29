import React from 'react';

import WhiteCard from './WhiteCard';

const story = {
  title: 'WhiteCard',
  component: WhiteCard,
};

export default story;

const Template = (args) => (
  <>
    <div style={{ marginBottom: '20px' }}>
      A simple card background, mainly for the sign in and sign up screens
    </div>
    <WhiteCard {...args} />
  </>
);

const DummyChildren = () => (
  <div
    style={{ marginTop: '150px', marginBottom: '150px', textAlign: 'center' }}
  >
    dummy
  </div>
);

export const DefaultWhiteCard = Template.bind({});
DefaultWhiteCard.args = {
  children: <DummyChildren />,
};
