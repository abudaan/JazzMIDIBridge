The JazzMIDIBridge is a wrapper for the [Jazz plugin](http://jazz-soft.net/) written by Sema. 

The Jazz plugin is a browser plugin that adds MIDI functionality to your browser.

You have to [install the plugin](http://jazz-soft.net/download/) before you can use the JazzMIDIBridge. 

All major browsers on Windows and OSX are supported.

***

In fact, the JazzMIDIBridge is a wrapper around a wrapper; the Jazz browser plugin is wrapped in a MIDIAccess object, and the MIDIAccess object  is wrapped in a JazzMIDIBridge object.

The MIDIAccess wrapper is a partial implementation of Jussi Kalliokoski's [W3C proposal]( https://gist.github.com/1752949) for native MIDI support in browsers.

The JazzMIDIBridge wrapper provides methods that allow you to add MIDI functionality to your applications fast and easy.

The JazzMIDIBridge wrapper can be referenced by the global variable [JMB](https://github.com/abudaan/JazzMIDIBridge/wiki/JMB). JMB is like the $ in jQuery.

The MIDIAccess wrapper can be referenced by the local variable that is the return value of the callback of the init() method:

```
JMB.init(function(MIDIAccess){
	//your code goes here
});
```

As you can see, you could call MIDIAccess anything you like, but it is recommended to use the 'standard' naming.

***

In the repo you will find some examples that you can use as a starting point for your own code. You can check some of the examples online as well:
* [Select MIDI in- and output](http://abumarkub.net/jazzmidibridge/example2-input-output.html)
* [Use computer keyboard as MIDI keyboard](http://abumarkub.net/jazzmidibridge/example3-computer-keyboard.html)
* [Select MIDI in- and output and channel and program](http://abumarkub.net/jazzmidibridge/example4-channel-program.html)

For a complete API reference check the [**Wiki**](https://github.com/abudaan/JazzMIDIBridge/wiki).

***

Files and folders:
* css: the css files of the examples
* js: the javascript code of the examples
* lib: 
       - JazzMIDIBridge.js file and its minified version jazzmidibridge-x.y.min.js
       - JazzMIDIBridge plugins and minified versions
      
Some of the examples use plugins, these plugins provide handy MIDI related functionality such as creating dropdown menus for MIDI in- and outputs.
