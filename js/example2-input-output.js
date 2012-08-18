/*!
 * copyright 2012 abudaan
 * code licensed under MIT 
 * http://abumarkub.net/midibridge/license
 * 
 * 
 * example of how you can connect MIDI inputs and outputs with MIDIAccess
 * 
 *  dependecies:
 *  - JazzMIDIBridge.js
 *  - MIDIDeviceSelector.js
 */

window.addEventListener('load', function() {

    "use strict";

    var input = null,
        output = null,
        selectInput = document.getElementById("inputs"),
        selectOutput = document.getElementById("outputs"),
        midiMessages = document.getElementById("messages");
    
    
    function connectDevices(MIDIAccess){
        if(input){
            input.addEventListener("midimessage",function(msg){
                if(output){
                    output.sendMIDIMessage(msg);
                }
                midiMessages.innerHTML += msg.toString() + "<br/>";
                midiMessages.scrollTop = midiMessages.scrollHeight;
            });
        }
    }

    JMB.init(function(MIDIAccess){
        
        var inputs = MIDIAccess.enumerateInputs(),
            outputs = MIDIAccess.enumerateOutputs();       
 
        //create dropdown menu for MIDI inputs
        JMB.createMIDIDeviceSelector(selectInput,inputs,"input",function(deviceId){
            if(input){
                input.close();
            }
            input = MIDIAccess.getInput(deviceId);
            connectDevices(MIDIAccess);        
        });

        //create dropdown menu for MIDI outputs
        JMB.createMIDIDeviceSelector(selectOutput,outputs,"ouput",function(deviceId){
            if(output){
                output.close();
            }
            output = MIDIAccess.getOutput(deviceId);
            connectDevices(MIDIAccess);        
        });
           
    });

}, false);
