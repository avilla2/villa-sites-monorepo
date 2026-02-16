# @villa-components/components

Shared UI component library for Villa Sites monorepo.

## Overview

This package contains reusable UI components shared between the `solar` and `system` packages.

## Installation

```bash
yarn add @villa-components/components
```

## Usage

```javascript
import { YourComponent } from '@villa-components/components'

function App() {
  return <YourComponent />
}
```

## Development

### Build

```bash
yarn build
```

### Watch mode

```bash
yarn dev
```

## Adding New Components

1. Create a new component file in `src/`
2. Export it from `src/index.js`
3. Run `yarn build` to compile

## Peer Dependencies

This library requires the following peer dependencies:
- React ^18.2.0
- React DOM ^18.2.0
- Material-UI ^5.0.0
- Emotion (React & Styled)
