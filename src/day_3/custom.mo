module {
  public type Me = {
    members : [Person];
    org : Text;
  };

  public type Person = {
    id : Nat;
    name : Text;
  };
}