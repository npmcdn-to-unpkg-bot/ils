"use strict"
const J = require("./common")
const R = require("ramda")
const RFantasy = require("ramda-fantasy")
const fs = require("fs-extra")
const Either = RFantasy.Either
const Future = RFantasy.Future
const Identity = RFantasy.Identity
const Maybe = RFantasy.Maybe
const Just = RFantasy.Just
const dbPathRaw = "/home/just/ils/hapi/public/_dbRaw.json"
let arr = [
    {
        "1405": {
            "dePart": "Männlichkeit zieht die Weiber an!",
            "enPart": "",
            "category": "preDraft",
            "id": 1405
        }
    },
    {
        "1406": {
            "dePart": "Wann, wenn nicht jetzt? Wo, wenn nicht hier? Wer, wenn nicht wir?",
            "enPart": "",
            "category": "preDraft",
            "id": 1406
        }
    },
    {
        "1407": {
            "dePart": "Ein Wehrpflichtiger leistet mehr für den Frieden als die Friedensbewegung.",
            "enPart": "",
            "category": "preDraft",
            "id": 1407
        }
    },
    {
        "1408": {
            "dePart": "Durch ein Unterlassen kann man genauso schuldig werden wie durch Handeln.",
            "enPart": "",
            "category": "preDraft",
            "id": 1408
        }
    },
    {
        "1409": {
            "dePart": "Liebe und Treue sind unzertrennlich.",
            "enPart": "",
            "category": "preDraft",
            "id": 1409
        }
    },
    {
        "1410": {
            "dePart": "Jede Partei ist für das Volk da und nicht für sich selbst.",
            "enPart": "",
            "category": "preDraft",
            "id": 1410
        }
    },
    {
        "1411": {
            "dePart": "Wer die Wahrheit nicht fürchtet, braucht auch die Lüge nicht zu fürchten.",
            "enPart": "",
            "category": "preDraft",
            "id": 1411
        }
    },
    {
        "1412": {
            "dePart": "Bitte nicht um eine leichte Bürde - bitte um einen starken Rücken.",
            "enPart": "",
            "category": "preDraft",
            "id": 1412
        }
    },
    {
        "1413": {
            "dePart": "Nichts ist mühsam, was man willig tut.",
            "enPart": "",
            "category": "preDraft",
            "id": 1413
        }
    },
    {
        "1414": {
            "dePart": "Nehmen Sie die Menschen, wie sie sind, andere gibt's nicht.",
            "enPart": "",
            "category": "preDraft",
            "id": 1414
        }
    },
    {
        "1415": {
            "dePart": "Was interessiert mich mein Geschwätz von gestern.",
            "enPart": "",
            "category": "preDraft",
            "id": 1415
        }
    },
    {
        "1416": {
            "dePart": "Machen Sie sich erst einmal unbeliebt, dann werden Sie auch ernstgenommen.",
            "enPart": "",
            "category": "preDraft",
            "id": 1416
        }
    },
    {
        "1417": {
            "dePart": "In der Krise beweist sich der Charakter.",
            "enPart": "",
            "category": "preDraft",
            "id": 1417
        }
    },
    {
        "1418": {
            "dePart": "Die Kunst ist, einmal mehr aufzustehen, als man umgeworfen wird.",
            "enPart": "",
            "category": "preDraft",
            "id": 1418
        }
    },
    {
        "1419": {
            "dePart": "Das Einzige, was wir zu fürchten haben, ist die Furcht selbst.",
            "enPart": "",
            "category": "preDraft",
            "id": 1419
        }
    },
    {
        "1420": {
            "dePart": "Geld und Waffen sind kein Ersatz für Gehirn und Willensstärke.",
            "enPart": "",
            "category": "preDraft",
            "id": 1420
        }
    },
    {
        "1421": {
            "dePart": "Die Vernunft spricht leise, deshalb wird sie so oft nicht gehört.",
            "enPart": "",
            "category": "preDraft",
            "id": 1421
        }
    },
    {
        "1422": {
            "dePart": "Man löst keine Probleme, indem man sie aufs Eis legt.",
            "enPart": "",
            "category": "preDraft",
            "id": 1422
        }
    },
    {
        "1423": {
            "dePart": "Die Presse ist für mich Druckerschwärze auf Papier.",
            "enPart": "",
            "category": "preDraft",
            "id": 1423
        }
    },
    {
        "1424": {
            "dePart": "Ich gehe langsam, aber ich gehe nie zurück.",
            "enPart": "",
            "category": "preDraft",
            "id": 1424
        }
    },
    {
        "1425": {
            "dePart": "Krisen meistert man am besten, indem man ihnen zuvorkommt.",
            "enPart": "",
            "category": "preDraft",
            "id": 1425
        }
    },
    {
        "1426": {
            "dePart": "Einfach reden, aber kompliziert denken - nicht umgekehrt.",
            "enPart": "",
            "category": "preDraft",
            "id": 1426
        }
    },
    {
        "1427": {
            "dePart": "Wenn die anderen glauben, man ist am Ende, so muß man erst richtig anfangen.",
            "enPart": "",
            "category": "preDraft",
            "id": 1427
        }
    },
    {
        "1428": {
            "dePart": "Die Natur macht Frauen verschieden - die Mode macht sie gleich.",
            "enPart": "",
            "category": "preDraft",
            "id": 1428
        }
    },
    {
        "1429": {
            "dePart": "Die Visionäre von gestern sind die Realisten von heute.",
            "enPart": "",
            "category": "preDraft",
            "id": 1429
        }
    },
    {
        "1430": {
            "dePart": "Es gibt Dinge, über die spreche ich nicht einmal mit mir selbst.",
            "enPart": "",
            "category": "preDraft",
            "id": 1430
        }
    },
    {
        "1431": {
            "dePart": "Die Weltgeschichte ist auch die Summe dessen, was vermeidbar gewesen wäre.",
            "enPart": "",
            "category": "preDraft",
            "id": 1431
        }
    },
    {
        "1432": {
            "dePart": "Egal was ein Mensch getan hat, er bleibt ein Mensch.",
            "enPart": "",
            "category": "preDraft",
            "id": 1432
        }
    },
    {
        "1433": {
            "dePart": "Entscheidend ist, was hinten rauskommt.",
            "enPart": "",
            "category": "preDraft",
            "id": 1433
        }
    },
    {
        "1434": {
            "dePart": "Hochverrat ist eine Frage des Datums.",
            "enPart": "",
            "category": "preDraft",
            "id": 1434
        }
    },
    {
        "1435": {
            "dePart": "Wenn du durch die Hölle gehst, geh weiter.",
            "enPart": "",
            "category": "preDraft",
            "id": 1435
        }
    },
    {
        "1436": {
            "dePart": "Vergib Deinen Feinden, aber vergiß niemals ihre Namen.",
            "enPart": "",
            "category": "preDraft",
            "id": 1436
        }
    },
    {
        "1437": {
            "dePart": "Die Zukunft gehört denen, die an die Schönheit ihrer Träume glauben.",
            "enPart": "",
            "category": "preDraft",
            "id": 1437
        }
    },
    {
        "1438": {
            "dePart": "Nichts verschafft mehr Ruhe als ein gefasster Entschluss.",
            "enPart": "",
            "category": "preDraft",
            "id": 1438
        }
    },
    {
        "1439": {
            "dePart": "Schlimmer als blind sein, ist nicht sehen wollen.",
            "enPart": "",
            "category": "preDraft",
            "id": 1439
        }
    },
    {
        "1440": {
            "dePart": "Wer sich nicht selbst imponiert, kann niemand anderem imponieren.",
            "enPart": "",
            "category": "preDraft",
            "id": 1440
        }
    },
    {
        "1441": {
            "dePart": "Kein Mensch hat das recht, einen anderen zu regieren.",
            "enPart": "",
            "category": "preDraft",
            "id": 1441
        }
    },
    {
        "1442": {
            "dePart": "Egal wie weit der Weg ist, man muß den ersten Schritt tun.",
            "enPart": "",
            "category": "preDraft",
            "id": 1442
        }
    },
    {
        "1443": {
            "dePart": "Lernen, lernen und nochmals lernen.",
            "enPart": "",
            "category": "preDraft",
            "id": 1443
        }
    },
    {
        "1444": {
            "dePart": "Mit Verlaub, Herr Präsident, Sie sind ein Arschloch.",
            "enPart": "",
            "category": "preDraft",
            "id": 1444
        }
    },
    {
        "1445": {
            "dePart": "Vergessen ist Gefahr und Gnade zugleich.",
            "enPart": "",
            "category": "preDraft",
            "id": 1445
        }
    },
    {
        "1446": {
            "dePart": "Alle menschlichen Organe werden irgendwann müde, nur die Zunge nicht.",
            "enPart": "",
            "category": "preDraft",
            "id": 1446
        }
    },
    {
        "1447": {
            "dePart": "Frieden im eigenen Lande, Frieden überall.",
            "enPart": "",
            "category": "preDraft",
            "id": 1447
        }
    },
    {
        "1448": {
            "dePart": "Es gibt nichts Neues in der Welt, außer der Geschichte, die du nicht kennst.",
            "enPart": "",
            "category": "preDraft",
            "id": 1448
        }
    },
    {
        "1449": {
            "dePart": "Schweigen ist Beweisführung mit anderen Mitteln.",
            "enPart": "",
            "category": "preDraft",
            "id": 1449
        }
    },
    {
        "1450": {
            "dePart": "Ich lüge nie, doch niemand kann mich zwingen, die Wahrheit zu sagen.",
            "enPart": "",
            "category": "preDraft",
            "id": 1450
        }
    },
    {
        "1451": {
            "dePart": "Wir können nicht alles tun, aber wir müssen tun, was wir können.",
            "enPart": "",
            "category": "preDraft",
            "id": 1451
        }
    },
    {
        "1452": {
            "dePart": "Die Zukunft ist im Himmel.",
            "enPart": "",
            "category": "preDraft",
            "id": 1452
        }
    },
    {
        "1453": {
            "dePart": "Wer ja sagt zur Familie, muß auch ja sagen zur Frau.",
            "enPart": "",
            "category": "preDraft",
            "id": 1453
        }
    },
    {
        "1454": {
            "dePart": "Wer Visionen hat, sollte zum Arzt gehen.",
            "enPart": "",
            "category": "preDraft",
            "id": 1454
        }
    },
    {
        "1455": {
            "dePart": "Ein Kuss ist wie jeder Kuss, aber die Liebenden werden trotzdem nie müde.",
            "enPart": "",
            "category": "preDraft",
            "id": 1455
        }
    },
    {
        "1456": {
            "dePart": "Das Schweigen von gestern rechtfertigt nie das Schweigen von heute.",
            "enPart": "",
            "category": "preDraft",
            "id": 1456
        }
    },
    {
        "1457": {
            "dePart": "Irren ist menschlich, aber immer irren ist sozialdemokratisch.",
            "enPart": "",
            "category": "preDraft",
            "id": 1457
        }
    },
    {
        "1458": {
            "dePart": "Der Mensch ist immer noch der beste Computer.",
            "enPart": "",
            "category": "preDraft",
            "id": 1458
        }
    },
    {
        "1459": {
            "dePart": "Partei ist organisierte Meinung.",
            "enPart": "",
            "category": "preDraft",
            "id": 1459
        }
    },
    {
        "1460": {
            "dePart": "Vorwärts immer, rückwärts nimmer.",
            "enPart": "",
            "category": "preDraft",
            "id": 1460
        }
    },
    {
        "1461": {
            "dePart": "Besser einander beschimpfen als einander beschießen.",
            "enPart": "",
            "category": "preDraft",
            "id": 1461
        }
    },
    {
        "1462": {
            "dePart": "Je freier die Wirtschaft, umso sozialer ist sie auch.",
            "enPart": "",
            "category": "preDraft",
            "id": 1462
        }
    },
    {
        "1463": {
            "dePart": "Die Stunde des Todes ist die Stunde der Wahrheit.",
            "enPart": "",
            "category": "preDraft",
            "id": 1463
        }
    },
    {
        "1464": {
            "dePart": "Nur wer sich sicher fühlt, ist tolerant.",
            "enPart": "",
            "category": "preDraft",
            "id": 1464
        }
    },
    {
        "1465": {
            "dePart": "Ich lehne die Todesstrafe ab - grundsätzlich und bei jedermann.",
            "enPart": "",
            "category": "preDraft",
            "id": 1465
        }
    },
    {
        "1466": {
            "dePart": "Alles ist möglich, selbst dämliche Fragen wie Ihre.",
            "enPart": "",
            "category": "preDraft",
            "id": 1466
        }
    },
    {
        "1467": {
            "dePart": "Freundschaft ist ein Band der Vernunft.",
            "enPart": "",
            "category": "preDraft",
            "id": 1467
        }
    },
    {
        "1468": {
            "dePart": "Zimmermann ist als Löwe gesprungen und als Bettvorleger gelandet.",
            "enPart": "",
            "category": "preDraft",
            "id": 1468
        }
    },
    {
        "1469": {
            "dePart": "Das Angenehme der Ehe wiegt ihr Unangenehmes nicht auf.",
            "enPart": "",
            "category": "preDraft",
            "id": 1469
        }
    },
    {
        "1470": {
            "dePart": "Gewissen hat mit Galanterie nicht mehr zu tun als mit Politik.",
            "enPart": "",
            "category": "preDraft",
            "id": 1470
        }
    },
    {
        "1471": {
            "dePart": "Da draussen lauert ein Wolf, er will mein Blut. Wir müssen alle Wölfe töten!",
            "enPart": "",
            "category": "preDraft",
            "id": 1471
        }
    },
    {
        "1472": {
            "dePart": "Wer Berlin zur neuen Hauptstadt macht, schafft geistig ein neues Preußen.",
            "enPart": "",
            "category": "preDraft",
            "id": 1472
        }
    },
    {
        "1473": {
            "dePart": "Die Revolution ist das größte, alles andere ist Quark",
            "enPart": "",
            "category": "preDraft",
            "id": 1473
        }
    },
    {
        "1474": {
            "dePart": "Die SPD unterliegt dem Missverständnis, dass Genosse von Genuss kommt.",
            "enPart": "",
            "category": "preDraft",
            "id": 1474
        }
    },
    {
        "1475": {
            "dePart": "Ich habe versucht, ehrlich zu sein, aber in Maßen.",
            "enPart": "",
            "category": "preDraft",
            "id": 1475
        }
    }]

let willSave = {}
arr.map((val)=>{
    let index = R.keys(val)
    willSave[ index ] = val[ index ]
})
//J.log(willSave)
fs.writeJsonSync(dbPathRaw, {data: willSave})
