export default function createReducers() {
  return {
    addItem: (payload, state) => ({
      ...state,
      todo: [...state.todo, { value: payload.text, status: "inProgress" }]
    }),
    removeItem: (payload, state) => ({
      ...state,
      todo: [
        ...state.todo.slice(0, payload.id),
        ...state.todo.slice(payload.id + 1, state.todo.length),
      ]
    }),
    editItem: (payload, state) => {
      let obj = Object.assign({}, state)
      console.log(payload.id)
      obj.todo[payload.id].value = payload.value
      return {
        todo: [...obj.todo]
      }
    },
    statusItem: (payload, state) => {
      let obj = Object.assign({}, state)
      console.log(payload.id)
      obj.todo[payload.id].status = payload.status
      return {
        todo: [...obj.todo]
      }
    },
  }
}