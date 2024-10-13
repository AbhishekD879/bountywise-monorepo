import { roleTable } from './../schema'
import db from './tembo.db'
import { v4 } from 'uuid'

const roles = ['user', 'hunter']

const insertRoles = async () => {
  for (let i = 0; i < roles.length; i++) {
    await db.insert(roleTable).values({
      id: v4(),
      type: roles[i]
    })
  }
}

insertRoles()
