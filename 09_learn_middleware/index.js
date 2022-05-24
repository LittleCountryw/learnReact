// 将redux相关代码抽取到多个文件
// index文件中编写逻辑代码
import store from './store/index.js'
import { addAction, subAction } from './store/actionCreators.js'

// 需求：每次dispatch之前打印本次action,每次dispatch后打印当前state
// 1.基本做法
/* console.log('dispatch前', addAction(5))
store.dispatch(addAction(5))
console.log('dispatch后', store.getState())

console.log('dispatch前', addAction(3))
store.dispatch(subAction(3))
console.log('dispatch后', store.getState())
 */

// 2.封装函数
/* function dispatchAndLogging(action) {
  console.log('dispatch前', action)
  store.dispatch(action)
  console.log('dispatch后', store.getState())
}
dispatchAndLogging(addAction(5))
dispatchAndLogging(subAction(3)) */

// 3.函数的基础上进行优化：修改原有的dispatch
/* const next = store.dispatch
function dispatchAndLogging(action) {
  console.log('dispatch前', action)
  next(action)
  console.log('dispatch后', store.getState())
}
store.dispatch = dispatchAndLogging

store.dispatch(addAction(5))
store.dispatch(subAction(3)) */

// 4.将之前的操作进行封装
function patchLogging(store) {
  const next = store.dispatch
  function dispatchAndLogging(action) {
    console.log('dispatch前', action)
    next(action)
    console.log('dispatch后', store.getState())
  }
  store.dispatch = dispatchAndLogging
}
// patchLogging(store)

// 5.封装patchThunk功能
function patchThunk(store) {
  // 注意这里的store.dispatch已经改成了dispatchAndLogging
  // 从而实现多个middleware一起使用
  const next = store.dispatch
  function dispatchAndThunk(action) {
    if (typeof action === 'function') {
      action(next, store.getState)
    } else {
      next(action)
    }
  }
  store.dispatch = dispatchAndThunk
}

// patchThunk(store)

function foo(dispatch, getState) {
  dispatch(subAction(10))
}
// store.dispatch(foo)
// store.dispatch(addAction(5))
// store.dispatch(subAction(3))

// 6.封装applyMiddleware
function applyMiddleware(...middlewares) {
  middlewares.forEach((middleware) => {
    middleware(store)
  })
}
applyMiddleware(patchLogging, patchThunk)
store.dispatch(foo)
store.dispatch(addAction(5))
store.dispatch(subAction(3))

// 或者 让上面的patchLogging和patchThunk直接返回dispatchAndThunk和dispatchAndLogging
// 这样就只有applyMiddleware不是纯函数了
/* function applyMiddleware(...middlewares) {
  middlewares.forEach((middleware) => {
    store.dispatch = middleware(store)
  })
} */
