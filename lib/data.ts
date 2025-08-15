import { prisma } from '@/prisma'
import { auth } from '@/auth'

export const fetchStats = async () => {
  const session = await auth()
  const id = session?.user?.id
  console.log(id)
  const nb = await prisma.project.count({
    where: {
      ownerId: id,
    },
  })
  return nb
}
