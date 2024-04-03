chrome.browserAction.onClicked.addListener(function(tab) {

  chrome.tabs.getSelected(null, function(tab){
    chrome.tabs.executeScript(tab.id, {code: "fetch('https://docs.google.com/feeds/download/documents/export/Export?id='+document.location.href.replace('https://docs.google.com/document/d/', '').replace('/edit', '')+'&exportFormat=docx').then(res => res.blob()).then(blob => {var kbit = (Math.round(((blob.size/1000) + Number.EPSILON) * 100) / 100)+' kbit';var kb = (Math.round(((blob.size/8000) + Number.EPSILON) * 100) / 100)+' kb'; if(document.getElementById('sizeTextCustom')) {document.getElementsByTagName('body')[0].removeChild(document.getElementById('sizeTextCustom'));} var elem = document.createElement('SPAN'); elem.innerText = 'File size:   '+kbit + ' / ' +kb; elem.id = 'sizeTextCustom'; document.getElementsByTagName('body')[0].prepend(elem); });"}, function(response) {
        console.log("ran");
    });
});

  chrome.tabs.executeScript(null, {file: "testScript.js"});
});