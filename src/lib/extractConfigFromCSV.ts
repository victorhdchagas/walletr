export function extractStringFromCSVFile(file?: File): Promise<string> {
  if (!file) return Promise.resolve('')
  const reader = new FileReader()
  reader.readAsText(file)
  return new Promise<string>((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = () => {
      reject(reader.error)
    }
  })
}
