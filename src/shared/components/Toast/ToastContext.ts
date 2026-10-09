import { createContext } from 'react'
import type { ToastVariant } from './Toast'

export type ShowToast = (message: string, variant: ToastVariant) => void

export const ToastContext = createContext<ShowToast | null>(null)
