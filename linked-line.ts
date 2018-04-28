const w : number = window.innerWidth
const h : number = window.innerHeight
class LinkedLineStage {
    private canvas : HTMLCanvasElement = document.createElement('canvas')
    private context : CanvasRenderingContext2D
    constructor() {
        this.initCanvas()
    }

    initCanvas() {
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = '#212121'
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }
}

class Animator {

    private animated : boolean = false
    private interval : number

    start(updatecb : Function) {
        if (!this.animated) {
            this.animated = true
            this.interval = setInterval(() => {
                updatecb()
            }, 50)
        }
    }

    stop() {
        if (this.animated) {
            this.animated = false
            clearInterval(this.interval)
        }
    }
}

const initLinkedLineStage = () => {
    const linkedLineStage : LinkedLineStage = new LinkedLineStage()
    linkedLineStage.render()
    linkedLineStage.handleTap()
}
