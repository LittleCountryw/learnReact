import { ADD_NUMBER, SUB_NUMBER, INCREMENT, DECREMENT } from './constants.js'

export const addAction = (num) => ({ type: ADD_NUMBER, num: num })
export const subAction = (num) => ({ type: SUB_NUMBER, num: num })
export const increment = () => ({ type: INCREMENT })
export const decrement = () => ({ type: DECREMENT })
