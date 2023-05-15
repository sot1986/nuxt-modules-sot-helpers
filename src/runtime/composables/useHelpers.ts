import type { HelpersI } from '../types'
import { useNuxtApp } from '#imports'

export default function (): HelpersI {
  return useNuxtApp().$helpers
}
