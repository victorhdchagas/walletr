const ReactCompilerConfig = {
  sources: (filename: string) => {
    return filename.indexOf('src') !== -1
  },
}
export default ReactCompilerConfig
