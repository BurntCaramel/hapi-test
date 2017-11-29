export const getURL = (path) => (
  `${process.env.PREACT_APP_API_URL}${path}`
)

export const fetchJSON = (path) => (
  fetch(getURL(path))
    .then(r => r.json())
)
