import { day_1 as DayOneCanister } from "@canisters/day_1";
import {
  Box,
  CircularProgress,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { useComponentDidMount, useDebounce } from "~/hooks";
import { IBase } from "~/types";

interface AddProps extends IBase {
  canister: typeof DayOneCanister;
}

export function Add(props: AddProps) {
  const { canister } = props;

  const componentDidMount = useComponentDidMount();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [add, setAdd] = useState<IBase>({
    m: 0,
    n: 0,
    result: 0,
  });

  const mDebounce = useDebounce(add.m, 1000);
  const nDebounce = useDebounce(add.n, 1000);

  useEffect(() => {
    if (componentDidMount) {
      setIsLoading(true);
      const result = canister
        .add(BigInt(add.m), BigInt(add.n))
        .then((result) => {
          setAdd((prev) => ({ ...prev, result: parseInt(result.toString()) }));
        })
        .catch((error) => {})
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [mDebounce, nDebounce]);

  return (
    <Flex>
      <Box alignSelf={"center"} justifySelf={"center"}>
        <Text>Add</Text>
      </Box>
      <Spacer />
      <Box>
        <NumberInput
          placeholder="m"
          min={-100}
          max={100}
          value={add.m}
          onChange={(value) => {
            setAdd((prev) => ({ ...prev, m: parseInt(value) }));
          }}
          isReadOnly={isLoading}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
      <Spacer />
      <Box>
        <NumberInput
          min={-100}
          max={100}
          placeholder="n"
          value={add.n}
          onChange={(value) =>
            setAdd((prev) => ({ ...prev, n: parseInt(value) }))
          }
          isReadOnly={isLoading}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
      <Spacer />
      <Box>
        <InputGroup>
          <Input placeholder={"result"} isReadOnly={true} value={add?.result} />
          <InputRightElement>
            <CircularProgress
              isIndeterminate={isLoading}
              value={100}
              size={5}
            />
          </InputRightElement>
        </InputGroup>
      </Box>
    </Flex>
  );
}
