import {
  Input as ChakraInput,
  InputAddonProps,
  InputElementProps,
  InputGroup,
  InputGroupProps,
  InputLeftAddon,
  InputLeftElement,
  InputProps,
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/react";
import * as React from "react";
import { OBJECT } from "~/constants";
import { IBase } from "~/types";

interface IInputProps extends IBase {
  containerProps?: InputGroupProps;
  inputProps: InputProps;
  leftAddonProps?: InputAddonProps;
  leftElementProps?: InputElementProps;
  rightAddonProps?: InputAddonProps;
  rightElementProps?: InputElementProps;
}

export function Input(props: IInputProps) {
  const {
    containerProps,
    inputProps,
    leftAddonProps,
    rightAddonProps,
    leftElementProps,
    rightElementProps,
    ...rest
  } = props;
  return (
    <InputGroup {...containerProps}>
      {Object.keys(leftAddonProps || OBJECT.EMPTY).length > 0 && (
        <InputLeftAddon {...leftAddonProps} />
      )}
      {Object.keys(leftElementProps || OBJECT.EMPTY).length > 0 && (
        <InputLeftElement {...leftElementProps} />
      )}
      <ChakraInput {...inputProps} />
      {Object.keys(rightElementProps || OBJECT.EMPTY).length > 0 && (
        <InputRightElement {...rightElementProps} />
      )}
      {Object.keys(rightAddonProps || OBJECT.EMPTY).length > 0 && (
        <InputRightAddon {...rightAddonProps} />
      )}
    </InputGroup>
  );
}
