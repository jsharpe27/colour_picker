const colorChoice = document.getElementById('color-choice')
const schemeList = document.getElementById('schemes')

const getColourSchemeBtn = document.getElementById('get-scheme')
const renderColoursEl = document.getElementById('show-colours')
const renderHexCodesEl = document.getElementById('hex-codes')
let colourArray = ''

//reset render divs
function resetColours(){
    renderColoursEl.innerHTML = ''
    renderHexCodesEl.innerHTML = ''
}

function copyHex(hex){
    navigator.clipboard.writeText(hex)
        .then(
            (success) => alert("Copied the text"),
            (err) => console.log("error")
        )
}


//loop through colourArray and render hex values
function renderColours(){
    let html = ''
    let hexHtml=''
    
        colourArray.forEach(function(item){
            let itemHex = item.hex
            html = `
            <div class="colour" style="background-color: ${itemHex.value};"></div>
            `
            hexHtml = `<h3 id="hex">${itemHex.value}</h3>`
        renderColoursEl.innerHTML += html
        renderHexCodesEl.innerHTML += hexHtml
    })
    
    
}

//get color choice and scheme through API with user picked values in the fetch statement
function fetchColourChoices(){
    let selectedSchemeChoice = schemeList.value
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorChoice.value.substring(1)}&mode=${selectedSchemeChoice}`)
        .then(response => response.json())
        .then(data => {
            colourArray = data.colors         
            renderColours()
        }) 
}


//Event listener for get colour scheme
getColourSchemeBtn.addEventListener('click',function(){    
                fetchColourChoices()
                renderColoursEl ? resetColours() : ''            
})

//event listener for hex codes to call copyHex function

document.addEventListener('click',function(e){
    if (e.target.id === "hex"){
        const clipHex = e.target.textContent
        copyHex(clipHex) 
    }          
})
