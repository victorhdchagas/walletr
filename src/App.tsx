import InputFileAtom from './components/atoms/inputs/file.atom'
import CSVViewer from './components/CSVViewer'
import packageJson from '../package.json'
function App() {
  return (
    <div>
      <h1>{packageJson.name}!</h1>
      <InputFileAtom />
      <CSVViewer />
    </div>
  )
}

export default App
