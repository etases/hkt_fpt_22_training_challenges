import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Customer {
  'isFemale' : boolean,
  'birthday' : string,
  'address' : string,
  'phone' : string,
  'lastName' : string,
  'firstName' : string,
}
export type TokenId = bigint;
export interface TokenMetadata { 'uri' : string, 'description' : string }
export interface _SERVICE {
  'addCustomer' : ActorMethod<[Customer], bigint>,
  'allTokens' : ActorMethod<[], Array<TokenId>>,
  'approve' : ActorMethod<[Principal, TokenId], undefined>,
  'balanceOf' : ActorMethod<[Principal], [] | [bigint]>,
  'deleteCustomer' : ActorMethod<[bigint], boolean>,
  'doIOwn' : ActorMethod<[bigint], boolean>,
  'getApproved' : ActorMethod<[bigint], Principal>,
  'getCustomer' : ActorMethod<[bigint], [] | [Customer]>,
  'getCustomers' : ActorMethod<[], Array<[bigint, Customer]>>,
  'isApprovedForAll' : ActorMethod<[Principal, Principal], boolean>,
  'mint' : ActorMethod<[TokenMetadata], bigint>,
  'name' : ActorMethod<[], string>,
  'ownerOf' : ActorMethod<[TokenId], [] | [Principal]>,
  'setApprovalForAll' : ActorMethod<[Principal, boolean], undefined>,
  'symbol' : ActorMethod<[], string>,
  'tokenURI' : ActorMethod<[TokenId], [] | [TokenMetadata]>,
  'transferFrom' : ActorMethod<[Principal, Principal, bigint], undefined>,
  'updateCustomer' : ActorMethod<[bigint, Customer], undefined>,
}
