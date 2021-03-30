import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import fontSize from '../../fontSize';
import lineHeight from '../../lineHeight';
import colors from '../../colors';
import Label from './Label';
import AccessoryText from './AccessoryText';
import AccessoryIcon from './AccessoryIcon';

const Line = styled.div`
  height: 1px;
  width: 100%;
`;

const styles = {
  textInput: {
    padding() {
      return [0];
    },
    color({ disabled }) {
      if (disabled) {
        return colors.grayText;
      }
      return colors.text;
    },
  },
  fillContainer: {
    backgroundColor({ isFocused, theme, disabled }) {
      return 'transparent';
    },
    hoverBackgroundColor({ variant, theme, disabled }) {
      return '';
    },
    height() {
      return 'auto';
    },
    padding() {
      return [0, 0, 1, 0];
    },
  },
  inputContainer: {
    width({ width }) {
      return '100%';
    },
  },
  line: {
    backgroundColor({ disabled, hasError, state }) {
      if (disabled) {
        return colors.grayText;
      }
      if (hasError) {
        return colors.red;
      }
      switch (state) {
        case 'hover':
          return colors.slate['960'];
        case 'focus':
          return colors.primary;
        default:
          return colors.slate['940'];
      }
    },
  },
};

const FillContainer = styled.div`
  position: relative;
  background-color: ${styles.fillContainer.backgroundColor};
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  margin-top: auto;
  box-sizing: border-box;
  &:hover {
    background-color: ${styles.fillContainer.hoverBackgroundColor};
  }
`;

const StyledInput = styled.input`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: ${fontSize.medium};
  line-height: ${lineHeight.medium};
  color: ${styles.textInput.color};
  border: none;
  background-color: transparent;
  pointer-events: ${(props) => (props.disabled ? 'none' : '')};
  resize: none;
  width: 100%;
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
  }
  &::selection {
    background-color: ${colors.primaryPallete['940']};
  }
  /* Removes red box shadow rectangle on firefox */
  &:invalid {
    box-shadow: none;
  }
  &&& {
    &::placeholder {
      color: ${colors.grayText};
    }
  }
`;

const InputFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextInput = ({
  placeholder,
  onChange,
  onBlur,
  helpText,
  errorText,
  prefix,
  suffix,
  disabled,
  value,
  iconLeft,
  iconRight,
  label,
  labelPosition,
  width,
  type,
  id,
  name,
  ...rest
}) => {
  const inputRef = useRef();
  const containerRef = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState(value || '');
  const [layoutDimensions, setLayoutDimensions] = useState(null);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(undefined);

  const hasText = input ? true : false;

  const placeholderTextColor = getPlaceholderTextColor({
    disabled,
    isPlaceholderVisible,
  });

  const {
    hasError,
    hasPrefix,
    hasSuffix,
    hasLeftIcon,
    hasRightIcon,
  } = getAccessoryConfig({
    errorText,
    prefix,
    suffix,
    iconLeft,
    iconRight,
  });

  const onFocus = useCallback(() => {
    setIsFocused(true);

    setTimeout(() => {
      setIsPlaceholderVisible(true);
    }, 90);
  }, [setIsFocused, setIsPlaceholderVisible]);

  const onBlurText = useCallback(
    (e) => {
      setIsFocused(false);
      setIsPlaceholderVisible(false);
      const inputValue = e.target.value;
      setInput(inputValue);
      onBlur(inputValue);
    },
    [onBlur],
  );

  const onChangeText = useCallback(
    (e) => {
      const inputValue = e.target.value;
      setInput(inputValue);
      onChange(inputValue);
    },
    [onChange],
  );

  useEffect(() => {
    if (value === '' || value) {
      setInput(value);
    }
  }, [value]);

  useEffect(() => {
    if (inputRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const inputRect = inputRef.current.getBoundingClientRect();
      const initialLeftPosition = inputRect.x - containerRect.x;
      const finalTopPosition = inputRef.current.offsetHeight;

      setLayoutDimensions({
        initialLeftPosition,
        finalTopPosition,
      });
    }
  }, [inputRef, containerRef]);

  return (
    <div ref={containerRef}>
      <InteractionContainer disabled={disabled} hasError={hasError}>
        <FillContainer isFocused={isFocused} disabled={disabled}>
          {layoutDimensions ? (
            <Label
              disabled={disabled}
              id={id}
              hasError={hasError}
              hasText={hasText}
              layoutDimensions={layoutDimensions}
              isFocused={isFocused}
              position={labelPosition}
              value={input}
              width={width}
              iconLeft={iconLeft}
            >
              {label}
            </Label>
          ) : null}
          <InputFlex>
            {hasPrefix ? (
              <AccessoryText
                position="left"
                disabled={disabled}
                isFocused={isFocused}
              >
                {prefix}
              </AccessoryText>
            ) : null}
            {hasLeftIcon ? (
              <AccessoryIcon
                name={iconLeft}
                disabled={disabled}
                hasError={hasError}
                isFocused={isFocused}
                position="left"
              />
            ) : null}
            <StyledInput
              id={id}
              name={name}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              onFocus={onFocus}
              onBlur={onBlurText}
              onChange={onChangeText}
              hasText={hasText}
              disabled={disabled}
              hasPrefix={hasPrefix}
              hasLeftIcon={hasLeftIcon}
              value={input}
              as={'input'}
              ref={inputRef}
              type={type}
              {...rest}
            />
          </InputFlex>
        </FillContainer>
        <Line isFocused={isFocused} hasError={hasError} disabled={disabled} />
      </InteractionContainer>
    </div>
  );
};

const getPlaceholderTextColor = ({ disabled, isPlaceholderVisible }) => {
  if (isPlaceholderVisible) {
    if (disabled) {
      return colors.grayText;
    }
    return colors.darkGrayText;
  }
  return 'transparent';
};

const getAccessoryConfig = ({
  errorText,
  prefix,
  suffix,
  iconLeft,
  iconRight,
}) => {
  const hasError = !!errorText;
  const hasPrefix = !!prefix;
  const hasSuffix = !!suffix;
  const hasLeftIcon = !hasPrefix && !!iconLeft;
  const hasRightIcon = !hasSuffix && !!iconRight;
  return { hasError, hasPrefix, hasSuffix, hasLeftIcon, hasRightIcon };
};

const InteractionContainer = styled.div`
  ${Line} {
    background-color: ${(props) =>
      styles.line.backgroundColor({ ...props, state: '' })};
  }
  &:hover {
    ${Line} {
      background-color: ${(props) =>
        styles.line.backgroundColor({ ...props, state: 'hover' })};
    }
  }
  &:focus-within {
    ${Line} {
      background-color: ${(props) =>
        styles.line.backgroundColor({ ...props, state: 'focus' })};
    }
  }
`;

export default TextInput;
