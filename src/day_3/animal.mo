module {
  public type Animal = {
    species : Text;
    energy : Nat;
  };

  // challenge 3
  public func animal_sleep(a : Animal) : Animal {
    let animal : Animal = {
      species = a.species;
      energy = a.energy + 10;
    };

    return animal;
  }
}