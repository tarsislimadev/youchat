import { HTML, nFlex } from '@brtmvdl/frontend'

export class Page extends HTML {
  state = {
  }

  children = {
    rooms: new HTML(),
    messages: new HTML(),
    users: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getRoomsHTML())
    flex.append(this.getMessagesHTML())
    flex.append(this.getUsersHTML())
    return flex
  }

  getRoomsHTML() {
    return this.children.rooms
  }

  getMessagesHTML() {
    return this.children.messages
  }

  getUsersHTML() {
    return this.children.users
  }
}
