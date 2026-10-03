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
}

// One reusable group of toggle buttons. The parent owns the selected values;
// this component only displays them and reports clicks (a "controlled" component).
function FilterChips({ title, options, selected, onToggle }: FilterChipsProps) {
  return (
    <details className={styles.group} open>
      <summary className={styles.summary}>
        {title}
        {selected.length > 0 && <span className={styles.badge}>{selected.length}</span>}
      </summary>
      <div className={styles.chips}>
        {options.map((option) => {
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
      </div>
    </details>
  )
}

export default FilterChips
