window.storeOptions = [];

chrome.tabs.getSelected(null, function(tab){
  chrome.tabs.executeScript(tab.id,{
    code: `(function(){    
      var selects = document.getElementsByTagName('select');
      var possibleOptions = [];
  
      for(var i = 0; i < selects.length; i++){
        var indOptions = selects[i].options;
        for(var a = 0; a < indOptions.length; a++){
          var option = indOptions[a].text;
          if(possibleOptions.indexOf(option) < 0){
            possibleOptions.push(option);
          }
        }
      }
      
      return possibleOptions;
    })()`
  }, receivePossibleOptions);
});



//tabs.executeScript() returns the results of the executed script
//  in an array of results, one entry per frame in which the script
//  was injected.
var receivePossibleOptions = (possibleOptions) => {
  window.storeOptions = possibleOptions[0];

  //adding all possible into select elem
  var selectFocus = document.getElementById("selectFrom");

  for(var i = 0; i < window.storeOptions.length; i++){
    var option = document.createElement("option");
    option.text = window.storeOptions[i];
    option.value = i;
    selectFocus.add(option);
  }
}


function successResponse(response){
  if(response[0]){
    document.getElementById("response").innerText = "success!!";
    
    setTimeout(() => {
      document.getElementById("response").innerText = "";
    }, 1000);
  }else{
    document.getElementById("response").innerText = "error!! (why is this green?, shut up, thx :) )";
    
    setTimeout(() => {
      document.getElementById("response").innerText = "";
    }, 1000);
  }
}


window.onload = function() {
  document.getElementById("actionBtn").addEventListener("click", function() {
    console.error("ahh");
    var selectFocus = document.getElementById("selectFrom");
    var select = window.storeOptions[selectFocus.value];

    if(selectFocus.value == "default3421"){
      return;
    }
    chrome.tabs.getSelected(null, function(tab){
      chrome.tabs.executeScript(tab.id,{
        code: "(function(){var selectTo = \""+ select + "\";" + `
        
              console.log("select all that are available:  "+selectTo);

              var selects = document.getElementsByTagName("select");

              for(var i = 0; i < selects.length; i++){
                var indOptions = selects[i].options;
                for(var a = 0; a < indOptions.length; a++){
                  if(indOptions[a].text == selectTo){
                    selects[i].value = indOptions[a].value;
                    if(selects[i].onselect){
                      selects[i].onselect();
                    }
                    var event; // The custom event that will be created
                    var event1; // The custom event that will be created
                    if(document.createEvent){
                        event = document.createEvent("HTMLEvents");
                        event.initEvent("select", true, true);
                        event.eventName = "select";
                        event1 = document.createEvent("HTMLEvents");
                        event1.initEvent("change", true, true);
                        event1.eventName = "change";
                        selects[i].dispatchEvent(event);
                        selects[i].dispatchEvent(event1);
                    } else {
                        event = document.createEventObject();
                        event.eventName = "select";
                        event.eventType = "select";
                        selects[i].fireEvent("on" + event.eventType, event);
                        event1 = document.createEventObject();
                        event1.eventName = "change";
                        event1.eventType = "change";
                        selects[i].fireEvent("on" + event1.eventType, event1);
                    }
                  }
                }
              }

              return true;
            })()`
      }, successResponse);
    }); 
  });

  document.getElementById("selectFrom").addEventListener("change", function(){
    
    var selectFocus = document.getElementById("selectFrom");
    var select = window.storeOptions[selectFocus.value];

    
    if(selectFocus.value == "default3421"){
      return;
    }
    chrome.tabs.getSelected(null, function(tab){
      chrome.tabs.executeScript(tab.id,{
        code: "(function(){var selectTo = \""+ select + "\";" + `
        
              console.log("select all that are available:  "+selectTo);

              var selects = document.getElementsByTagName("select");

              for(var i = 0; i < selects.length; i++){
                var indOptions = selects[i].options;
                for(var a = 0; a < indOptions.length; a++){
                  if(indOptions[a].text == selectTo){
                    selects[i].value = indOptions[a].value;
                    if(selects[i].onselect){
                      selects[i].onselect();
                    }
                    var event; // The custom event that will be created
                    var event1; // The custom event that will be created
                    if(document.createEvent){
                        event = document.createEvent("HTMLEvents");
                        event.initEvent("select", true, true);
                        event.eventName = "select";
                        event1 = document.createEvent("HTMLEvents");
                        event1.initEvent("change", true, true);
                        event1.eventName = "change";
                        selects[i].dispatchEvent(event);
                        selects[i].dispatchEvent(event1);
                    } else {
                        event = document.createEventObject();
                        event.eventName = "select";
                        event.eventType = "select";
                        selects[i].fireEvent("on" + event.eventType, event);
                        event1 = document.createEventObject();
                        event1.eventName = "change";
                        event1.eventType = "change";
                        selects[i].fireEvent("on" + event.eventType, event1);
                    }
                  }
                }
              }

              return true;
            })()`
      }, successResponse);
    }); 
  });

}