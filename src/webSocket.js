/* global WebSocket */

const WEB_SOCKET_HOST = 'ws://crack-invoice-web.herokuapp.com/ws'

const SEND_INVOICE = '1'

let ws = null

function sendWSMessage (message, success) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(message)
    if (typeof success === 'function') {
      success()
    }
  } else if (ws && ws.readyState === WebSocket.CONNECTING) {
    ws.onopen = () => {
      ws.send(message)
      if (typeof success === 'function') {
        success()
      }
    }
  } else {
    ws = new WebSocket(WEB_SOCKET_HOST)
    ws.onopen = () => {
      ws.send(message)
      if (typeof success === 'function') {
        success()
      }
    }
  }
}

function createWSMessage (type, value, clientId) {
  return `${type}||${value}||${clientId}`
}

const cIWebSocket = {
  sendInvoice: (invoice, clientId, success, fail) => {
    sendWSMessage(createWSMessage(SEND_INVOICE, JSON.stringify(invoice), clientId), success)
  }
}

export default cIWebSocket