import React, { type AnchorHTMLAttributes } from 'react'
import styles from '../styles/Action.module.css'
interface ActionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'text'
}
const ActionLink = ({
  variant = 'primary',
  className = '',
  ...props
}: ActionLinkProps) => (
  <a
    className={`${styles.action} ${styles[variant]} ${className}`}
    {...props}
  />
)
export default ActionLink
