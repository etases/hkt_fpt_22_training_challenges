import {
  NumberDecrementStepper,
  NumberDecrementStepperProps,
  NumberIncrementStepper,
  NumberIncrementStepperProps,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputFieldProps,
  NumberInputProps,
  NumberInputStepper,
  NumberInputStepperProps,
} from "@chakra-ui/react";
import * as React from "react";
import { IBase } from "~/types";

interface INumberInputProps extends IBase {
  inputProps: NumberInputProps;
  inputFieldProps?: NumberInputFieldProps;
  stepperProps?: NumberInputStepperProps;
  incrementStepperProps?: NumberIncrementStepperProps;
  decrementStepperProps?: NumberDecrementStepperProps;
}

export function NumberInput(props: INumberInputProps) {
  const {
    inputProps,
    inputFieldProps,
    stepperProps,
    incrementStepperProps,
    decrementStepperProps,
    ...rest
  } = props;
  return (
    <ChakraNumberInput {...inputProps}>
      <NumberInputField {...inputFieldProps} />
      <NumberInputStepper {...stepperProps}>
        <NumberIncrementStepper {...incrementStepperProps} />
        <NumberDecrementStepper {...decrementStepperProps} />
      </NumberInputStepper>
    </ChakraNumberInput>
  );
}
