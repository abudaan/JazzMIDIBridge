/*!
 *  copyright 2012 abudaan http://abumarkub.net
 *  code licensed under MIT 
 *  http://abumarkub.net/midibridge/license
 *
 *  
 *  MIDIBridge plugin
 * 
 *  dependencies:
 *  - MIDIBridge.js
 *
 */
(function(mb){
    
    mb.createMIDIMessagesConsole = function(element){
        
        element.className = "midievent-console";
        
        function print(midiMessage){
            var tmp = midiMessage.toString().split(" | "),
            html = "<div class='midimessage'>",
            tmp2,
            className;
            for(var i = 0, maxi = tmp.length; i < maxi; i++){
                className = i === 1 ? "midimessage-segment-small" : "midimessage-segment";
                tmp2 = tmp[i].split(":");
                if(tmp2.length === 2){
                    html += "<div class='" + className + "'>" + tmp2[0] + ": <span class='midimessage-bold'>" + tmp2[1] + "</span></div>";
                }else{
                    html += "<div class='" + className + "'>CMD: <span class='midimessage-bold'>" + tmp[i] + "</span></div>";
                }
            }
            html += "</div>";
            
            element.innerHTML += html
        }
        
        return {
            print:print
        }
        
    }
 
 
})(midiBridge);
