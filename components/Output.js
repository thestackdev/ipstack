import Spinner from 'components/Spinner'

export default function Output({ ipResponse, loading }) {
  if (loading)
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner />
      </div>
    )

  if (!ipResponse) return null

  return (
    <pre className="text-gray-900 dark:text-white overflow-x-scroll">
      {ipResponse && JSON.stringify(ipResponse, undefined, 2)}
    </pre>
  )
}
