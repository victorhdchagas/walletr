import { useNavigation } from 'react-router-dom'

export default function SubmitButtonAtom({
  text,
  intent = 'default',
}: {
  text: string
  intent?: string
}) {
  const navigation = useNavigation()

  const content =
    navigation.state === 'submitting'
      ? 'bg-orange-500'
      : navigation.state === 'loading'
      ? 'bg-emerald-500'
      : ' bg-slate-900'
  return (
    <button
      type="submit"
      name="intent"
      value={intent}
      className={'px-2 py-1 rounded-lg border border-slate-200 text-slate-500 hover:bg-opacity-50 transition-colors'.concat(
        content,
      )}
    >
      {text}
    </button>
  )
}
