let agent = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)

const setRem = () => {
    console.log(agent)
    let scale = ''
    let baseSize = 0
    if(!agent) {
        scale = document.documentElement.clientWidth / 1920
        baseSize = 16
    } else {
        scale = document.documentElement.clientWidth / 740
        baseSize = 37.5
    }
    console.log(scale)
    console.log(baseSize)
    document.documentElement.style.fontSize = `${baseSize * scale}px`
}
setRem()
window.onresize = () => {
    setRem()
}
