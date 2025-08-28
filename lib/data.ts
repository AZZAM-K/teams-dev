import { prisma } from '@/prisma'
import { auth } from '@/auth'

export const fetchStats = async () => {
  const session = await auth()
  const id = session?.user?.id
  try {
    const projectsOwned = prisma.project.count({
      where: {
        ownerId: id,
      },
    })

    const projectsContributed = prisma.projectMember.count({
      where: {
        AND: [{ userId: id }, { role: 'MEMBER' }],
      },
    })

    const invitesSent = prisma.invite.count({
      where: {
        invitedBy: id,
        status: 'PENDING',
      },
    })

    const invitesReceived = prisma.invite.count({
      where: {
        receivedBy: id,
        status: 'PENDING',
      },
    })

    const stats = await Promise.all([
      projectsOwned,
      projectsContributed,
      invitesSent,
      invitesReceived,
    ])

    return {
      projectsOwned: stats[0],
      projectsContributed: stats[1],
      invitesSent: stats[2],
      invitesReceived: stats[3],
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch card data.')
  }
}

export const fetchProjects = async (type: string) => {
  const session = await auth()
  const id = session?.user?.id

  let whereClause = {}
  if (type === 'owned') {
    whereClause = { ownerId: id }
  } else if (type === 'contributed') {
    whereClause = {
      members: {
        some: {
          userId: id,
          role: 'MEMBER',
        },
      },
    }
  } else {
    whereClause = {
      OR: [
        { ownerId: id },
        { members: { some: { userId: id, role: 'MEMBER' } } },
      ],
    }
  }
  try {
    const projects = await prisma.project.findMany({
      where: whereClause,
      include: {
        members: {
          select: {
            id: true,
          },
        },
      },
    })
    return projects
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch projects.')
  }
}

export const fetchInvites = async (type: string) => {
  const session = await auth()
  const id = session?.user?.id

  let whereClause = {}
  if (type === 'sent') {
    whereClause = { invitedBy: id }
  } else if (type === 'received') {
    whereClause = { receivedBy: id }
  }
  try {
    const invites = await prisma.invite.findMany({
      where: whereClause,
      include: {
        project: {
          select: {
            name: true,
          },
        },
        receiver: {
          select: {
            email: true,
          },
        },
        inviter: {
          select: {
            email: true,
          },
        },
      },
    })

    invites.sort((a, b) => {
      const order = { PENDING: 0, ACCEPTED: 1, DECLINED: 2 }
      return order[a.status] - order[b.status]
    })

    return invites
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch invites.')
  }
}

export const fetchProjectInfo = async (projectId: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: {
        name: true,
        description: true,
        id: true,
      },
    })

    const membersNb = await prisma.projectMember.count({
      where: {
        projectId: projectId,
      },
    })

    return { project, membersNb }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch project.')
  }
}

export const fetchProjectTasks = async (projectId: string) => {
  const included = {
    assignee: {
      select: {
        user: {
          select: {
            image: true,
            name: true,
          },
        },
      },
    },
    comments: {
      select: {
        id: true,
      },
    },
    subtasks: {
      select: {
        status: true,
      },
    },
  }

  try {
    const pending = prisma.task.findMany({
      where: {
        projectId: projectId,
        status: 'PENDING',
      },
      include: included,
    })

    const inProgress = prisma.task.findMany({
      where: {
        projectId: projectId,
        status: 'IN_PROGRESS',
      },
      include: included,
    })

    const completed = prisma.task.findMany({
      where: {
        projectId: projectId,
        status: 'DONE',
      },
      include: included,
    })

    const tasks = await Promise.all([pending, inProgress, completed])

    return {
      pendingTasks: tasks[0],
      inProgressTasks: tasks[1],
      completedTasks: tasks[2],
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch project tasks.')
  }
}

export const fetchMembers = async (id: string) => {
  try {
    const members = prisma.projectMember.findMany({
      where: {
        projectId: id,
      },
      select: {
        id: true,
        user: {
          select: {
            name: true,
            image: true,
            email: true,
          },
        },
      },
    })

    return members
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch project members.')
  }
}

export const fetchTask = async (taskId: string) => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        subtasks: {
          select: {
            title: true,
            status: true,
            id: true,
          },
        },
        assignee: {
          select: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    })

    return task
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch task.')
  }
}

export const fetchManager = (id: string) => {
  try {
    const manager = prisma.project.findUnique({
      where: {
        id: id,
      },
      select: {
        owner: {
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
          },
        },
      },
    })

    return manager
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch project manager.')
  }
}

export const fetchMyTasks = async (projectId: string) => {
  const session = await auth()
  const userId = session?.user?.id

  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: projectId,
        assignee: {
          userId: userId,
        },
      },
      include: {
        comments: {
          select: {
            id: true,
          },
        },
        subtasks: {
          select: {
            status: true,
          },
        },
      },
    })

    tasks.sort((a, b) => {
      const order = { PENDING: 0, IN_PROGRESS: 1, DONE: 2 }
      return order[a.status] - order[b.status]
    })

    return tasks
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch my tasks.')
  }
}
