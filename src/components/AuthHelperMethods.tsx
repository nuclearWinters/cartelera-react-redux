import React from "react"
import withCountState from "./withAuth"

const Wrapped = (props: any) =>  {
    const {count, setCount} = props;
    return(
      <div>
         <h1>Counter Functional Component</h1>
         <p>You clicked {count} times</p>
         <button onClick={() => setCount(count + 1)}>
            Increment count
         </button>
      </div>);
};

export const EnhancedWrapped = withCountState(Wrapped);
