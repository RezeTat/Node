import program from './utils/commander'
import sort from './module/sorting'
import createFolderIsNotExist from './utils/createFolder'
import {handleError} from './utils/handleError'
// __dirname __filename
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ======================

program.parse(process.argv)

await createFolderIsNotExist(program.output)
try {
  const sorting = sort(program.output)
  await sorting(resolve(__dirname, program.folder))
} catch (e) {
  handleError(e)
}

console.log('Done: now can delete source folder')