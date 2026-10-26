let rate = document.getElementsByClassName("rate");
let trash = document.getElementsByClassName("trash");
let driver1TeamSelect = document.querySelector(".driver1Team");
let driver2TeamSelect = document.querySelector(".driver2Team");

let drivers 
  fetch('drivers.json')
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        drivers = data
        console.log(data)
      })

  
driver1TeamSelect.addEventListener('change', ()=>{
  //this will get us the correct team out of the drivers json
   const team = drivers.find((team)=> team.team == driver1TeamSelect.value)
   console.log(team)

   document.querySelector('#driver1OptionA').innerText = team.drivers[0]
   document.querySelector('[name="driver1Option"]').value = team.drivers[0]
   console.log("updated value",document.querySelector('[name="driver1Option"]').value)
})      

Array.from(rate).forEach(function (element) {
  element.addEventListener('change', function () {
    const id = this.parentNode.parentNode.childNodes[1].dataset.userId
    const thumbUp = this.parentNode.parentNode.childNodes[5]
    console.log(element.value)
    fetch('thumbUp', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        //in js if the key and the value are the same you do not 
        //need to define them using the 'key':value, syntax
        id,
        rating: element.value
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});

// Array.from(thumbDown).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const id = this.parentNode.parentNode.childNodes[1].dataset.userId
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[6].innerText)
//         fetch('thumbDown', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             id, thumbUp, thumbDown
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });
//stretch goal - don't refresh the page when you delete something
Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const bookId = element.dataset.bookId
    console.log(bookId)
    fetch('/myBooks', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bookId
      })
    }).then(function (response) {
      //use DOM .removeChild() instead of a window reload
      window.location.reload()
    })
  });
});
