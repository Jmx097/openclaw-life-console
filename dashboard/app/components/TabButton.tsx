interface TabButtonProps {
  active: boolean
  onClick: () => void
  icon: string
  label: string
}

export default function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
        ${active 
          ? 'bg-white/10 text-white' 
          : 'text-white/40 hover:text-white/60 hover:bg-white/5'
        }
      `}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
}
