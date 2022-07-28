import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";

actor DayOne {

  var counter : Nat = 0;
  
  // challenge 1
  public func add(m : Nat, n : Nat) : async Nat {
    return m + n;
  };

  // challenge 2
  public func square(n: Nat) : async Nat {
    return n**2;
  };

  // challenge 3
  public func days_to_second(noOfDate : Nat) : async Nat {
    return noOfDate * 24 * 60 * 60;
  };

  // challenge 4.1
  public func increment_counter(n: Nat) : async Nat {
    counter += n;
    return counter;
  };

  // challenge 4.2
  public func reset_counter() : async Nat {
    counter := 0;
    return counter;
  };

  // challenge 5
  public func devide(m : Nat, n : Nat) : async Bool {
    try {
      return n % m == 0;
    } catch (e) {
      return false;
    };
  };

  // challenge 6
  public func is_even(n: Nat) : async Bool {
    return await devide(2, n);
  };

  // challenge 7
  public func sum_of_array(arr : [Nat]): async Nat {
    try {
      var sum : Nat = 0; 
      for (number in arr.vals()) {
        sum += number;
      };
      return sum;
    } catch (e) {
      return 0;
    };
  };

  // challenge 8
  public func maximum (arr : [Nat]) : async Nat {
    try {
      return Array.sort<Nat>(arr, Nat.compare)[arr.size() -1];
    } catch (e) {
      return 0;
    };
  };

  // challenge 9
  public func remove_from_array (arr : [Nat], n : Nat) : async [Nat] {
    try {
      return Array.filter(arr, func(i : Nat) : Bool {
        return i != n;
      });
    } catch (e) {
      return arr;
    };
  };

  // challenge 10
  public func selection_sort(arr : [Nat]) : async [Nat] {
    try {
      let mutableArr : [var Nat] = Array.thaw(arr);
      let size = mutableArr.size();
      for (i in Iter.range(0, size-2))
      {
        var minIdx : Nat = i;
        for (j in Iter.range(i+1, size-1))
        {
          if (mutableArr[j] < mutableArr[minIdx])
          {
            minIdx := j;
          };
        };
        swap(mutableArr, minIdx, i);
      };
      return Array.freeze(mutableArr);
    } catch (e) {
      return arr;
    };
  };

  private func swap(arr : [var Nat], a : Nat, b : Nat) {
    let tmp : Nat = arr[a];
    arr[a] := arr[b];
    arr[b] := tmp;
  };
};

