class Watcher {
  constructor(completeCb) {
    this.onComplete = completeCb
    this.process = []
    this.isStarted = false
  }

  started() {
    this.isStarted = true
  }

  startProcess(el) {
    this.process.push(el)
  }

  endProcess(el) {
    const index = this.process.findIndex((item) => item === el)
    this.process.splice(index, 1)
    this.checkOnComplete()
  }

  checkOnComplete() {
    if (this.isStarted && this.process.length === 0) {
      this.isStarted = false
      this.onComplete()
    }
  }
}

export default Watcher
