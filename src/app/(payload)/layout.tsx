/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './admin/importMap.js'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

// Runs admin panel actions on the server.
const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  // Returns the result of the server action.
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

// Renders the admin panel layout.
const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

// Exports the admin panel layout.
export default Layout
