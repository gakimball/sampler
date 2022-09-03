export interface KeyDefinition {
  tone: number;
  label: string;
  useKey: string;
}

export const keys: KeyDefinition[] = [
  { tone: 48, label: 'C', useKey: 'a' },
  { tone: 49, label: 'C#', useKey: 'w' },
  { tone: 50, label: 'D', useKey: 's' },
  { tone: 51, label: 'D#', useKey: 'e' },
  { tone: 52, label: 'E', useKey: 'd' },
  { tone: 53, label: 'F', useKey: 'f' },
  { tone: 54, label: 'F#', useKey: 't' },
  { tone: 55, label: 'G', useKey: 'g' },
  { tone: 56, label: 'G#', useKey: 'y' },
  { tone: 57, label: 'A', useKey: 'h' },
  { tone: 58, label: 'A#', useKey: 'u' },
  { tone: 59, label: 'B', useKey: 'j' },
]
