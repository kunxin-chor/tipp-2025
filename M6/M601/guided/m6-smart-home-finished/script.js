let currentRoomDisplay = document.querySelector('#current-room');
let bedroom = document.querySelector('#bedroom');

bedroom.addEventListener("click", function () {
    currentRoomDisplay.innerHTML = "Bedroom";
});

bedroom.addEventListener("mouseenter", function (event) {
    currentRoomDisplay.innerHTML = "Bedroom";
    event.target.style.backgroundColor = "lightblue";

});

bedroom.addEventListener("mouseout", function (event) {
    currentRoomDisplay.innerHTML = " ";
    event.target.style.backgroundColor = "white";
});

let allDevices = document.querySelectorAll('.device');
let hideAllDeviceButtons = document.querySelector('#hide-all-devices');

hideAllDeviceButtons.addEventListener("click", function () {
   for (let d of allDevices) {
       d.style.display = "none";
   }
});

// when device icon is clicked, toggle the on and off state
for (let d of allDevices) {
    d.addEventListener("click", function () {
       if (d.classList.contains('on')) {
           d.classList.remove('on');
           d.classList.add('off');
       } else {
              d.classList.remove('off');
              d.classList.add('on');
       }
    });
};