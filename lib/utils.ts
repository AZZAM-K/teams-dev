export const getProgress = (
  subtasks: {
    status: 'PENDING' | 'DONE'
  }[]
) => {
  const total = subtasks.length
  const completed = subtasks.filter(subtask => subtask.status === 'DONE').length
  return total ? (completed / total) * 100 : 0
}
