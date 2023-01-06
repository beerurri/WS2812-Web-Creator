var activeBgColor = 'rgb(255, 94, 94)'
var inactiveBgColor = 'rgb(255, 167, 167)'

var tools = {
    'pen': {
        'active': true,
        'elem': document.getElementById('pen-button')
    },
    'erase': {
        'active': false,
        'elem': document.getElementById('erase-button')
    },
    'drag': {
        'active': false,
        'elem': document.getElementById('drag-button')
    }
}

function handleButton(elem) {
    for (var e in tools) {
        tools[e].active = false
        tools[e].elem.style.backgroundColor = inactiveBgColor
    }

    tools[elem].elem.style.backgroundColor = activeBgColor
    tools[elem].active = true
}

handleButton('pen')

document.getElementById('pen-button').addEventListener('click', function(){
    handleButton('pen')
})

document.getElementById('erase-button').addEventListener('click', function(){
    handleButton('erase')
})

document.getElementById('drag-button').addEventListener('click', function(){
    handleButton('drag')
})