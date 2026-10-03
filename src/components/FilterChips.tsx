import { useState } from 'react'
import styles from './FilterChips.module.css'

export interface FilterOption {
  value: string
  count: number
}

interface FilterChipsProps {
  title: string
  options: FilterOption[]
  selected: string[]
  onToggle: (value: string) => void
  // How many chips to show before the "Show all" button.
  initialCount?: number
}

// One reusable group of toggle buttons. The parent owns the selected values;
// this component only displays them and reports clicks (a "controlled" component).
function FilterChips({ title, options, selected, onToggle, initialCount = 12 }: FilterChipsProps) {
  // Purely visual state, so it lives here and the parent never needs to know.
  const [showAll, setShowAll] = useState(false)

  // Collapsed view keeps the most common chips, plus anything selected so an
  // active filter can never be hidden.
  const shown = showAll
    ? options
    : options.filter((option, index) => index < initialCount || selected.includes(option.value))
  const canExpand = options.length > initialCount

  return (
    <details className={styles.group} open>
      <summary className={styles.summary}>
        {title}
        {selected.length > 0 && <span className={styles.badge}>{selected.length}</span>}
      </summary>
      <div className={styles.chips}>
        {shown.map((option) => {
          const isOn = selected.includes(option.value)
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isOn}
              className={isOn ? `${styles.chip} ${styles.on}` : styles.chip}
              onClick={() => onToggle(option.value)}
            >
              {option.value} <span className={styles.count}>{option.count}</span>
            </button>
          )
        })}
        {canExpand && (
          <button type="button" className={styles.more} onClick={() => setShowAll((v) => !v)}>
            {showAll ? 'Show fewer' : `Show all ${options.length}`}
          </button>
        )}
      </div>
    </details>
  )
}

export default FilterChips
