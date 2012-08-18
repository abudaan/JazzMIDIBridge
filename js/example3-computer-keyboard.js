/*!
 * copyright 2012 abudaan
 * code licensed under MIT 
 * http://abumarkub.net/midibridge/license
 * 
 * 
 * example of how you use your regular computer keyboard to play a MIDI instrument
 * 
 *  dependecies:
 *  - JazzMIDIBridge.js
 *  - MIDIDeviceSelector.js
 */

window.addEventListener('load', function() {

    "use strict";

    if(window.addEventListener === undefined){
        document.body.innerHTML = "This example has no support for Internet Explorer 8";
        return;
    }

    var output,
        msgSelectOutput = "<br/><br/><div>Please select a MIDI output...</div>",
        msgKeyMapping = "<br/><br/>Now play some keys on your computer keyboard, keymapping is as follows:<br/><br/><span class='keys'>A,S,D,F,G,H,J,K,L</span> are white keys<br/><span class='keys'>W,E,T,Y,U,O,P</span> are black keys<br/><span class='keys'>spacebar</span> is sustain pedal",
        keysPressed = {},
        selectOutput = document.getElementById("outputs"),
        messageDiv = document.getElementById("help-message");
    
        
    function connectKeyboard(MIDIAccess){

        var noteNumbers = {
            //white keys
            65 : 48, //key a -> note c
            83 : 50, //key s -> note d
            68 : 52, //key d -> note e
            70 : 53, //key f -> note f
            71 : 55, //key g -> note g
            72 : 57, //key h -> note a
            74 : 59, //key j -> note b
            75 : 60, //key k -> note c
            76 : 62, //key l -> note d
            186 : 64, //key ; -> note e
            222 : 65, //key : -> note f
            //black keys
            87 : 49, //key w -> note c#/d♭
            69 : 51, //key e -> note d#/e♭
            84 : 54, //key t -> note f#/g♭
            89 : 56, //key y -> note g#/a♭
            85 : 58, //key u -> note a#/b♭
            79 : 61, //key o -> note c#/d♭
            80 : 63  //key p -> note d#/e♭
        };
        
        document.addEventListener("keydown", function(e) {
            //console.log(e, e.which, noteNumbers[e.which]);
            if(!output){
                return;
            }
            if(e.which === 32) {
                //spacebar acts as sustain pedal
                output.sendMIDIMessage(MIDIAccess.createMIDIMessage(JMB.CONTROL_CHANGE, 64, 127));
            } else if(noteNumbers[e.which] && !keysPressed[e.which]) {
                output.sendMIDIMessage(MIDIAccess.createMIDIMessage(JMB.NOTE_ON, noteNumbers[e.which], 100));
                keysPressed[e.which] = true;
            }
        }, false);
    
    
        document.addEventListener("keyup", function(e) {
            if(!output){
                return;
            }
            if(e.which === 32) {
                output.sendMIDIMessage(MIDIAccess.createMIDIMessage(JMB.CONTROL_CHANGE, 64, 0));
            } else if(noteNumbers[e.which]) {
                output.sendMIDIMessage(MIDIAccess.createMIDIMessage(JMB.NOTE_OFF, noteNumbers[e.which], 0));
                keysPressed[e.which] = false;
            }
        }, false);
        
        messageDiv.innerHTML = msgSelectOutput;
    }

    JMB.init(function(MIDIAccess){
    
        //create dropdown menu for MIDI outputs
        JMB.createMIDIDeviceSelector(selectOutput,MIDIAccess.enumerateOutputs(),"ouput",function(deviceId){
            
            if(output){
                output.close();
            }
            output = MIDIAccess.getOutput(deviceId);
            
            if(deviceId === "-1"){
                messageDiv.innerHTML = msgSelectOutput;
            }else{
                messageDiv.innerHTML = msgKeyMapping;
            }
        });
        
        connectKeyboard(MIDIAccess);
    });


}, false);
