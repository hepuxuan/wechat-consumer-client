let state = null
let callbacks = []

const qrCodeStore = {
  subscribeToUpdate (cb) {
    return callbacks.push(cb)
  },
  unsubscribeToUpdate (id) {
    callbacks = callbacks.filter((value, index) => index !== id)
  },
  getQrCode () {
    return state
  },
  setQrcode (_state) {
    state = _state
    callbacks.forEach((cb) => cb(_state))
  }
}

window.qrCodeStore = qrCodeStore

export default qrCodeStore
