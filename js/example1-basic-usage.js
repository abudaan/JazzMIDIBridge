/*!
 *  copyright 2012 abudaan http://abumarkub.net
 *  code licensed under MIT 
 *  http://abumarkub.net/midibridge/license
 * 
 * 
 *  example that show the most basic way of using MIDIAccess; it connects the first MIDI input to the first MIDI output
 *  
 *  
 *  if the first MIDI input is a keyboard and the first MIDI output is a synthesizer, or is connected to a synthesizer,
 *  you should be able to hear what you play on your keyboard.
 *  
 *  if you have a different MIDI setup, try the setup-connections example
 * 
 *  dependecies:
 *  - JazzMIDIBridge.js
 *  
 */


window.addEventListener('load', function() {
    "use strict";
    
    JMB.init(function(MIDIAccess){
        var output = MIDIAccess.getOutput(0),
            input = MIDIAccess.getInput(5),
            midiDevices = document.getElementById("devices"),
            midiMessages = document.getElementById("messages");

        if(input !== undefined){
            //show the current input
            midiDevices.innerHTML += "<div class='device'><span class='device-type'>input: </span><span class='device-name'>" + input.deviceName + "</span></div>";        

            input.addEventListener('midimessage',function(msg){
                //add the messages to the console and scroll to top
                midiMessages.innerHTML += "<div class='message'>" + msg.toString() + "</div>";
                midiMessages.scrollTop = midiMessages.scrollHeight;
                //pass on the incoming MIDI message to the output
                output.sendMIDIMessage(msg);  
            });
        }    

        if(output !== undefined){
            //show the current output
            midiDevices.innerHTML += "<div class='device'><span class='device-type'>output: </span><span class='device-name'>" + output.deviceName + "</span></div>";                                   
        }
    });
});