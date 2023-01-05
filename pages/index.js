import { useEffect, useState } from 'react'
import { Button, Label, Spinner, TextInput } from 'flowbite-react'
import ErrorModal from 'components/modals/Error'
import axios from 'axios'

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
      <div className="grid grid-cols-1 lg:gap-36 h-full w-full md:h-1/2 lg:w-1/2 lg:grid-cols-2">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="ip-address" value="Your IP Address" />
            </div>
            <div className="flex flex-col gap-2 w-full items-center">
              <TextInput
                className="w-full"
                id="ip-address"
                type="text"
                placeholder="Domain or IP Address"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required={true}
                autoComplete="off"
              />
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
        {loading ? (
          <div
            className="h-full flex items-center justify-center"
            role="status"
          >
            <Spinner size="lg" />
          </div>
        ) : (
          <pre className="text-gray-900 dark:text-white overflow-x-scroll">
            {ipResponse && JSON.stringify(ipResponse, undefined, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}
