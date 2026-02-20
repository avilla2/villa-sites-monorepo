import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
  ssr: {
    noExternal: [
      '@villa-components/graphql-queries',
      '@apollo/client'
    ]
  },
  resolve: {
    alias: {
      '@villa-components/components': '/Users/alexvilla/Projects/villa-sites-monorepo/villa-components/components'
    }
  }
})
