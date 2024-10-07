import toast from 'react-hot-toast'

interface ToastIt {
  data: string | Promise<unknown>
  options?: {
    success?: string | boolean
    error?: string | boolean
    fallback?: string
  }
}
export function ToastIt({ data, options = { success: true } }: ToastIt) {
  if (typeof data === 'string') {
    if (options?.success) {
      toast.custom((t) => ToastSuccess({ text: data, t }))
    }
  }

  function ToastSuccess({
    text,
    t,
  }: {
    text: string
    t: { id: string; visible: boolean }
  }) {
    return (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src="/walletr.svg"
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">{text}</div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    )
  }
}
