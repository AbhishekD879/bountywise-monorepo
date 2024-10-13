import { Lucia, TimeSpan } from 'lucia'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import db from './tembo.db'
import { sessionTable, userTable } from '@/schema'

// const adapter = new DrizzlePostgreSQLAdapter(db); // your adapter
const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable)

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(1, 'w'),
  sessionCookie: {
    expires: true,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    }
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      id: attributes.id,
      email: attributes.email,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
      profilePicture: attributes.profilePicture,
      roleId: attributes.roleId
    }
  }
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: Partial<typeof userTable>
  }
}
