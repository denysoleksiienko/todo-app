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
      let copy = Object.assign({}, state)
      console.log(payload.id)
      copy.todo[payload.id].value = payload.value
      return {
        todo: [...copy.todo]
      }
    },
    statusItem: (payload, state) => {
      let copy = Object.assign({}, state)
      console.log(payload.id)
      copy.todo[payload.id].status = payload.status
      return {
        todo: [...copy.todo]
      }
    },
  }
}