


function getChips(amount, chips, chipDenomonations, counter) {
    console.log("counter: " + counter)
    if (counter < 0) {
        return chips
    }

    let numberOfThis = amount / (chipDenomonations[counter])
    console.log("amount: " + amount)
    console.log("Number of " + (chipDenomonations[counter]) + ":"  + numberOfThis)
    if (numberOfThis > 0) {
        amount = amount % (chipDenomonations[counter])
        console.log("amount: " + amount)
        let y = { chip: chipDenomonations[counter], count: parseInt(numberOfThis) }
        console.log("chips: ")
        console.log(y)
        chips.push(y)


    }
    counter--
    return getChips(amount, chips, chipDenomonations, counter)

}

getChipsFor(amount){
    let chipDenomonations = [5, 10, 25, 50, 100, 500, 1000, 5000, 10000]
    let chips = []
    let counter = chipDenomonations.length - 1
    getChips(amount, chips, chipDenomonations, counter)
    return chips
}