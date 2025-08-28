import { fetchProjectTasks } from '@/lib/data'
import { isManager } from '@/lib/actions'
import Column from '@/components/tasks/column'
import List from '@/components/tasks/list'

const Tasks = async ({ id }: { id: string }) => {
  const manager = await isManager(id)
  const { pendingTasks, completedTasks, inProgressTasks } =
    await fetchProjectTasks(id)

  return (
    <div className='pb-20 lg:pb-0'>
      <div className='hidden lg:grid grid-cols-3 gap-x-2'>
        <Column tasks={pendingTasks} title='To Do' canAdd={manager} id={id} />
        <Column tasks={inProgressTasks} title='On Progress' id={id} />
        <Column tasks={completedTasks} title='Done' id={id} />
      </div>
      <div className='flex flex-col lg:hidden gap-2'>
        <List tasks={pendingTasks} title='To Do' canAdd={manager} id={id} />
        <List tasks={inProgressTasks} title='On Progress' id={id} />
        <List tasks={completedTasks} title='Done' id={id} />
      </div>
    </div>
  )
}

export default Tasks
