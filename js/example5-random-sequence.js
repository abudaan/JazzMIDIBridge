/*!
 *  copyright 2012 abudaan http://abumarkub.net
 *  code licensed under MIT 
 *  http://abumarkub.net/midibridge/license
 * 
 * 
 *  example of how you can send Javascript generated MIDI events to a MIDI output
 * 
 *  dependecies:
 *  - JazzMIDIBridge.js
 *  - MIDIDeviceSelector.js
 * 
 */

window.addEventListener('load', function() {
    
    "use strict";

    var output,
        maxDelay = 1500,
        currentNote = 0,
        sequenceLength = 100,
        sequencePosition = 0,
        selectOutput = document.getElementById("outputs"),
        messages = document.getElementById("messages"),
        btnStart = document.getElementById("start"),
        btnStop = document.getElementById("stop");

    
    //logs all events
    function logMessage(msg,clear){
        if(clear){
            messages.innerHTML = "";
        }
        messages.innerHTML += msg + "<br/>";
        messages.scrollTop = messages.scrollHeight;    
    }

    //sends MIDI message to the chosen output
    function send(midiMessage,callback){
        if(output){
            output.sendMIDIMessage(midiMessage);
            logMessage(JMB.getNoteName(midiMessage.data1) + " notenumber:" + midiMessage.data1 + " velocity:" + midiMessage.data2);
        }
        callback();
    }

    //acts as a basic sequencer
    function sendTimedMIDIEvent(midiMessage,delay,callback){
        if(delay > 0){
            logMessage(" - - delaying " + delay + " ms");
            setTimeout(function(){
                send(midiMessage,callback);
            },delay);
        }else{
            send(midiMessage,callback);
        }        
    }
        
    //creates a random MIDI message and sends it with a random delay to the selected MIDI output
    function sendRandomMIDIMessage(MIDIAccess){
        
        var delay, noteNumber, velocity, midiMessage;
                
        if(currentNote < sequenceLength){
            
            //delay random between 0 an maxDelay milliseconds
            delay = Math.floor((Math.random() * maxDelay));

            //noteNumber random between 21 (A0) an 108 (C8)
            noteNumber = Math.floor((Math.random() * 87) + 21);

            //velocity random between 10 and 127
            velocity = Math.floor((Math.random() * 127) + 10);

            //position in milliseconds
            sequencePosition += delay;

            midiMessage = MIDIAccess.createMIDIMessage(JMB.NOTE_ON, noteNumber, velocity, 0, sequencePosition);
            
            //recursively called until sequenceLength is reached    
            sendTimedMIDIEvent(midiMessage, delay, function(){
                currentNote = currentNote + 1;
                sendRandomMIDIMessage(MIDIAccess);
            });
        }else{
            logMessage(" - - stop");            
        }
    }
    

    JMB.init(function(MIDIAccess){
        //create dropdown menu for MIDI outputs and add an event listener to the change event
        JMB.createMIDIDeviceSelector(selectOutput,MIDIAccess.enumerateOutputs(),"ouput",function(deviceId){

            //if an output has been chosen earlier, close it
            if(output){
                output.close();
            }

            output = MIDIAccess.getOutput(deviceId);

            if(output){
                logMessage("connected to " + output.deviceName,true);
            }else{
                logMessage("Please select a MIDI output",true);
            }
        });

        btnStart.addEventListener("click",function(){   
            if(!output){
                logMessage("Please select a MIDI output first!",true);
                return;
            }
            currentNote = 0;
            sequencePosition = 0;
            sendRandomMIDIMessage(MIDIAccess);
        },false);

        btnStop.addEventListener("click",function(){    
            currentNote = sequenceLength;
        },false);
        
    });
});