import del from 'del'
import * as fs from 'fs'

import program from './utils/commander'
import sort from './module/sorting'
import createFolderIsNotExist from './utils/createFolder'
import Watcher from './module/watcher'

program.parse(process.argv)

const sorting = sort(
  program.output,
  new Watcher(() => {
    console.log('Sorting complete. We can remove source folder')
    if (program.delete) {
      del(program.folder).then(() => console.log('Delete!'))
    }
  }),
  1,
)

if (!fs.existsSync(program.folder)) {
  console.log(`Not found source folder: ${program.folder}`)
} else {
  createFolderIsNotExist(program.output)
  sorting(program.folder)
}
