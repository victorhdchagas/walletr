interface DateAtom {
  defaultValue: string | Date
  name?: string
}

export default function DateAtom({
  defaultValue,
  name = 'start-date',
}: DateAtom) {
  return (
    <input
      type="date"
      name={name}
      defaultValue={
        typeof defaultValue === 'string'
          ? defaultValue
          : defaultValue.toISOString().substring(0, 10)
      }
    />
  )
}
