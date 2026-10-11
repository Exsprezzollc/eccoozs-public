import type { ClueLab, DetectiveNotebookEntry, TeachingModule } from "../domain";

export function notebookEntryFromClueLab(args: {
  learnerId: string;
  clueLab: ClueLab;
  sourceCaseId?: string;
  now?: string;
}): DetectiveNotebookEntry {
  const now = args.now ?? new Date().toISOString();
  return {
    id: `${args.learnerId}:${args.clueLab.skillId}`,
    learnerId: args.learnerId,
    skillId: args.clueLab.skillId,
    title: args.clueLab.notebookEntry.title,
    summary: args.clueLab.notebookEntry.summary,
    sourceCaseId: args.sourceCaseId,
    unlockedAt: now,
    updatedAt: now,
  };
}


export function notebookEntryFromTeachingModule(args: {
  learnerId: string;
  module: TeachingModule;
  sourceCaseId?: string;
  now?: string;
}): DetectiveNotebookEntry | undefined {
  if (!args.module.notebookTool) return undefined;
  const now = args.now ?? new Date().toISOString();
  return {
    id: `${args.learnerId}:${args.module.skillId}`,
    learnerId: args.learnerId,
    skillId: args.module.skillId,
    title: args.module.notebookTool.title,
    summary: args.module.notebookTool.reminder,
    sourceCaseId: args.sourceCaseId,
    unlockedAt: now,
    updatedAt: now,
  };
}
