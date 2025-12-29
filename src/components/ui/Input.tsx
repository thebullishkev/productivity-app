import { forwardRef, type InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full rounded-xl border bg-surface px-4 py-2.5',
            'text-text placeholder:text-text-muted',
            'focus:outline-none focus:ring-2 transition-all duration-150',
            error
              ? 'border-accent-error focus:border-accent-error focus:ring-accent-error/20'
              : 'border-gray-200 focus:border-primary focus:ring-primary/20',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-accent-error">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// Textarea variant
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full rounded-xl border bg-surface px-4 py-2.5 resize-none',
            'text-text placeholder:text-text-muted',
            'focus:outline-none focus:ring-2 transition-all duration-150',
            error
              ? 'border-accent-error focus:border-accent-error focus:ring-accent-error/20'
              : 'border-gray-200 focus:border-primary focus:ring-primary/20',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-accent-error">{error}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
