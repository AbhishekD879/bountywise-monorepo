import db from './tembo.db'

const getRoles = async () => {
  const res = await db.query.roleTable.findMany()
  console.log('res ', res)
  return res
}

getRoles().then(console.log)
