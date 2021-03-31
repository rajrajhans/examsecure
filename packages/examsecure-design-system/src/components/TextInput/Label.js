import React from 'react';
import styled from 'styled-components';
import colors from '../../colors';
import fontSize from '../../fontSize';
import lineHeight from '../../lineHeight';

const styles = {
  text: {
    color({ isFocused, hasError, disabled }) {
      if (disabled) {
        return 'gray';
      }
      if (hasError) {
        return 'red';
      }
      if (isFocused) {
        return colors.primary;
      } else {
        return colors.slate['960'];
      }
    },
    fontSize({ isFocused, hasText, position, width }) {
      if (!(isFocused || hasText)) {
        return fontSize.medium;
      }
      if (position === 'left' && width !== 'small') {
        return fontSize.medium;
      } else {
        return fontSize.small;
      }
    },
    lineHeight({ isFocused, hasText, position, width }) {
      if (!(isFocused || hasText)) {
        return lineHeight.medium;
      }
      if (position === 'left' && width !== 'small') {
        return lineHeight.medium;
      }
      return lineHeight.small;
    },
  },
  label: {
    margin({ position, variant }) {
      if (position === 'left') {
        return [1, 3, 1, 0];
      } else if (position === 'top') {
        return [0, 0, 0.5, 0];
      }
      return [0];
    },
  },
};

const FloatView = styled.div`
  position: absolute;
  will-change: transform;
  transition: transform 0.1s ease-in;
  top: ${(props) => (props.iconLeft ? '2px' : '2px')};
  left: ${(props) => props.layoutDimensions.initialLeftPosition}px;
  pointer-events: none;
`;

const StyledText = styled.div`
  display: flex;
  font-size: ${styles.text.fontSize};
  line-height: ${styles.text.lineHeight};
  color: ${styles.text.color};
  transition: font-size 0.1s ease-in, line-height 0.1s ease-in,
    color 0.1s ease-in;
`;

const Label = ({
  children,
  position,
  disabled,
  isFocused,
  hasError,
  value,
  hasText,
  layoutDimensions,
  width,
  id,
  iconLeft,
}) => {
  const floatViewAnimationStyle = getFloatViewAnimationStyle({
    isFocused,
    hasText,
    layoutDimensions,
  });
  return (
    <FloatView
      layoutDimensions={layoutDimensions}
      style={floatViewAnimationStyle}
      iconLeft={iconLeft}
    >
      <StyledText
        as={'label'}
        htmlFor={id}
        isFocused={isFocused}
        hasError={hasError}
        hasText={hasText}
        disabled={disabled}
        value={value}
        position={position}
        width={width}
      >
        {children}
      </StyledText>
    </FloatView>
  );
};

export default Label;
const getFloatViewAnimationStyle = ({
  isFocused,
  hasText,
  layoutDimensions,
}) => {
  const finalTopPosition = layoutDimensions.finalTopPosition;
  const finalLeftPosition = layoutDimensions.initialLeftPosition;

  return isFocused || hasText
    ? {
        transform: `translate(-${finalLeftPosition}px, -${finalTopPosition}px)`,
      }
    : {};
};
