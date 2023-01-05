import { Button, Modal } from 'flowbite-react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

export default function ErrorModal({ error, setError }) {
  return (
    <Modal show={error} size="md" popup={true} onClose={() => setError(null)}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {error}
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => setError(null)}>
              Okay
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
