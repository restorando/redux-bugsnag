import tap from 'redux-tap'

const defaultFilter = ({ meta }) => meta && meta.error

const warn = () => console &&
  console.warn('redux-bugsnag has been executed but it seems like Bugsnag snippet has not been loaded.')

export default (bugsnag, { errorName = 'ReduxActionError', filterProperty = defaultFilter }) =>
  tap(filterProperty, (error, action, store) => {
    if (!bugsnag) {
      return warn()
    }

    const notify = typeof bugsnag.notifyException === 'function' ? bugsnag.notifyException : bugsnag.notify

    notify(error, {
      errorName,
      groupingHash: action.type,
      redux: {
        action,
        error,
        state: store.getState()
      }
    })
  })
