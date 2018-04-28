const w : number = window.innerWidth
const h : number = window.innerHeight
const NODES : number = 10
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

class State {
    scales : Array<number> = [0, 0]
    prevScale : number = 0
    dir : number = 0
    j : number = 0

    update(stopcb : Function) {
        this.scales[this.j] += this.dir * 0.1
        if (Math.abs(this.scales[this.j] - this.prevScale) > 1) {
            this.scales[this.j] = this.prevScale + this.dir
            this.j += this.dir
            if (this.j == this.scales.length || this.j == -1) {
                this.j -= this.dir
                this.dir = 0
                this.prevScale = this.scales[this.j]
                stopcb()
            }
        }
    }

    startUpdating(startcb : Function) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
            startcb()
        }
    }
}

class LLNode {
    prev : LLNode
    next : LLNode
    state : State = new State()
    i : number = 0

    constructor(i : number) {
        if (i) {
            this.i = i
        }
    }

    addNeighbor() {
        if (this.i < NODES - 1) {
            const NODE : LLNode = new LLNode(this.i+1)
            NODE.prev = this
            this.next = NODE
            NODE.addNeighbor()
        }
    }

    draw(context : CanvasRenderingContext2D) {
        const size = w/NODES
        context.strokeStyle = '#212121'
        context.lineWidth = Math.min(w, h) / 50
        context.lineCap = 'round'
        context.beginPath()
        context.moveTo(this.i * size + size * this.state.scales[1], h/2)
        context.lineTo(this.i * size + size * this.state.scales[0], h/2)
        context.stroke()
    }

    update(stopcb : Function) {
        this.state.update(stopcb)
    }

    startUpdating(startcb : Function) {
        this.state.startUpdating(startcb)
    }

    getNext(dir : number, cb : Function) : LLNode{
        var curr : LLNode = this.prev
        if (dir == 1) {
            curr = this.next
        }
        if (curr) {
            return curr
        }
        cb()
        return this
    }

}

const initLinkedLineStage = () => {
    const linkedLineStage : LinkedLineStage = new LinkedLineStage()
    linkedLineStage.render()
    linkedLineStage.handleTap()
}
