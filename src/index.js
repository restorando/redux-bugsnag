import tap from 'redux-tap'

const filterError = ({ meta }) => meta && meta.error

const warn = () => window !== 'undefined' &&
  typeof window.Bugsnag !== 'object' &&
  console.warn('redux-bugsnag has been executed but it seems like Bugsnag snippet has not been loaded.')

export default () => tap(filterError, (error, action, store) => {
  typeof window !== 'undefined' && typeof window.Bugsnag === 'object'
    ? window.Bugsnag.notifyException(error)
    : warn()
})
