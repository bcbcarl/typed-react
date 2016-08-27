import * as React from "react";

interface CounterProps {
  value: number;
  onIncrement(): { type: string };
  onDecrement(): { type: string };
  onIncrementAsync(): { type: string };
}

const Counter = ({
  value,
  onIncrement,
  onDecrement,
  onIncrementAsync
}: CounterProps) =>
  <div>
    <button onClick={onIncrement}>
      Increment
    </button>
    {" "}
    <button onClick={onDecrement}>
      Decrement
    </button>
    {" "}
    <button onClick={onIncrementAsync}>
      Increment after 1 second
    </button>
    <hr />
    <div>
      Clicked: {value} times
    </div>
  </div>;

export default Counter;
