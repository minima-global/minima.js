###################
Initialising Minima
###################


.. _initialise minima.js:

Initialise Example
==================

::

    Minima.init( function( msg ) {

      console.log("minima event", msg)

      if ( msg.event == "connected" ) {

        console.log("connected");

      }
    });

`Minima.init` allows you to specify a callback that enables you to monitor Minima events.
