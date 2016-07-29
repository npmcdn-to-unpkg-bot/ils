"use strict"
const J = require("./common")
const R = require("ramda")
let arr = [
{"dePart":"Wir bitten Sie, donen können nicht ber..","enPart":""},
{"dePart":"Es ist nicht gut, die Pferde zu wechseln, während man den Fluss überquert","enPart":""},
{"dePart":"Wir haben jahrelang einen Briefwechsel aufrechterhalten","enPart":""},
{"dePart":"Am Freitag ist der Himmel wechselnd bewölkt","enPart":""},
{"dePart":"jemandem zu wenig Wechselgeld herausgeben","enPart":""},
{"dePart":"Bitte lassen Sie den Wechsel diskontieren","enPart":""},
{"dePart":"falls der Wechsel nicht eingelöst wird","enPart":""},
{"dePart":"Die Leute wollen den Tapetenwechsel","enPart":""},
{"dePart":"sich einen Wechsel auszahlen lassen","enPart":""},
{"dePart":"Die Maschine läuft mit Wechselstrom","enPart":""},
{"dePart":"Er wird abwechselnd rot und blass","enPart":""},
{"dePart":"der Wechsel zum Diskont annehmen","enPart":""},
{"dePart":"schnell den Besitzer wechseln","enPart":""}]
let sortDeFn = R.sortBy(R.compose(val=>{
    if (val === undefined) {
        console.log(11)
        return 0
    } else {return -val.length}
}, R.prop("dePart")))
console.log(sortDeFn(arr))