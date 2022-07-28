import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

// challenge 19
actor DayThreeEx {
  private stable var entries : [(Principal, Nat)] = [];

  private let favoriteNumbers : HashMap.HashMap<Principal, Nat> = HashMap.fromIter<Principal, Nat>(Iter.fromArray(entries), 0, Principal.equal, Principal.hash);

  system func preupgrade() {
    entries := Iter.toArray(favoriteNumbers.entries());
  };

  system func postupgrade() {
    entries := [];
  };

  public shared(context) func add_favorite_number(n : Nat) : async Text {
    let callerPrincipal = context.caller;

    try {
      switch (favoriteNumbers.get(callerPrincipal)) {
        case (null) {
          favoriteNumbers.put(callerPrincipal, n);
          return "You've successfully registered your number";
        };
        case _ {
          return "You've already registered your number";
        };
      };
    } catch (e) {
      return "";
    };
  };

  public shared(context) func show_favorite_number() : async ? Nat {
    let callerPrincipal = context.caller;

    try {
      return favoriteNumbers.get(callerPrincipal);
    } catch (e) {
      return null;
    };
  };

  public shared(context) func update_favorite_number(n : Nat) : async () {
    let callerPrincipal = context.caller;

    try {
      switch (favoriteNumbers.get(callerPrincipal)) {
        case (null) {
          return;
        };
        case _ {
          favoriteNumbers.put(callerPrincipal, n);
          return;
        };
      };
    } catch (e) {
      return;
    }
  };

  public shared(context) func delete_favorite_number() : async () {
    let callerPrincipal = context.caller;

    try {
      switch(favoriteNumbers.get(callerPrincipal)) {
        case (null) {
          return;
        };
        case _ {
          favoriteNumbers.delete(callerPrincipal);
          return;
        };
      };
    } catch (e) {
      return;
    };
  };
}