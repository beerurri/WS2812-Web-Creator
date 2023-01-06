var canvas = document.getElementById('mainCanvas')

function getCursorOnclickPosition(canvas, event){
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log(`x: ${x}, y: ${y}`)
}

canvas.addEventListener('mousedown', function(e){
    getCursorOnclickPosition(canvas, e)
})

var ctx = canvas.getContext('2d')