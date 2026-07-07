export const downloadCv = async (): Promise<void> => {
  const response = await fetch('/cv.pdf')
  const blob = await response.blob()
  const url = window.URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.style.display = 'none'
  anchor.href = url
  anchor.download = 'cv.pdf'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.URL.revokeObjectURL(url)
}
