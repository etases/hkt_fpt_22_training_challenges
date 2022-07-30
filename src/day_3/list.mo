// Custom List
module {
  public type List<T> = ?(T, List<T>);

  // challenge 7
  public func is_null<T>(l : List<T>) : Bool {
    switch (l) {
      case (null) {
        return true;
      };
      case _ {
        return false;
      }
    };
  };

  // challenge 8
  public func last<T>(l : List<T>) : ? T {
    switch (l) {
      case (null) {
        return null;
      };
      case (?(item, null)) {
        return ? item;
      };
      case (?(_, list)) {
        return last<T>(list);
      };
    };
  };

  // challenge 9
  public func size<T>(l : List<T>) : Nat {
    func recursive(l : List<T>, n : Nat) : Nat {
      switch (l) {
        case (null) {
          return n;
        };
        case (?(_, list)) {
          return recursive(list, n + 1)
        };
      };
    };

    return recursive(l,0);
  };

  // challenge 10
  public func get<T>(l : List<T>, n : Nat) : ? T {
    switch (n, l) {
      case (_, null) {
        return null;
      };
      case (0, (?(item, list))) {
        return ? item;
      };
      case (_, (?(_, list))) {
        return get<T>(list, n - 1);
      };
    };
  };
}