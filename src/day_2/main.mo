import Prim "mo:prim";
import Array "mo:base/Array";
import Char "mo:base/Char";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Text "mo:base/Text";
import Blob "mo:base/Blob";

actor DayTwo {

  // challenge 1
  public func nat_to_nat8(n : Nat) : async Nat8 {
    try {
      return Nat8.fromIntWrap(n);
    } catch (e) {
      return 0;
    };
  };

  // challenge 2
  public func max_number_with_n_bits(n : Nat) : async Nat {
    try {
      return Nat.pow(2, n) - 1;
    } catch (e) {
      return 0;
    };
  };

  // challenge 3
  public func decimal_to_bits(n: Nat) : async Text {
    try {
      var number = n;
      var bits : Text = "";
      
      loop {
        bits := Nat.toText(number % 2) # bits;
        number := number / 2;
      } while (number > 0);

      return bits;
    } catch (e) {
      return "";
    };
  };

  // challenge 4
  public func capitalize_character(c : Text) : async Text {
    try {
      if (c.size() != 1 ) return "";

      let char : Char = Iter.toArray(c.chars())[0];
      
      return Text.fromChar(Prim.charToUpper(char));
    } catch (e) {
      return "";
    };
  };

  // challenge 5
  public func capitalize_text(t : Text) : async Text {
    try {
      return Text.map(t, Prim.charToUpper);
    } catch (e) {
      return "";
    };
  };

  // challenge 6
  public func is_inside(t : Text, c: Text) : async Bool {
    try {
      if (c.size() != 1) return false;
      var char : Char = Iter.toArray(c.chars())[0];
      return Text.contains(t, #char char);
    } catch (e) {
      return false;
    }
  };

  // challenge 7
  public func trim_whitespace(t : Text) : async Text {
    try {
      return Text.trim(t, #char ' ');
    } catch (e) {
      return t;
    }
  };

  // challenge 8
  public func duplicated_character(t : Text) : async Text {
    try {
      if (t.size() < 2) return t;

      let cArrReversed : [Char] = Array.reverse(Iter.toArray(t.chars()));
      var foundChars : Text = "";
      var result : Text = t;

      for (char in cArrReversed.vals())
      {
        let cAsText : Text = Text.fromChar(char);

        if (Text.contains(foundChars, #text cAsText))
          result := cAsText;

        foundChars #= cAsText;
      };

      return result;
    } catch (e) {
      return t;
    };
  };

  // challenge 9
  public func size_in_bytes(t : Text) : async Nat {
    try {
      return Text.encodeUtf8(t).size();
    } catch (e) {
      return 0;
    };
  };

  // challenge 10
  public func bubble_sort(arr : [Nat]) : async [Nat] {
    let mutableArr : [var Nat] = Array.thaw(arr);
    
    try {
      let size = mutableArr.size();

      for (i in Iter.range(0, size - 2)) {
        for (j in Iter.range(0, size - i - 2))
        {
          if (mutableArr[j] > mutableArr[j+1])
          {
            swap(mutableArr, j, j + 1);
          };
        };
      };

      return Array.freeze(mutableArr);
    } catch (e) {
      return Array.freeze(mutableArr);
    };
  };

  // challenge 11
  public func nat_opt_to_nat(m : Nat, n : ? Nat) : async Nat {
    try {
      switch (n) {
        case (null) {
          return m;
        };
        case (? number) {
          return number;
        };
      };
    } catch (e) {
      return m;
    };
  };

  // challenge 12
  public func day_of_the_week(n : Nat) : async ? Text {
    try {
      switch (n) {
        case (1) {
          return ? "Monday";
        };
        case (2) {
          return ? "Tuesday";
        };
        case (3) {
          return ? "Wednesday";
        };
        case (4) {
          return ? "Thursday";
        };
        case (5) {
          return ? "Friday";
        };
        case (6) {
          return ? "Saturday";
        };
        case (7) {
          return ? "Sunday";
        };
        case _ {
          return null;
        };
      };
    } catch (e) {
      return null;
    };
  };

  // challenge 13
  public func populate_array(arr : [? Nat]) : async [Nat] {
    try {
      return Array.map<? Nat, Nat>(arr, func(n) {
        switch (n) {
          case (null) {
            return 0;
          };
          case (? n) {
            return n;
          }
        };
      });
    } catch (e) {
      let emptyArr : [Nat] = [];
      return emptyArr;
    };
  };

  // challenge 14
  public func sum_of_array(arr : [Nat]) : async Nat {
    try {
      return Array.foldLeft<Nat, Nat>(arr, 0, func(b, a) {
        return b + a;
      })
    } catch (e) {
      return 0;
    };
  };

  // challenge 15
  public func squared_array(arr : [Nat]) : async [Nat] {
    try {
      return Array.map<Nat, Nat>(arr, func(n) {
        return n**2;
      });
    } catch (e) {
      return arr;
    };
  };

  // challenge 16
  public func increase_by_index(arr : [Nat]) : async [Nat] {
    try {
      return Array.mapEntries<Nat, Nat>(arr, func(n, index) {
        return n + index;
      });
    } catch (e) {
      return arr;
    };
  };

  // challenge 17
  private func contain<A>(arr : [A], a : A, f : (A, A) -> Bool) : Bool {
      return Array.foldLeft<A, Bool>(arr, false, func(result, current) {
        if (f(current, a)) return true;
        return result;
      });
  };

  public func contain_test(arr : [Nat], a : Nat) : async Bool {
    try {
      return contain<Nat>(arr, a, func(current, desired) {
        return current == desired;
      });
    } catch (e) {
      return false;
    };
  };

  private func swap(arr: [var Nat], i : Nat, j : Nat) {
    let tmp = arr[i];
    arr[i] := arr[j];
    arr[j] := tmp;
  };
}