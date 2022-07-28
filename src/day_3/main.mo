import Debug "mo:base/Debug";
import Array "mo:base/Array";
import List "mo:base/List";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Cycles "mo:base/ExperimentalCycles";

import Custom "custom";
import Animal "animal";
import CustomList "list";

actor DayThree {
  private type Team = Custom.Me;
  private type Person = Custom.Person;
  private type Animal = Animal.Animal;

  private stable var count : Nat = 0; // challenge 18.1
  private stable var versionNumber : Nat = 0; // challenge 18.2

  private let favoriteNumbers : HashMap.HashMap<Principal, Nat> = HashMap.HashMap<Principal, Nat>(0, Principal.equal, Principal.hash); // challenge 12
  private var animals : List.List<Animal> = List.nil(); // challenge 5
  private let ankha : Animal = {
    species = "cat";
    energy = 10;
  }; // challenge 2


  // challenge 1
  public func fun() : async Team {
    let teamName : Text = "etases";
    let teamMemberNames: [Text] = ["Khoa", "Khoi", "Tien", "Tu", "Uy"];

    let teamMembers = Array.mapEntries<Text, Person>(Array.sort(teamMemberNames, Text.compare), func(memberName, index) {
      let member : Person = {
        id = index + 1;
        name = memberName;
      };

      return member;
    });

    let team : Team = {
      org = teamName;
      members = teamMembers;
    };

    return team;
  };

  // challenge 4
  public func create_animal_then_take_a_break(species : Text, energy: Nat) : async Animal {
    try {
      let animal : Animal = {
        species = species;
        energy = energy;
      };

      return Animal.animal_sleep(animal);
    } catch (e) {
      let emptyAnimal : Animal = {
        species = "";
        energy = 0;
      };

      return emptyAnimal;
    };
  };

  // challenge 6.1
  public func push_animal(animal : Animal) : async () {
    try {
      animals := List.push<Animal>(animal, animals);
      return;
    } catch (e) {
      return;
    };
  };

  // challenge 6.2
  public func get_animals() : async [Animal] {
    try {
      return List.toArray<Animal>(animals);
    } catch (e) {
      return [];
    };
  };

  // challenge 11
  public shared(context) func is_anonymous() : async Bool {
    try {
      return Principal.isAnonymous(context.caller);
    } catch (e) {
      return true;
    };
  };

  // challenge 13.1 + 14
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

  // challenge 13.2
  public shared(context) func show_favorite_number() : async ? Nat {
    let callerPrincipal = context.caller;

    try {
      return favoriteNumbers.get(callerPrincipal);
    } catch (e) {
      return null;
    };
  };

  // challenge 15.1
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

  // challenge 15.2
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

  // challenge 16
  public shared(context) func deposit_cycles() : async Nat {
    let received = Cycles.available();
    let deposited = Cycles.accept(received);
    return deposited;
  };

  // challenge 17

  // challenge 18.1
  public func increase_counter() : async () {
    count += 1;
    return;
  };

  // challenge 18.2
  public func show_counter() : async Nat {
    return count;
  };

  // challenge 18.3
  system func preupgrade() {
    versionNumber += 1;
  };
}