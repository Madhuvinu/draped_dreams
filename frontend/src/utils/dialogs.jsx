import { Dialog } from 'frappe-ui'

export function createDialog(options) {
  return new Dialog(options)
}

export const Dialogs = {
  name: 'Dialogs',
  template: '<div></div>',
}
