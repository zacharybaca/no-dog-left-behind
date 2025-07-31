import { useContext } from 'react'
import { WidgetOptionsContext } from '../contexts/WidgetOptions/WidgetOptionsContext.jsx'

export const useWidgetOptions = () => useContext(WidgetOptionsContext)
