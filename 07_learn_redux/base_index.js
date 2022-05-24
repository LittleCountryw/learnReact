// redux核心理念
// 1.Store - 内部调用reducer
// 2.action - 所有数据的变化,必须派发action来更新
//        - 格式：{type:xxx,携带数据}
// 3.reducer - 将state和action结合起来生成一个新的state
const redux = require('redux')

// 定义state
const initialState = {
  counter: 0,
}

// 创建reducer reducer必须是一个纯函数,返回新的state而不是修改原state
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 }
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 }
    case 'ADD_NUMBER':
      return { ...state, counter: state.counter + action.num }
    case 'SUB_NUMBER':
      return { ...state, counter: state.counter - action.num }
    default:
      return state
  }
}

// 创建store
const store = redux.createStore(reducer)
// 订阅store,当state数据改变时,回调函数执行
store.subscribe(() => {
  console.log('counter', store.getState().counter)
})

// 创建action
const action1 = { type: 'INCREMENT' }
const action2 = { type: 'DECREMENT' }
const action3 = { type: 'ADD_NUMBER', num: 5 }
const action4 = { type: 'SUB_NUMBER', num: 12 }

// 派发action
store.dispatch(action1)
store.dispatch(action2)
store.dispatch(action3)
store.dispatch(action4)
