The JazzMIDIBridge makes it easy to use the Jazz plugin written by Sema: http://jazz-soft.net/. 

The Jazz plugin is a browser plugin that adds MIDI functionality to your browser.

All major browsers on Windows and OSX are supported.

You have to install the plugin before you can use the JazzMIDIBridge. 

Download your copy from http://jazz-soft.net/download/, it installs in a breeze!


In fact the JazzMIDIBridge is a wrapper around a wrapper; the Jazz browser plugin is wrapped in a MIDIAccess object, and the MIDIAccess object  is wrapped in the JazzMIDIBridge object.

The MIDIAccess wrapper is a partial implementation of Jussi Kalliokoski's W3C proposal for native MIDI support in browsers (see: https://gist.github.com/1752949).

The JazzMIDIBridge wrapper provides methods that allow you to add MIDI functionality to your applications fast and easy.

The JazzMIDIBridge wrapper can be referenced by the global variable JMB. JMB is like the $ in jQuery.

The MIDIAccess wrapper can be referenced by the local variable that is the return value of the callback of the init() method:

``
JMB.init(function(MIDIAccess){
	//your code goes here
});
``

As you can see, you could call MIDIAccess anything you like, but it is recommended to use the 'standard' naming.


In the repo you will find some examples that you can use as a starting point for your own code.