import tap from 'redux-tap'

const filterError = ({ meta }) => meta && meta.error

const warn = () => console &&
  console.warn('redux-bugsnag has been executed but it seems like Bugsnag snippet has not been loaded.')

export default (bugsnag) => tap(filterError, (error, action, store) => {
  if (!bugsnag && typeof window !== 'undefined' && typeof window.Bugsnag === 'object') {
    bugsnag = window.Bugsnag
  } else if (bugsnag) {
    typeof bugsnag.notifyException === 'function' ? bugsnag.notifyException(error) : bugsnag.notify(error)
  } else {
    return warn()
  }
})
