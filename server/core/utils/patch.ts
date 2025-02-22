export const patch = <T>(currentValue: T, newValue: T | null | undefined): T | undefined => {
  if (newValue === undefined) return currentValue // Retain current value
  if (newValue === null) return undefined        // Clear value
  return newValue                               // Set new value
}