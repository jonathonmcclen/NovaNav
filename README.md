## 🧭 RealFastNav

**Composable React navigation bars, headers, and footers.**

[![npm version](https://img.shields.io/npm/v/realfastnav.svg)](https://www.npmjs.com/package/realfastnav)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Build](https://github.com/jonathonmcclendon/RealFastNav/actions/workflows/build.yml/badge.svg)](https://github.com/jonathonmcclendon/RealFastNav/actions)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](https://github.com/jonathonmcclendon/RealFastNav/issues)

---

### Installation

```bash
npm install realfastnav
# or
yarn add realfastnav
```

Peer dependencies (not bundled): `react`, `react-dom`, `@headlessui/react`, `@heroicons/react`, `react-icons`.

---

### Quick Start

```jsx
import { WithFlyout } from "realfastnav";

export default function App() {
  return (
    <header>
      <WithFlyout />
    </header>
  );
}
```

Available components vary (e.g., `WithFlyout`, `SimpleDark`, `SimpleLight`, `CenterLogo`, `WithSearch`, etc.).

---

### Features

- Responsive, accessible navigation built on Headless UI
- Dark/light variants and mobile-friendly menus
- Heroicons and React Icons support
- Tailwind-ready markup

---

### Contributing

We welcome pull requests and feature suggestions. See [CONTRIBUTING.md](CONTRIBUTING.md).

---

### License

Licensed under the [MIT License](LICENSE). © 2025 [Jonathon McClendon](https://github.com/jonathonmcclendon)
