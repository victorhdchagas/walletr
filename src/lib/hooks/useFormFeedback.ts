import { useActionData } from 'react-router-dom'

export default function useFormFeedback() {
  const { error, message, ...actionData } = useActionData() as {
    error?: string
    message?: string
  }

  return {
    message,
    error,
    ...actionData,
  }
}
