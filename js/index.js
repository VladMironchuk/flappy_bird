document.querySelector('button').onclick = (event) => {
    event.preventDefault()
    const hello = document.querySelector('.hello')
    const score = document.querySelector('.main__h1_score')
    if(document.querySelector('input[type=text]').value){
        document.querySelector('form').hidden = true
        document.querySelector('.main__h1').hidden = false
        document.querySelector('h2').hidden = false
        document.querySelector('.difficulty').hidden = false
        hello.innerText = 'Hello ' + document.querySelector('input[type=text]').value
        hello.hidden = false
        if(localStorage.getItem('maxScore')){
            score.innerText = 'High score: ' + localStorage.getItem('maxScore')
            score.hidden = false
            document.querySelector('.reset').hidden = false
        }
    } 
}

document.querySelector('.main__h1').onclick = () => {
    const radio = Array.from(document.querySelectorAll('input[type=radio]')).filter(i => i.checked === true)
    localStorage.setItem('dif', radio[0].value)
    document.location.href = "game.html"
}

document.querySelector('.reset').onclick = () => {
    if(confirm('reset your max score')){
        localStorage.setItem('maxScore', 0)
        score.innerHTML = 'High score: ' + 0
    }
}