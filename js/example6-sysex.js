/*!
 *  copyright 2013 abudaan http://abumarkub.net
 *  code licensed under MIT 
 *  http://abumarkub.net/midibridge/license
 * 
 * 
 *  example of how you to use the new MididOutRaw and MidiOutLong functions of Jazz
 * 
 *  dependecies:
 *  - JazzMIDIBridge.js
 *  - MIDIDeviceSelector.js
 * 
 */

window.addEventListener('load', function() {
	
	"use strict";

	var 
		Jazz,
		success,
		timeout,
		output,
		selectOutput = document.getElementById("outputs"),
		messages = document.getElementById("messages"),
		btnTestSysex = document.getElementById("sysex"),
		btnTestChord = document.getElementById("chord");

	
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

		

	JMB.init(function(MIDIAccess){
		//the newly added getJazz() method returns the Jazz instance of JMB
		Jazz = JMB.getJazz();

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

		
		btnTestChord.addEventListener("click",function(){   
			if(!output){
				logMessage("Please select a MIDI output first!",true);
				return;
			}
			logMessage("connected to " + output.deviceName,true); 
			
			//play a chord:
			success = Jazz.MidiOutLong([0x90,60,120,64,120,67,120]); 
			logMessage("chord played:" + success);

		},false);

		
		btnTestSysex.addEventListener("click",function(){   
			if(!output){
				logMessage("Please select a MIDI output first!",true);
				return;
			}
			logMessage("connected to " + output.deviceName,true); 
			logMessage("volume:" + 0x7F);

			//play a note:
			Jazz.MidiOut(0x90,60,120);
			
			//change the main volume (controller number 7) of the MIDI output with sysex
			//you can use both use Jazz.MidiOutRaw() and Jazz.MidiOutLong() for this
			//0x33 is the lowered volume, full volume is 0x7F, see http://www.midi.org/techspecs/ca24.pdf
			success = Jazz.MidiOutRaw([0xF0,0x7F,0x7F,0x04,0x01,0x7F,0x33,0xF7]);
			
			//and play the same note again with lower main volume
			clearInterval(timeout);
			timeout = setTimeout(function(){
				logMessage("volume changed to:" + 0x33);
				Jazz.MidiOut(0x90,60,120);
				
				//set volume back to 127
				success = Jazz.MidiOutRaw([0xF0,0x7F,0x7F,0x04,0x01,0x7F,0x7F,0xF7]);	
			},1000);

			
		},false);
	});
});