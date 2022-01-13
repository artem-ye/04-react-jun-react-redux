function logger(store) {
    return function wrapDispatch(next) {
      return function handleAction(action) {          
        return next(action);
      }
    }
}

export {logger};
export default logger;
