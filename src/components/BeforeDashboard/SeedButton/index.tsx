'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'

import './index.scss'

// Renders the message shown after seeding works.
const SuccessMessage: React.FC = () => (
  <div>
    Database seeded! You can now{' '}
    <a target="_blank" href="/">
      visit your website
    </a>
  </div>
)

// Shows a button that fills the database with sample data.
export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<null | string>(null)

  // Handles click.
  const handleClick = useCallback(
    // Starts seeding when the button is clicked.
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      // Checks if seeded is set.
      if (seeded) {
        toast.info('Database already seeded.')
        // Returns early when the database is already seeded.
        return
      }
      // Checks if loading is set.
      if (loading) {
        toast.info('Seeding already in progress.')
        // Returns early when seeding is already running.
        return
      }
      // Checks if error is set.
      if (error) {
        toast.error(`An error occurred, please refresh and try again.`)
        // Returns early when an error happened before.
        return
      }

      setLoading(true)

      try {
        toast.promise(
          new Promise((resolve, reject) => {
            try {
              fetch('/next/seed', { method: 'POST', credentials: 'include' })
                .then((res) => {
                  // Checks if ok is set.
                  if (res.ok) {
                    resolve(true)
                    setSeeded(true)
                  } else {
                    reject('An error occurred while seeding.')
                  }
                })
                .catch((error) => {
                  reject(error)
                })
            } catch (error) {
              reject(error)
            }
          }),
          {
            loading: 'Seeding with data....',
            success: <SuccessMessage />,
            error: 'An error occurred while seeding.',
          },
        )
      } catch (err) {
        const error = err instanceof Error ? err.message : String(err)
        setError(error)
      }
    },
    [loading, seeded, error],
  )

  let message = ''
  // Checks if loading is set.
  if (loading) message = ' (seeding...)'
  // Checks if seeded is set.
  if (seeded) message = ' (done!)'
  // Checks if error is set.
  if (error) message = ` (error: ${error})`

  // Returns the seed button and its status message.
  return (
    <Fragment>
      <button className="seedButton" onClick={handleClick}>
        Seed your database
      </button>
      {message}
    </Fragment>
  )
}
