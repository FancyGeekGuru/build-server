import { Model, SQL } from 'decentraland-server'

import { UserAttributes } from './User.types'

export class User extends Model<UserAttributes> {
  static findUsers() {
    return this.query<UserAttributes>(SQL`
    SELECT *
      FROM public.users`)
  }
}
