package com.suwan.clush.todos.domain;

public enum Importance {
  L1(1), L2(2), L3(3), L4(4), L5(5),
  L6(6), L7(7), L8(8), L9(9), L10(10);

  private final int value;

  Importance(final int value) {
    this.value = value;
  }

  public int getValue() {
    return value;
  }

}
