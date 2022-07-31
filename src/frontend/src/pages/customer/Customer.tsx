import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Center,
  Text,
  LinkBox,
  LinkOverlay,
  Spacer,
  Flex,
  Button
} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import * as React from "react";
import { useState, useEffect } from "react";
import { plug as PlugCanister } from "@canisters/plug"

export function Customer() {
  const [customers, setCustomers] = React.useState<any>([]);
  useEffect(() => {
    PlugCanister.getCustomers().then(result => {
      console.log(result);
      setCustomers(result?.map((customer) => ({
        id: customer[0].toString(),
        name: customer[1].firstName + " " + customer[1].lastName,
        birthday: customer[1].birthday,
        phone: customer[1].phone,
        sex: customer[1].isFemale,
      })));
    })
  }, [])
  return <Center>
    <Flex flexDirection={"column"}>
      <Text>Customer List</Text>
      <TableContainer>
        <Table variant={"striped"}>
          <Thead>
            <Tr>
              <Th isNumeric={true}>ID</Th>
              <Th>Name</Th>
              <Th>Birthday</Th>
              <Th>Phone</Th>
              <Th>Sex</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {customers.length > 0 && customers?.map(customer => (
              <Tr key={customer.id}>
                <Td isNumeric={true}>{customer.id}</Td>
                <Td>{customer.name}</Td>
                <Td>{customer.birthday}</Td>
                <Td>{customer.phone}</Td>
                <Td>{customer.sex ? "female" : "male"}</Td>
                <Td>
                  <Button onClick={() => {
                    PlugCanister.deleteCustomer(BigInt(customer.id)).then(result => {
                      setCustomers(prev => prev.filter(c => c.id !== customer.id));
                    })
                  }}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Spacer />
      <Center>
        <LinkBox>
          <LinkOverlay as={Link} to={"/register"}>Register</LinkOverlay>
        </LinkBox>
      </Center>
    </Flex>
  </Center>;
}