import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from "../button/index"
import { decrement, increment } from '../../redux/features/counter/counterSlice';

const Counter = () => {

    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

  return (
    <div>
        <h2>{count}</h2>
        <Button
            props={{
                text: "Increment",
                onClick: () => dispatch(increment())
                }}
            />

        <Button
            props={{
                text: "Decrement",
                onClick: () => dispatch(decrement())
            }}
            />
    </div>
  )
}

export default Counter