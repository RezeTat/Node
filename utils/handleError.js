export const ExitCode = {
  success: 0,
  error: 1,
}

export const handleError = (err) => {
  console.log(err)
  process.exit(ExitCode.err)
}
