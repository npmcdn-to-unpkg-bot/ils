"use strict"
const J = require("./common")
const R = require("ramda")
let text = `Kritik aus Berlin an Drohung der Türkei :
Führende CDU-Politiker haben die Drohung der Türkei, das Flüchtlingsabkommen mit der EU platzen zu lassen, wenn diese kein Datum für die Einführung der Visafreiheit zusagt, als Erpressung zurückgewiesen. So hätten Staaten nicht miteinander umzugehen, sagte CDU-Vize Thomas Strobl der "Rheinischen Post". Der Vorsitzende des Europa-Ausschusses im Bundestag, Gunther Krichbaum, erklärte, mit derlei Drohungen setze die Türkei weitaus mehr aufs Spiel als ein Flüchtlingsabkommen. Bundesaußenminister Frank-Walter Steinmeier (SPD) sagte ebenfalls in der "Rheinischen Post",`
let just = R.compose(R.split(" "))(text)
J.log(just)
