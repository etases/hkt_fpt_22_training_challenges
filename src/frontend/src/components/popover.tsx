import {
  Popover as ChakraPopover,
  PopoverArrow,
  PopoverArrowProps,
  PopoverBody,
  PopoverBodyProps,
  PopoverCloseButton,
  PopoverCloseButtonProps,
  PopoverContent,
  PopoverContentProps,
  PopoverFooter,
  PopoverFooterProps,
  PopoverHeader,
  PopoverHeaderProps,
  PopoverProps as ChakraPopoverProps,
  PopoverTrigger,
} from "@chakra-ui/react";
import * as React from "react";
import { HTMLProps } from "react";
import { IBase } from "~/types";

interface PopoverProps extends IBase {
  popoverTriggerProps: HTMLProps<any>;
  popoverBodyProps: PopoverBodyProps;
  popoverProps?: ChakraPopoverProps;
  popoverContentProps?: PopoverContentProps;
  popoverArrowProps?: PopoverArrowProps;
  popoverHeaderProps?: PopoverHeaderProps;
  popoverFooterProps?: PopoverFooterProps;
  popoverCloseButtonProps?: PopoverCloseButtonProps;
}

export function Popover(props: PopoverProps) {
  const {
    popoverProps,
    popoverBodyProps,
    popoverArrowProps,
    popoverHeaderProps,
    popoverFooterProps,
    popoverTriggerProps,
    popoverContentProps,
    popoverCloseButtonProps,
  } = props;
  return (
    <ChakraPopover {...popoverProps}>
      <PopoverTrigger {...popoverTriggerProps} />
      <PopoverContent {...popoverContentProps}>
        <PopoverArrow {...popoverArrowProps} />
        <PopoverHeader {...popoverHeaderProps} />
        <PopoverCloseButton {...popoverCloseButtonProps} />
        <PopoverBody {...popoverBodyProps} />
        <PopoverFooter {...popoverFooterProps} />
      </PopoverContent>
    </ChakraPopover>
  );
}
