import tap from 'redux-tap'

const defaultFilter = ({ meta }) => meta && meta.error

const warn = () => console &&
  console.warn('redux-bugsnag has been executed but it seems like Bugsnag snippet has not been loaded.')

export default (bugsnag, { filterProperty = defaultFilter }) => tap(filterProperty, (error, action, store) => {
  if (bugsnag) {
    const args = [
      error,
      {
        'Redux State': store.getState()
      }
    ]

    typeof bugsnag.notifyException === 'function' ? bugsnag.notifyException(...args) : bugsnag.notify(...args)
  } else {
    return warn()
  }
})
