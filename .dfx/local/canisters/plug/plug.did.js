export const idlFactory = ({ IDL }) => {
  const Customer = IDL.Record({
    'isFemale' : IDL.Bool,
    'birthday' : IDL.Text,
    'address' : IDL.Text,
    'phone' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const TokenId = IDL.Nat;
  const TokenMetadata = IDL.Record({
    'uri' : IDL.Text,
    'description' : IDL.Text,
  });
  return IDL.Service({
    'addCustomer' : IDL.Func([Customer], [IDL.Nat], []),
    'allTokens' : IDL.Func([], [IDL.Vec(TokenId)], ['query']),
    'approve' : IDL.Func([IDL.Principal, TokenId], [], []),
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Opt(IDL.Nat)], ['query']),
    'deleteCustomer' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'doIOwn' : IDL.Func([IDL.Nat], [IDL.Bool], ['query']),
    'getApproved' : IDL.Func([IDL.Nat], [IDL.Principal], []),
    'getCustomer' : IDL.Func([IDL.Nat], [IDL.Opt(Customer)], []),
    'getCustomers' : IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Nat, Customer))], []),
    'isApprovedForAll' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [IDL.Bool],
        [],
      ),
    'mint' : IDL.Func([TokenMetadata], [IDL.Nat], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'ownerOf' : IDL.Func([TokenId], [IDL.Opt(IDL.Principal)], ['query']),
    'setApprovalForAll' : IDL.Func([IDL.Principal, IDL.Bool], [], ['oneway']),
    'symbol' : IDL.Func([], [IDL.Text], ['query']),
    'tokenURI' : IDL.Func([TokenId], [IDL.Opt(TokenMetadata)], ['query']),
    'transferFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [],
        ['oneway'],
      ),
    'updateCustomer' : IDL.Func([IDL.Nat, Customer], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
