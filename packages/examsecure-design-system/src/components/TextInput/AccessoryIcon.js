import React from 'react';
import styled from 'styled-components';
import * as icons from 'react-feather';
import { color } from '@storybook/theming';
import colors from '../../colors';

const styles = {
  padding({ position }) {
    let padding = [0];
    if (position === 'left') {
      padding = '2px 8px 0 0';
    }
    if (position === 'right') {
      padding = '2px, 8px, 0, 8px';
    }
    return padding;
  },
  color({ disabled, hasError, isFocused }) {
    if (disabled) {
      return colors.secondaryActive;
    }
    if (hasError) {
      return colors.red['900'];
    }
    if (isFocused) {
      return colors.slate['960'];
    }
    return colors.slate['950'];
  },
};

const StyledIconComponent = styled.div`
  padding: ${styles.padding};
`;

const AccessoryIcon = ({ name, disabled, hasError, isFocused, position }) => {
  const IconComponent = icons[name];
  return (
    <StyledIconComponent
      disabled={disabled}
      hasError={hasError}
      isFocused={isFocused}
      position={position}
    >
      <IconComponent
        color={styles.color({ disabled, hasError, isFocused })}
        size={24}
        style={{ padding: '0px 1px 3px 1px' }}
      />
    </StyledIconComponent>
  );
};

export default AccessoryIcon;
