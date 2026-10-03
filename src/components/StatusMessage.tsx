import styles from './StatusMessage.module.css'

interface StatusMessageProps {
  message: string
  // Optional: only the error state passes this, which makes the button appear.
  onRetry?: () => void
}

function StatusMessage({ message, onRetry }: StatusMessageProps) {
  return (
    <div className={styles.box} role="status">
      <p className={styles.text}>{message}</p>
      {onRetry && (
        <button type="button" className={styles.button} onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}

export default StatusMessage
