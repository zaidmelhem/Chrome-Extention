const text = document.getElementById('input')
const saveBtn = document.getElementById("save-btn")

const ul = document.getElementById('ul')
const deleteBtn = document.getElementById('delete-btn')
const saveTap = document.getElementById('save-tap')
const leadsLocalStorage = JSON.parse( localStorage.getItem("links") )

let links = []

if (leadsLocalStorage) {
    links = leadsLocalStorage
    rengerLinks(links)
}

saveBtn.addEventListener("click",function(){
    links.push(text.value)
    text.value = ""
    localStorage.setItem("links", JSON.stringify(links) )
    rengerLinks(links)
})

deleteBtn.addEventListener('dblclick',function(){
    links = []
    localStorage.clear()
    rengerLinks(links)
})

saveTap.addEventListener('click',function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        links.push(tabs[0].url )
        localStorage.setItem("links",JSON.stringify(links))
        rengerLinks(links)
   
     });
})

function rengerLinks (links){
    let items = ""
    for (let i = 0; i < links.length; i++) {
        items += `<li><a target='_blank' href='${links[i]}'>  ${links[i]}</a></li>`
    }
    ul.innerHTML = items
}




