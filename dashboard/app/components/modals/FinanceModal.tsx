'use client'

import { useState } from 'react'
import Modal from './Modal'
import TabButton from '../TabButton'
import InvestingTab from '../tabs/InvestingTab'
import TradingTab from '../tabs/TradingTab'

interface FinanceModalProps {
  onClose: () => void
  data?: any
}

export default function FinanceModal({ onClose, data }: FinanceModalProps) {
  const [activeTab, setActiveTab] = useState<'investing' | 'trading'>('investing')

  return (
    <Modal onClose={onClose} title="Finance" icon="💰" color="#a855f7">
      {/* Tabs */}
      <div className="flex gap-2 p-4 border-b border-white/[0.06]">
        <TabButton 
          active={activeTab === 'investing'} 
          onClick={() => setActiveTab('investing')}
          icon="📊"
          label="Investing"
        />
        <TabButton 
          active={activeTab === 'trading'} 
          onClick={() => setActiveTab('trading')}
          icon="📈"
          label="Trading"
        />
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto flex-1">
        {activeTab === 'investing' && <InvestingTab />}
        {activeTab === 'trading' && <TradingTab />}
      </div>
    </Modal>
  )
}
