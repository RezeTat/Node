import * as fs from 'fs/promises'
import * as path from 'path'
import { handleError } from '../utils/handleError.js'
import createFolderIsNotExist from '../utils/createFolder.js'

const criteriaExtFile = (file) => {
  const folder = path.extname(file.path)
  const targetPath = path.join(file.dist, folder)
  return targetPath
}

const criteriaAlphabetFile = (file) => {
  const indexLetter = 0
  const folder = file.name[indexLetter].toLowerCase()
  const targetPath = path.join(file.dist, folder)
  return targetPath
}

const criteriaForDir = (file) => {
  switch (file.criteria) {
    case 0:
      return criteriaExtFile(file)
    default:
      return criteriaAlphabetFile(file)
  }
}
const copyFile = async (file) => {
  const dir = criteriaForDir(file)
  try {
    await createFolderIsNotExist(dir)
    await fs.copyFile(file.path, path.join(dir, file.name))
  } catch (e) {
    handleError(e)
  }
}

const sort = (dist, criteria = 1) => {
  const readFolder = async (base) => {
    const files = await fs.readdir(base)
    for (const item of files) {
      const localBase = path.join(base, item)
      const state = await fs.stat(localBase)
      if (state.isDirectory()) {
        await readFolder(localBase)
      } else {
        await copyFile({ dist, criteria, name: item, path: localBase })
      }
    }
  }
  return readFolder
}
export default sort
