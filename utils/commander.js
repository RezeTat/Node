import commander from 'commander'
const { program } = commander

export default program
  .version('0.0.1')
  .requiredOption('-f, --folder [type]', 'Input source folder')
  .option('-o, --output [type]', 'Input output folder [./dist]', './dist')
  .option('-d, --delete', 'Delete source folder?')
