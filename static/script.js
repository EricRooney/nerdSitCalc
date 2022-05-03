window.addEventListener('load', () => {

    class Nerd {
        #name
        #gamesPlayed = 0

        #justSat = false

        #wantsToSit = false

        constructor(name) {
            this.#name = name
        }

        get name() {
            return this.#name
        }

        addPlayed() {
            this.#gamesPlayed = Number(this.#gamesPlayed + 1)
        }

        get gamesPlayed() {
            return Number(this.#gamesPlayed)
        }

        toggleJustSat() {
            this.#justSat = !this.#justSat
        }

        get justSat() {
            return this.#justSat
        }


        toggleWantsToSit() {
            this.#wantsToSit = !this.#wantsToSit
        }

        get wantsToSit() {
            return this.#wantsToSit
        }


    }


    const nameList = [
        "David",
        "Taylor",
        "Eric",
        "Sean",
        "Ayrton",
        "Jon",
        "Eli",
        "DavidB",
    ]

    const nerds = nameList.map( name => { return new Nerd(name) })

    const nerdContainer = document.querySelector('.active-container')

    const activeNerdContainer = []


    function randomSort() {
        nerds.sort((a,b) => {

            const random = Math.random()

            if(random > 0.5) {
                return 1
            } else {
                return -1
            }

        })
    }

    randomSort()

    function sortNerdsByPlayCount() {

        nerds.sort((a,b) => {
            if(a.gamesPlayed > b.gamesPlayed) {
                return 1
            } else {
                return -1
            }
        })


    }

    function activateNerds() {

        sortNerdsByPlayCount()

        nerdContainer.innerHTML = ''

        let numSelectedNerds = 1

        console.log("1")

        for (let i = 0; i < nerds.length - 1; i++) {
            if(activeNerdContainer.length === 5) break
            if(!nerds[i].justSat && nerds[i].wantsToSit ) continue
            numSelectedNerds += 1
            activeNerdContainer.push(nerds[i])
        }
        console.log("2")

        nerds.forEach(nerd => {
            if(nerd.justSat) nerd.toggleJustSat()
        })

        console.log("3")
        console.log(activeNerdContainer)
        if(activeNerdContainer < 6){
            console.log("3.5")
            for (let i = 0; i < nerds.length - 1; i++) {
                if(activeNerdContainer.length === 5) break
                if(nerds[i].justSat) continue
                if(nerds[i].wantsToSit ) continue
                numSelectedNerds += 1
                activeNerdContainer.push(nerds[i])
            }
        }
        console.log("4")
        if(activeNerdContainer < 6){
            console.log("4.5")
            for (let i = 0; i < nerds.length - 1; i++) {
                if(activeNerdContainer.length === 5) break
                if(!activeNerdContainer.includes(nerds[i])){
                    activeNerdContainer.push(nerds[i])
                }
                numSelectedNerds += 1
                activeNerdContainer.push(nerds[i])
            }
        }
        console.log("5")

        nerds.forEach(nerd => {
            if(!activeNerdContainer.includes(nerd)) {
                nerd.toggleJustSat()
            }
            if(nerd.wantsToSit) nerd.toggleWantsToSit()
        })

        console.log("6")
        activeNerdContainer.forEach( nerd => {
            const slot = document.createElement('div')

            slot.classList.add('active-slot')

            slot.innerText = nerd.name

            nerdContainer.appendChild(slot)
        })

    }

    activateNerds()


    const nerdNameContainer = document.querySelector('.nerd-name-container')


    function drawStats() {
        nerdNameContainer.innerHTML = ''
        nerds.forEach(nerd => {
            const nameElement = document.createElement('div')
            nameElement.classList.add('nerd-name')
            nameElement.innerText = `${nerd.name}: ${nerd.gamesPlayed}`

            nerdNameContainer.appendChild(nameElement)

        })

    }

    drawStats()




    document.querySelector('.next-button').addEventListener('click', () => {
        let n = ""

        activeNerdContainer.forEach(nerd => {
            n += nerd.name
            n += ' '
        })
        console.log(n)

        activeNerdContainer.forEach(nerd => {
            nerd.addPlayed()
            console.log(`${nerd.name} has played ${nerd.gamesPlayed}`)
        })

        activeNerdContainer.length = 0

        activateNerds()
        drawStats()
    })
























})
