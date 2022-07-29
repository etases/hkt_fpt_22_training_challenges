import Principal "mo:base/Principal";

actor Plug {
  public shared(context) func getPrincipalId() : async Text {
    let callerPrincipal = context.caller;
    return Principal.toText(callerPrincipal);
  }
}