import Debug "mo:base/Debug";
import Array "mo:base/Array";
import List "mo:base/List";
import Text "mo:base/Text";
import Principal "mo:base/Principal";

import Custom "custom";
import Animal "animal";
import CustomList "list";

actor DayThree {
  private type Team = Custom.Me;
  private type Person = Custom.Person;
  private type Animal = Animal.Animal;

  private let ankha : Animal = {
    species = "cat";
    energy = 21;
  };
  private var animals : List.List<Animal> = List.nil<Animal>();

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

  public func create_animal_then_take_a_break(species : Text, energy: Nat) : async Animal {
    
    let animal : Animal = {
      species = species;
      energy = energy;
    };

    return Animal.animal_sleep(animal);
  };

  public func push_animal(animal : Animal) : async () {
    animals := List.push<Animal>(animal, animals);
    Debug.print(debug_show(animals));
    return;
  };

  public func get_animals() : async [Animal] {
    return List.toArray<Animal>(animals);
  };

  public shared(context) func is_anonymous() : async Bool {
    return Principal.isAnonymous(context.caller);
  };
}