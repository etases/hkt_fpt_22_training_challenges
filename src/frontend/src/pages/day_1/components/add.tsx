import { day_1 as DayOneCanister } from "@canisters/day_1";
import { Box, CircularProgress, Flex, Spacer, Text } from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { Input, NumberInput } from "~/components";
import { ALPHABET, BOOLEAN, DEBOUNCE, NUMBER } from "~/constants";
import { useComponentDidMount, useDebounce } from "~/hooks";
import { IBase } from "~/types";

const CIRCULAR_PROGRESS = {
  SIZE: 5,
};

const TEXT = {
  ADD: "Add",
  RESULT: "Result",
};

interface AddProps extends IBase {
  canister: typeof DayOneCanister;
}

export function Add(props: AddProps) {
  const { canister } = props;

  const componentDidMount = useComponentDidMount();

  const [isLoading, setIsLoading] = useState<boolean>(BOOLEAN.FALSE);

  const [add, setAdd] = useState<IBase>({
    m: NUMBER.ZERO,
    n: NUMBER.ZERO,
    result: NUMBER.ZERO,
  });

  const mDebounce = useDebounce(add.m, DEBOUNCE.VALUE.DEFAULT);
  const nDebounce = useDebounce(add.n, DEBOUNCE.VALUE.DEFAULT);

  useEffect(() => {
    if (componentDidMount) {
      setIsLoading(BOOLEAN.TRUE);
      canister
        .add(BigInt(add.m), BigInt(add.n))
        .then((result) => {
          setAdd((prev) => ({ ...prev, result: parseInt(result.toString()) }));
        })
        .catch((error) => {})
        .finally(() => {
          setIsLoading(BOOLEAN.FALSE);
        });
    }
  }, [mDebounce, nDebounce]);

  return (
    <Flex>
      <Box alignSelf={"center"} justifySelf={"center"}>
        <Text>{TEXT.ADD}</Text>
      </Box>
      <Spacer />
      <Box>
        <NumberInput
          inputProps={{
            placeholder: ALPHABET.LOWER_CASE.M,
            min: NUMBER.MIN_SAFE_INTEGER,
            max: NUMBER.MAX_SAFE_INTEGER,
            isReadOnly: isLoading,
            value: add.m,
            onChange: (value) => {
              setAdd((prev) => ({ ...prev, m: parseInt(value) }));
            },
          }}
        />
      </Box>
      <Spacer />
      <Box>
        <NumberInput
          inputProps={{
            placeholder: ALPHABET.LOWER_CASE.N,
            min: NUMBER.MIN_SAFE_INTEGER,
            max: NUMBER.MAX_SAFE_INTEGER,
            isReadOnly: isLoading,
            value: add.n,
            onChange: (value) => {
              setAdd((prev) => ({ ...prev, n: parseInt(value) }));
            },
          }}
        />
      </Box>
      <Spacer />
      <Box>
        <Input
          inputProps={{
            placeholder: TEXT.RESULT,
            isReadOnly: BOOLEAN.TRUE,
            value: add.result,
          }}
          rightElementProps={{
            children: (
              <CircularProgress
                isIndeterminate={isLoading}
                size={CIRCULAR_PROGRESS.SIZE}
              />
            ),
          }}
        />
      </Box>
    </Flex>
  );
}
