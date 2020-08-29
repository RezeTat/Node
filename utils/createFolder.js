import * as fs from 'fs/promises'
import { isAccessible } from './accessible.js'

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder)
  }
}

export default createFolderIsNotExist
