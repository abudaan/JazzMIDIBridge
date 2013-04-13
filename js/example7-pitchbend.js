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
 * 
 */

window.addEventListener('load', function() {

    "use strict";

    var input = null,
        output = null,
        channel = 0,
        pitchbendSlider = document.getElementById("pitchbend"),
        pitchbendValue = document.getElementById("pitchbend-value"),
        selectInput = document.getElementById("inputs"),
        selectOutput = document.getElementById("outputs"),
        midiMessages = document.getElementById("messages");

    pitchbendValue.innerHTML = pitchbendSlider.value = 64;
    
    
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
            connectDevices(MIDIAccess);        
        });

        //process pitchbend
        pitchbendSlider.addEventListener("change",function(e){
            var 
                data2 = pitchbendSlider.value,
                data1 = data2 === "127" ? 127 : 0,
                msg = MIDIAccess.createMIDIMessage(JMB.PITCH_BEND,data1,data2,channel);
            
            pitchbendValue.innerHTML = data2;

            if(output){
                output.sendMIDIMessage(msg);
                midiMessages.innerHTML += msg.toString() + "<br/>";
                midiMessages.scrollTop = midiMessages.scrollHeight;
            }
        }, false);

    });

}, false);
