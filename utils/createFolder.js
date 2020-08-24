import * as fs from 'fs'

const createFolderIsNotExist = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }
}

export default createFolderIsNotExist
