# minima.js

Javascript package for accessing the Minima blockchain

## Install

Clone this repo', then, in the repo's home directory:

- `npm install`
- `npm run build`
- `npm pack`

At the time of writing `package.json` sets the version to `0.96.24`, so the command above will create `minima.js-0.96.24.tgz`.

## Use

In a.n.other node project:

1. `npm install /path/to/minima.js-0.96.24.tgz --save`

Then, in the source file where you want to use Minima:

- `import { Minima, Token } from 'minima'`

Then you can:

- `Minima.init(` etc.
- `Minima.cmd(` etc.

Enjoy :)
