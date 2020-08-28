import * as fs from 'fs/promises'

export const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false)
}
