const content = document.getElementById('content')
const date = document.getElementById('date')
const time = document.getElementById('time')
const addedbtn =document.getElementById('addedbtn')
const deletedbtn  = document.getElementById('deletedbtn')
const list  = document.getElementById('list')

const listcontent = []

addedbtn.addEventListener('click', function () {

    listcontent.push({
        content: content.value,
        date: date.value,
        time: time.value
    })
    
    let htmlStr = ''

    listcontent.forEach(function (item) {
        htmlStr = htmlStr + `
        <div class="item">
         <div>
            <p>內容: ${item.content}</p>
            <p>時間: ${item.date} ${item.time} </p>
         </div>
        </div>
        `
    })

    list.innerHTML = htmlStr
})

deletedbtn.addEventListener('click', function () {
    listcontent.pop()


    let htmlStr = ''

    listcontent.forEach(function (item) {
        htmlStr = htmlStr + `
        <div class="item">
         <div>
            <p>內容: ${item.content}</p>
            <p>時間: ${item.date} ${item.time} </p>
         </div>
        </div>
        `
    })
    list.innerHTML = htmlStr
})