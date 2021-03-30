import React from 'react';
import styled from 'styled-components';
import colors from '../../colors';

const styles = {
  backgroundColor({ variant }) {
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'tertiary':
        return colors.tertiary;
      default:
        return colors.primary;
    }
  },
  hoverBackgroundColor({ variant }) {
    switch (variant) {
      case 'primary':
        return colors.primaryHover;
      case 'secondary':
        return colors.secondaryHover;
      case 'tertiary':
        return colors.tertiaryHover;
      default:
        return colors.primaryHover;
    }
  },
  activeBackgroundColor({ variant }) {
    switch (variant) {
      case 'primary':
        return colors.primaryActive;
      case 'secondary':
        return colors.secondaryActive;
      case 'tertiary':
        return colors.tertiary;
      default:
        return colors.primary;
    }
  },
  border({ variant }) {
    switch (variant) {
      case 'primary':
        return '2px solid red';
      case 'secondary':
        return '2px solid blue';
      case 'tertiary':
        return '1px';
      default:
        return '5px solid yellow';
    }
  },
  color({ variant }) {
    switch (variant) {
      case 'primary':
        return colors.primaryText;
      case 'secondary':
        return colors.secondaryText;
      case 'tertiary':
        return colors.primary;
      default:
        return '#000';
    }
  },
  hoverColor({ variant }) {
    switch (variant) {
      case 'primary':
        return colors.primaryHoverText;
      case 'secondary':
        return colors.secondaryHoverText;
      case 'tertiary':
        return colors.primary;
      default:
        return '#000';
    }
  },
  padding({ size }) {
    switch (size) {
      case 'small':
        return '10px 14px';
      default:
        return '10px 25px';
    }
  },
  width({ width }) {
    if (width) {
      return width;
    } else {
      return null;
    }
  },
};

const StyledButton = styled.button`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 18px;
  background-color: ${styles.backgroundColor};
  border-radius: 100px;
  border: none;
  box-sizing: border-box;
  color: ${styles.color};
  cursor: pointer;
  outline: none;
  width: ${styles.width};
  padding: ${styles.padding};
  transition-property: all;
  transition-duration: 0.3s;
  &:hover {
    color: ${styles.hoverColor};
    background-color: ${styles.hoverBackgroundColor};
  }
  &:active {
    color: ${styles.hoverColor};
    background-color: ${styles.activeBackgroundColor};
  }
`;

const Button = ({
  onClick,
  variant,
  customClass,
  size,
  label,
  props,
  type,
  width = '',
}) => {
  return (
    <StyledButton
      size={size}
      variant={variant}
      type={type}
      className={customClass}
      {...props}
      onClick={onClick}
      width={width}
    >
      {label}
    </StyledButton>
  );
};

export default Button;
