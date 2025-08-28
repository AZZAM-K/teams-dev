'use server'

import { prisma } from '@/prisma'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const createProject = async (
  prevState: void | null,
  formData: FormData
) => {
  const session = await auth()
  if (!session || !session.user?.id) redirect('/signin')

  const name = formData.get('name')?.toString().trim()
  const description = formData.get('description')?.toString().trim()

  if (!name || !description) {
    throw new Error('Name and description are required')
  }

  try {
    await prisma.project.create({
      data: {
        name,
        description,
        ownerId: session.user.id,
      },
    })
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to create project.')
  }

  revalidatePath('/projects')
  redirect('/projects')
}

export const isMember = async (projectId: string) => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) return false

  try {
    const membership = await prisma.projectMember.findUnique({
      where: {
        userId_projectId: {
          userId: userId,
          projectId: projectId,
        },
      },
    })

    return !!membership
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to check project membership.')
  }
}

export const isManager = async (projectId: string) => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) return false

  try {
    const manager = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        ownerId: true,
      },
    })

    return userId === manager?.ownerId
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to check project membership.')
  }
}

export const createTask = async (
  projectId: string,
  prevState: void | null,
  formData: FormData
) => {
  try {
    const title = formData.get('title')?.toString().trim()
    const description = formData.get('description')?.toString().trim()
    const assigneeId = formData.get('assignee')?.toString()

    const subtasks = formData
      .getAll('subtasks')
      .map(subtask => subtask.toString().trim())

    if (!title) {
      throw new Error('Title is required')
    }

    await prisma.task.create({
      data: {
        title,
        description,
        projectId,
        assigneeId: assigneeId || null,
        subtasks: {
          create: subtasks.map(subtask => ({
            title: subtask,
          })),
        },
      },
    })
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to create task.')
  }

  revalidatePath(`/projects/${projectId}`)
  redirect(`/projects/${projectId}`)
}

export const sendInvite = async (
  projectId: string,
  prevState: { message: string | null; success?: boolean },
  formData: FormData
) => {
  const session = await auth()
  const inviterId = session?.user?.id

  if (!inviterId) return { message: 'User not authenticated', success: false }

  const email = formData.get('email')?.toString().trim()
  try {
    const receiver = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    })

    if (!receiver) {
      return { message: 'User not found', success: false }
    }
    const receiverId = receiver.id

    if (receiverId === inviterId) {
      return { message: 'You cannot invite yourself', success: false }
    }

    const isMember = await prisma.projectMember.findUnique({
      where: {
        userId_projectId: {
          userId: receiverId,
          projectId: projectId,
        },
      },
    })
    if (isMember) {
      return {
        message: 'User is already a member of this project',
        success: false,
      }
    }

    const existingInvite = await prisma.invite.findFirst({
      where: {
        projectId: projectId,
        receivedBy: receiverId,
        status: 'PENDING',
      },
    })

    if (existingInvite) {
      return { message: 'Invite already sent to this user', success: false }
    }

    await prisma.invite.create({
      data: {
        projectId,
        invitedBy: inviterId,
        receivedBy: receiverId,
      },
    })

    return { message: 'Invite sent successfully', success: true }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to send invite.')
  }
}

export const declineInvite = async (id: string) => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) redirect('/signin')

  try {
    const invite = await prisma.invite.findUnique({
      where: { id },
      select: { receivedBy: true, projectId: true },
    })

    if (!invite || invite.receivedBy !== userId) {
      throw new Error('Unauthorized action')
    }

    await prisma.invite.update({
      where: { id },
      data: { status: 'DECLINED' },
    })
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to decline invite.')
  }

  revalidatePath('/invites')
  redirect('/invites?type=received')
}

export const acceptInvite = async (id: string) => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) redirect('/signin')

  try {
    const invite = await prisma.invite.findUnique({
      where: { id },
      select: { receivedBy: true, projectId: true },
    })

    if (!invite || invite.receivedBy !== userId) {
      throw new Error('Unauthorized action')
    }

    await prisma.$transaction(async tx => {
      await tx.invite.update({
        where: { id },
        data: { status: 'ACCEPTED' },
      })

      await tx.projectMember.create({
        data: {
          projectId: invite.projectId,
          userId: userId,
        },
      })
    })

    revalidatePath(`/projects/${invite.projectId}`)
    redirect(`/projects/${invite.projectId}`)
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to accept invite.')
  }
}

export const deleteMember = async (projectId: string, memberId: string) => {
  const manager = await isManager(projectId)

  if (!manager) {
    throw new Error('Unauthorized action')
  }

  try {
    await prisma.projectMember.delete({
      where: { id: memberId },
    })
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to delete member.')
  }

  revalidatePath(`/projects/${projectId}/members`)
  redirect(`/projects/${projectId}/members`)
}

export const completeSubtask = async (
  id: string,
  taskId: string,
  projectId: string
) => {
  try {
    await prisma.subTask.update({
      where: { id: id },
      data: { status: 'DONE' },
    })

    const subtasks = await prisma.subTask.findMany({
      where: {
        taskId: taskId,
      },
    })

    const total = subtasks.length
    const doneCount = subtasks.filter(s => s.status === 'DONE').length
    let taskStatus: 'PENDING' | 'IN_PROGRESS' | 'DONE' = 'PENDING'

    if (doneCount === 0) {
      taskStatus = 'PENDING'
    } else if (doneCount === total) {
      taskStatus = 'DONE'
    } else {
      taskStatus = 'IN_PROGRESS'
    }

    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: taskStatus,
      },
    })

    revalidatePath(`/projects/${projectId}/tasks/${taskId}`)
    revalidatePath(`/projects/${projectId}`)
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to complete subtask.')
  }
}

export const addComment = async (
  taskId: string,
  projectId: string,
  prevState: void | null,
  formData: FormData
) => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) redirect('/signin')

  const content = formData.get('content')?.toString()

  if (!content) {
    throw new Error('Comment cannot be empty')
  }

  try {
    await prisma.comment.create({
      data: {
        content: content,
        authorId: userId,
        taskId: taskId,
      },
    })

    revalidatePath(`/projects/${projectId}/tasks/${taskId}`)
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to add comment.')
  }
}

export const leaveProject = async (projectId: string) => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) redirect('/signin')

  try {
    await prisma.projectMember.deleteMany({
      where: {
        projectId: projectId,
        userId: userId,
      },
    })

    revalidatePath(`/`)
    redirect(`/`)
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to leave project.')
  }
}

export const deleteProject = async (
  projectId: string,
  prevState: { error: boolean },
  formData: FormData
) => {
  const manager = await isManager(projectId)

  if (!manager) {
    throw new Error('Unauthorized action')
  }
  const name = formData.get('name')?.toString().trim()
  try {
    const projectName = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        name: true,
      },
    })

    if (!projectName || projectName.name !== name) {
      return { error: true }
    }

    await prisma.project.delete({
      where: {
        id: projectId,
      },
    })
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to delete project.')
  }

  revalidatePath(`/`)
  redirect(`/`)
}

export const editProject = async (
  projectId: string,
  prevState: void | null,
  formData: FormData
) => {
  const manager = await isManager(projectId)

  if (!manager) {
    throw new Error('Unauthorized action')
  }

  const name = formData.get('title')?.toString().trim()
  const description = formData.get('description')?.toString().trim()

  if (!name || !description) {
    throw new Error('Name and description are required')
  }

  try {
    await prisma.project.update({
      where: { id: projectId },
      data: { name, description },
    })
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to edit project.')
  }

  revalidatePath(`/projects/${projectId}`)
  redirect(`/projects/${projectId}`)
}
