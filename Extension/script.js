addEventListener('keydown', async (event) => {
    if (event.key === 'Enter'){
        var input = document.getElementById('UserInput').value;
        if (input != ''){
            var response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${input}`);
            var image = document.getElementById('QR');
            image.classList.remove('image-blur')
            if(response.ok) {
                const blob = await response.blob();
                const imageURL = URL.createObjectURL(blob);
                document.getElementById('QR').src = imageURL;
                document.getElementsByClassName('err')[0].style.opacity = '0%';
            }
    
        } else {
            var image = document.getElementById('QR');
            image.classList.add('image-blur');
            document.getElementsByClassName('err')[0].style.opacity = '100%';

        }
    }
})

 document.getElementById('close-button').addEventListener('click',() => {
     window.close();
 })

// working:
// document.addEventListener('DOMContentLoaded', function () {
//     console.log('Popup DOMContentLoaded');
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       var currentUrl = tabs[0].url;
//       document.getElementById('current-url').innerHTML = currentUrl;
//     });
//   });

// function currentURL() {
//     document.addEventListener('DOMContentLoaded', function () {
//         console.log('Popup DOMContentLoaded');
//         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//           var currentUrl = tabs[0].url;

//           var input = document.getElementById('UserInput')
//           input.value = currentURL;
//           //document.getElementById('currentUrl').innerHTML = currentUrl;
//         });
//       });
    
// }