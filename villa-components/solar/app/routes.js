import { index, route, layout } from '@react-router/dev/routes'

export default [
  layout('routes/layout.jsx', [
    index('routes/home.jsx'),
    route('sitemap', 'routes/sitemap.jsx'),
    route(':pageLink', 'routes/content-page.jsx'),
    route('*', 'routes/not-found.jsx')
  ])
]
