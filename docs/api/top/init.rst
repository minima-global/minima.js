####
init
####

.. _apiInit:

`Minima.init` must be called **FIRST**. It can be called alone, i.e. `Minima.init()`, or with a callback function that can be used to monitor (and act upon) all Minima events, e.g:

::

  Minima.init( function( msg ) {

    console.log("Minima event", msg)

    if ( msg.event == "connected" ) {

      console.log("connected");
    }
  });
