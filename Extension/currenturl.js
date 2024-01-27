// function handleDOMContentLoaded() {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         var currentUrl = tabs[0].url;

//         var input = document.getElementById('UserInput');
//         input.value = currentUrl;
//     });
// }



var CurrentButton = document.getElementById('currentUrl')
CurrentButton.addEventListener('click', ()=>{
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentUrl = tabs[0].url;

        var input = document.getElementById('UserInput');
        input.value = currentUrl;

        var enterKeyEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            bubbles: true,
            cancelable: true,
            keyCode: 13,
        });
        input.dispatchEvent(enterKeyEvent);
    });
})