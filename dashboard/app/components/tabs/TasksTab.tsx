'use client'

import { useState } from 'react'

export default function TasksTab() {
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')

  // Placeholder tasks - would come from data store
  const tasks = [
    { id: '1', title: 'Set up Instagram DM capture', priority: 'high', due: '2026-02-10', domain: 'business', done: false },
    { id: '2', title: 'Complete Make.com webhook test', priority: 'high', due: '2026-02-09', domain: 'business', done: false },
    { id: '3', title: 'Log starting weight', priority: 'high', due: '2026-02-10', domain: 'health', done: false },
    { id: '4', title: 'Plan first training session', priority: 'high', due: '2026-02-10', domain: 'health', done: false },
    { id: '5', title: 'Set up Firefly III', priority: 'medium', due: '2026-02-20', domain: 'finance', done: false },
  ]

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(t => t.priority === filter)

  const overdueTasks = tasks.filter(t => !t.done && new Date(t.due) < new Date())
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && !t.done)

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <section className="grid grid-cols-3 gap-4">
        <SummaryCard 
          label="Total Tasks" 
          value={tasks.length} 
          subtext={`${tasks.filter(t => t.done).length} done`}
        />
        <SummaryCard 
          label="High Priority" 
          value={highPriorityTasks.length}
          color="red"
        />
        <SummaryCard 
          label="Overdue" 
          value={overdueTasks.length}
          color={overdueTasks.length > 0 ? 'red' : undefined}
        />
      </section>

      {/* Filters */}
      <section>
        <div className="flex gap-2">
          {(['all', 'high', 'medium', 'low'] as const).map(p => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`
                px-4 py-2 rounded-lg text-sm capitalize transition-colors
                ${filter === p 
                  ? 'bg-white/10 text-white' 
                  : 'bg-white/5 text-white/40 hover:text-white/60'
                }
              `}
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      {/* Task List */}
      <section>
        <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">
          {filter === 'all' ? 'All Tasks' : `${filter} Priority`}
        </h3>
        <div className="space-y-2">
          {filteredTasks.length === 0 ? (
            <p className="text-white/30 text-sm text-center py-8">No tasks</p>
          ) : (
            filteredTasks.map(task => (
              <TaskRow key={task.id} task={task} overdue={new Date(task.due) < new Date()} />
            ))
          )}
        </div>
      </section>

      {/* Add Task */}
      <section>
        <button className="w-full p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] border-dashed rounded-xl text-center transition-colors">
          <span className="text-2xl mb-2 block">➕</span>
          <span className="text-sm text-white/60">Add new task</span>
        </button>
      </section>
    </div>
  )
}

function SummaryCard({ label, value, subtext, color }: { label: string; value: number; subtext?: string; color?: string }) {
  const colorClasses = color === 'red' ? 'bg-red-500/10 text-red-400' : 'bg-white/[0.02]'

  return (
    <div className={`p-4 rounded-xl ${colorClasses}`}>
      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{label}</p>
      <p className="text-3xl font-light">{value}</p>
      {subtext && <p className="text-white/30 text-xs mt-1">{subtext}</p>}
    </div>
  )
}

function TaskRow({ task, overdue }: { task: any; overdue: boolean }) {
  const priorityColors: Record<string, string> = {
    high: 'text-red-400',
    medium: 'text-yellow-400',
    low: 'text-blue-400'
  }

  const domainIcons: Record<string, string> = {
    health: '💪',
    finance: '💰',
    business: '🚀',
    system: '⚙️'
  }

  return (
    <div className={`
      flex items-center gap-3 p-3 rounded-lg transition-colors
      ${overdue ? 'bg-red-500/5 border border-red-500/10' : 'bg-white/[0.02]'}
    `}>
      <input 
        type="checkbox" 
        checked={task.done}
        className="w-5 h-5 rounded border-white/20 bg-transparent"
        readOnly
      />
      <span className="text-lg">{domainIcons[task.domain]}</span>
      <div className="flex-1">
        <p className={`text-sm ${task.done ? 'line-through text-white/30' : ''}`}>
          {task.title}
        </p>
      </div>
      <span className={`text-xs ${priorityColors[task.priority]}`}>
        {task.priority}
      </span>
      <span className={`text-xs ${overdue ? 'text-red-400' : 'text-white/30'}`}>
        {overdue ? 'Overdue' : task.due}
      </span>
    </div>
  )
}
