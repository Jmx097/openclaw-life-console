'use client'

import { useState } from 'react'
import Modal from './Modal'
import TabButton from '../TabButton'
import SalesTab from '../tabs/SalesTab'
import MarketingTab from '../tabs/MarketingTab'
import InfrastructureTab from '../tabs/InfrastructureTab'
import TasksTab from '../tabs/TasksTab'

interface BusinessModalProps {
  onClose: () => void
  data?: any
}

export default function BusinessModal({ onClose, data }: BusinessModalProps) {
  const [activeTab, setActiveTab] = useState<'sales' | 'marketing' | 'infrastructure' | 'tasks'>('sales')

  return (
    <Modal onClose={onClose} title="Business" icon="🚀" color="#3b82f6">
      {/* Tabs */}
      <div className="flex gap-2 p-4 border-b border-white/[0.06] flex-wrap">
        <TabButton 
          active={activeTab === 'sales'} 
          onClick={() => setActiveTab('sales')}
          icon="💼"
          label="Sales"
        />
        <TabButton 
          active={activeTab === 'marketing'} 
          onClick={() => setActiveTab('marketing')}
          icon="📢"
          label="Marketing"
        />
        <TabButton 
          active={activeTab === 'infrastructure'} 
          onClick={() => setActiveTab('infrastructure')}
          icon="🏗️"
          label="Infra"
        />
        <TabButton 
          active={activeTab === 'tasks'} 
          onClick={() => setActiveTab('tasks')}
          icon="✅"
          label="Tasks"
        />
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto flex-1">
        {activeTab === 'sales' && <SalesTab />}
        {activeTab === 'marketing' && <MarketingTab />}
        {activeTab === 'infrastructure' && <InfrastructureTab />}
        {activeTab === 'tasks' && <TasksTab />}
      </div>
    </Modal>
  )
}
