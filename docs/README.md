# Minima Documentation

This directory contains documentation for _minima.js_.

The files use [reStructuredText](https://rest-sphinx-memo.readthedocs.io/en/latest/ReST.html), targeted at [sphinx](https://www.sphinx-doc.org/en/master/).

If you do not have sphinx installed, then:

```
pip install sphinx
```

You will also need the sphinx read-the-docs theme:

```
pip install sphinx-rtd-theme
```

Now you can generate the docs:

```
make html
```

That will create a static documentation website in _./build/html_, which you can load into any browser.
