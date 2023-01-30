import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import ErrorModal from 'components/modals/Error'
import Output from 'components/Output'
import { useEffect, useState } from 'react'

export default function () {
  const [ipResponse, setIpResponse] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchIpAddress({ myIP: true })
  }, [])

  const fetchIpAddress = async ({ myIP }) => {
    try {
      let ipAddress = inputValue
      setLoading(true)
      setIpResponse(null)
      setError(null)
      if (myIP)
        ipAddress = (await axios.get('https://api.db-ip.com/v2/free/self')).data
          .ipAddress
      const response = await axios.get(`/api?ip=${ipAddress}`)
      setIpResponse(response.data)
    } catch (error) {
      console.log(error)
      setError(error?.response?.data?.message ?? 'Something went wrong')
    }
    setLoading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchIpAddress({ myIP: false })
  }

  return (
    <div className="flex flex-col flex-grow mx-auto items-center dark:bg-gray-900 p-5">
      <ErrorModal error={error} setError={setError} />
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Find your IP details online
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Track your ip address, ip loaction, isp details and much more...
      </p>
      <div className="grid grid-cols-1 lg:gap-24 h-full w-full md:h-1/2 lg:w-3/4 lg:grid-cols-2">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="ip-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
            </div>
            <input
              type="search"
              id="ip-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Domain or IP Address"
              autoComplete="off"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        <Output loading={loading} ipResponse={ipResponse} />
      </div>
    </div>
  )
}
