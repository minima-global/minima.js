#################
Install minima.js
#################

.. _gettingStartedInstall:

Install
=======

Clone this repo', then, in the repo's home directory:

1. `npm install`
2. `npm run build`
3. `npm pack`

At the time of writing `package.json` sets the version to `0.96.13`, so the command above will create `minima.js-0.96.13.tgz`.

Use
===

In a.n.other node project:

1. `npm install /path/to/minima.js-0.96.13.tgz --save`

Then, in the source file where you want to use Minima:

* `import { Minima, Token } from 'minima'`

Then you can:

* `Minima.init(` etc.
* `Minima.cmd(` etc.

Enjoy :)
