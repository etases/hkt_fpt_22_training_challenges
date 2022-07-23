import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";

actor day_1 {

  var counter : Nat = 0;
  
  public func add(m : Nat, n : Nat) : async Nat {
    return m + n;
  };

  public func square(n: Nat) : async Nat {
    return n * n;
  };

  public func days_to_second(noOfDate : Nat) : async Nat {
    return noOfDate * 24 * 60 * 60;
  };

  public func increment_counter(n: Nat) : async Nat {
    counter += n;
    return counter;
  };

  public func reset_counter() : async Nat {
    counter := 0;
    return counter;
  };

  public func devide(m : Nat, n : Nat) : async Bool {
    try {
      return n % m == 0;
    } catch (e) {
      return false;
    };
  };

  public func is_even(n: Nat) : async Bool {
    return n % 2 == 0;
  };

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

  public func maximum (arr : [Nat]) : async Nat {
    try {
      return Array.sort<Nat>(arr, Nat.compare)[arr.size() -1];
    } catch (e) {
      return 0;
    };
  };

  public func remove_from_array (arr : [Nat], n : Nat) : async [Nat] {
    try {
      let arrResult = Buffer.Buffer<Nat>(arr.size());
      for (number in arr.vals()) {
        if (number != n) {
          arrResult.add(number);
        };
      };
      return arrResult.toArray();
    } catch (e) {
      return arr;
    };
  };

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
        let tmp : Nat = mutableArr[minIdx];
        mutableArr[minIdx] := mutableArr[i];
        mutableArr[i] := tmp;
      };
      return Array.freeze(mutableArr);
    } catch (e) {
      return arr;
    };
  };
};

