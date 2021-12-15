import { withSentry, captureException } from '@sentry/nextjs'
import * as Url from 'url'

// Change host appropriately if you run your own Sentry instance.
const sentryHost = 'o1091498.ingest.sentry.io'

// Set knownProjectIds to an array with your Sentry project IDs which you
// want to accept through this proxy.
const knownProjectIds = ['/6108506']

async function handler(req: any, res: any) {
  try {
    const envelope = req.body
    const pieces = envelope.split('\n')

    const header = JSON.parse(pieces[0])

    const { host, pathname } = new URL(header.dsn)
    if (host !== sentryHost) {
      throw new Error(`invalid host: ${host}`)
    }

    const projectId = pathname?.endsWith('/') ? pathname.slice(0, -1) : pathname
    if (!projectId) {
      throw new Error(`No project id found...`)
    } else if (projectId && !knownProjectIds.includes(projectId)) {
      throw new Error(`invalid project id: ${projectId}`)
    }

    const url = `https://${sentryHost}/api/${projectId}/envelope/`
    const response = await fetch(url, {
      method: 'POST',
      body: envelope,
    })
    return response.json()
  } catch (e) {
    captureException(e)
    return res.status(400).json({ status: 'invalid request' })
  }
}

export default withSentry(handler)
