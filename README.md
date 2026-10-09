# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## GitHub Actions and VPS deployment

Pull requests to `main` and pushes to `main` run the Astro build, Jest tests, and Playwright tests in Chromium, Firefox, and WebKit. A successful push to `main` uploads the generated `dist/` site to the VPS over SSH. The VPS must serve the configured deployment directory as the website document root.

Add these repository secrets under **Settings → Secrets and variables → Actions**:

| Secret | Value |
| --- | --- |
| `VPS_HOST` | VPS hostname or IP address |
| `VPS_USER` | SSH user that can write to the website directory |
| `VPS_SSH_KEY` | Private SSH key for that user (OpenSSH format) |
| `VPS_KNOWN_HOSTS` | Verified SSH host key line for the VPS, including the hostname/IP |
| `VPS_DEPLOY_PATH` | Absolute path to the dedicated website directory, for example `/var/www/aleixmp.dev` |
| `VPS_PORT` | SSH port; optional, defaults to `22` |

Create the deployment directory on the VPS first and grant the SSH user write access. Configure Nginx, Caddy, or the existing web server to serve that directory. The workflow mirrors `dist/` into it and removes stale files, so use a dedicated directory for this site.

Create a deploy key on a trusted machine and add its public key to the VPS user's `~/.ssh/authorized_keys`. Obtain the server fingerprint through a trusted channel before adding its host key to `VPS_KNOWN_HOSTS`; the workflow enforces strict host key checking.
