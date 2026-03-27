import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [reactRouter()],
  css: {
    preprocessorOptions: {
      scss: {
        // silence the Sass legacy JS API deprecation warnings
        silenceDeprecations: ['legacy-js-api']
      }
    }
  },
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
