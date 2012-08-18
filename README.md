This project is a Javascript wrapper that makes it easy to use the Jazz plugin (http://jazz-soft.net/). 

The Jazz plugin is a browser plugin that adds MIDI functionality to your browser. It is written by Sema.

All major browsers on Windows and OSX are supported.

You have to install the plugin before you can use the JazzMIDIBridge. 

Download your copy from http://jazz-soft.net/download/, it installs in a breeze!


In fact the JazzMIDIBridge is a wrapper around a wrapper; the Jazz browser plugin is wrapped in a MIDIAccess object, and the MIDIAccess object  is wrapped in a JMB object.

The MIDIAccess wrapper is a (partial) implementation of Jussi Kalliokoski's W3C proposal for native MIDI support in browsers (https://gist.github.com/1752949).

The JMB wrapper provides methods that allow you to add MIDI functionality to your applications fast and easy.


In the repo you will find 4 examples that you can use as a starting point for your own code.