/*!
 *  copyright 2012 abudaan http://abumarkub.net
 *  code licensed under MIT 
 *  http://abumarkub.net/midibridge/license
 * 
 *  MIDIBridge plugin that creates a dropdown menu
 *  
 *  dependencies:
 *  - JazzMIDIBridge.js
 *
 */

(function(mb){

    "use strict";

    mb.createSelector = function(select,options,callback,keyId,keyDescription){
        //called when a device is selected in a drowdown menu
        var getSelectedOption = function(){
            return select.options[select.selectedIndex];
        };

        //the keys can be passed as argument, if not use default values
        keyId = keyId || "id";
        keyDescription = keyDescription || "description";
          
        //for IE8
        mb.wrapElement(select);

        //loop over all options and add them to the dropdown menu
        (function(){
            var option,
                i = 0, 
                maxi = options.length,
                div;
            while(i < maxi) {
                option = options[i];
                div = document.createElement("option");
                div.setAttribute("id", option[keyId]);
                div.innerHTML = option[keyDescription];
                select.appendChild(div);
                i = i + 1;
            }            
        }());
              
        select.addEventListener("change", function(e) {
            callback(getSelectedOption());
        }, false);
        
        return {
            getSelectedOption:getSelectedOption
        };
    };
    
}(JMB));