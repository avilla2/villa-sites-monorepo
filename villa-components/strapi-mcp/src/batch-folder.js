// Prompt interpretation belongs to the calling agent, once per batch, not each image model.
export function batchFolderName(value, date = new Date()) {
  if (value === undefined) {
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date)
  }
  if (
    typeof value !== 'string' ||
    !value.trim() ||
    value.trim().length > 100 ||
    /[\/\\\x00-\x1f\x7f]/.test(value) ||
    ['.', '..'].includes(value.trim())
  ) {
    throw new Error(
      'subfolderName must be a single folder name of 1–100 characters without slashes or control characters'
    )
  }
  return value.trim()
}
