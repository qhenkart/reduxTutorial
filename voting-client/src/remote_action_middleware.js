export default socket => store => next => action =>{
  if(action.meta && action.meta.remote) {
    console.log('in middlewate', action);
    socket.emit('action', action)
    
  }
  return next(action);
}

