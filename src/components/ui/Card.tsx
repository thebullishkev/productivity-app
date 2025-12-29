import { type HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'highlight'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-surface',
      interactive: 'bg-surface cursor-pointer hover:shadow-md hover:border-gray-200',
      highlight: 'bg-primary/5 border-primary/20',
    }

    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-2xl border border-gray-100 shadow-sm transition-all duration-200 p-4',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Sub-components for compound pattern
export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('flex items-center justify-between mb-3', className)} {...props} />
)

export const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={clsx('text-lg font-semibold text-text', className)} {...props} />
)

export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('text-text-muted', className)} {...props} />
)

export const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('flex items-center gap-2 mt-4 pt-4 border-t border-gray-100', className)} {...props} />
)
