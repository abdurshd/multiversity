import { create } from 'zustand';
import type { ProjectId } from './planning';
/** View-only mirror while planning. Narrative flags remain unchanged until the
 * completed two-shift record is handed over. Never used to resolve an ending. */
export const useFutureRepairs = create<{ completed: ProjectId[]; show: (completed: ProjectId[]) => void }>((set) => ({ completed: [], show: (completed) => set({ completed: [...completed] }) }));
