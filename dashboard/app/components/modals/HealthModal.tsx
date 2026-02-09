'use client'

import { useState } from 'react'
import Modal from './Modal'
import TabButton from '../TabButton'
import FitnessTab from '../tabs/FitnessTab'
import NutritionTab from '../tabs/NutritionTab'

interface HealthModalProps {
  onClose: () => void
  data?: any
}

export default function HealthModal({ onClose, data }: HealthModalProps) {
  const [activeTab, setActiveTab] = useState<'fitness' | 'nutrition'>('fitness')

  return (
    <Modal onClose={onClose} title="Health" icon="💪" color="#22c55e">
      {/* Tabs */}
      <div className="flex gap-2 p-4 border-b border-white/[0.06]">
        <TabButton 
          active={activeTab === 'fitness'} 
          onClick={() => setActiveTab('fitness')}
          icon="🏃"
          label="Fitness"
        />
        <TabButton 
          active={activeTab === 'nutrition'} 
          onClick={() => setActiveTab('nutrition')}
          icon="🥗"
          label="Nutrition"
        />
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto flex-1">
        {activeTab === 'fitness' && <FitnessTab />}
        {activeTab === 'nutrition' && <NutritionTab />}
      </div>
    </Modal>
  )
}
