//import { Request } from 'express'
import { server } from 'decentraland-server'

import { Router } from '../common/Router'
import { User } from './User.model'

export class UserRouter extends Router {
  mount() {
    /**
     * Get users list
     */
    this.router.get(
      '/users',
      server.handleRequest(this.getUsers)
    )
  }

  private getUsers() {
    return User.findUsers()
  }
}
