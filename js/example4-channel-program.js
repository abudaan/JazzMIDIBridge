/*!
 * copyright 2012 abudaan
 * code licensed under MIT 
 * http://abumarkub.net/midibridge/license
 * 
 * 
 * example of how you can connect MIDI inputs and outputs with MIDIAccess, and how to change the channel and the program
 * 
 *  dependecies:
 *  - JazzMIDIBridge.js
 *  - MIDIDeviceSelector.js
 *  - MIDIProgramSelector.js
 *  - Selector.js
 */

window.addEventListener('load', function() {

    "use strict";

    var input = null,
        output = null,
        channel = 0,
        program = 0,
        channels = [],
        selectInput = document.getElementById("inputs"),
        selectOutput = document.getElementById("outputs"),
        selectChannel = document.getElementById("channels"),
        selectProgram = document.getElementById("programs"),
        midiMessages = document.getElementById("messages");
    
    (function(){
        var i = 0;
        while(i < 16){
            channels.push({
                description: "channel " + i,
                id: i
            });
            i = i + 1;
        }
    }());
    
    function connectDevices(MIDIAccess){
        if(input){
            input.addEventListener("midimessage",function(msg){
                msg = MIDIAccess.createMIDIMessage(msg.command,msg.data1,msg.data2,channel);
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
            output.sendMIDIMessage(MIDIAccess.createMIDIMessage(JMB.PROGRAM_CHANGE,program,0,channel));
            connectDevices(MIDIAccess);        
        });

        //create dropdown menu for MIDI channels
        JMB.createSelector(selectChannel,channels,function(option){
            channel = option.id;
            output.sendMIDIMessage(MIDIAccess.createMIDIMessage(JMB.PROGRAM_CHANGE,program,0,channel));
        });

        //create dropdown menu for MIDI programs
        JMB.createMIDIProgramSelector(selectProgram,function(option){
            program = option.id;
            if(output){
                output.sendMIDIMessage(MIDIAccess.createMIDIMessage(JMB.PROGRAM_CHANGE,program,0,channel));
            }
        });
    });

}, false);
