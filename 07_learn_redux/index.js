// 将redux相关代码抽取到多个文件
// index文件中编写逻辑代码
import store from './store/index.js'
import {
  addAction,
  subAction,
  increment,
  decrement,
} from './store/actionCreators.js'
store.subscribe(() => {
  console.log('counter', store.getState().counter)
})

store.dispatch(addAction(5))
store.dispatch(subAction(3))
store.dispatch(increment())
store.dispatch(decrement())
