class Nod {
    constructor(frv, prb, lit, stg, drp, huf) {
        this.frv = frv;
        this.prb = prb;
        this.lit = lit;
        this.stg = stg;
        this.drp = drp;
        this.huf = huf;
    }
}

let A = new Nod(0, 0, "A", "", "", "");
let Ă = new Nod(0, 0, "Ă", "", "", "");
let Â = new Nod(0, 0, "Â", "", "", "");
let B = new Nod(0, 0, "B", "", "", "");
let C = new Nod(0, 0, "C", "", "", "");
let D = new Nod(0, 0, "D", "", "", "");
let E = new Nod(0, 0, "E", "", "", "");
let F = new Nod(0, 0, "F", "", "", "");
let G = new Nod(0, 0, "G", "", "", "");
let H = new Nod(0, 0, "H", "", "", "");
let I = new Nod(0, 0, "I", "", "", "");
let Î = new Nod(0, 0, "Î", "", "", "");
let J = new Nod(0, 0, "J", "", "", "");
let K = new Nod(0, 0, "K", "", "", "");
let L = new Nod(0, 0, "L", "", "", "");
let M = new Nod(0, 0, "M", "", "", "");
let N = new Nod(0, 0, "N", "", "", "");
let O = new Nod(0, 0, "O", "", "", "");
let P = new Nod(0, 0, "P", "", "", "");
let Q = new Nod(0, 0, "Q", "", "", "");
let R = new Nod(0, 0, "R", "", "", "");
let S = new Nod(0, 0, "S", "", "", "");
let Ș = new Nod(0, 0, "Ș", "", "", "");
let T = new Nod(0, 0, "T", "", "", "");
let Ț = new Nod(0, 0, "Ț", "", "", "");
let U = new Nod(0, 0, "U", "", "", "");
let V = new Nod(0, 0, "V", "", "", "");
let W = new Nod(0, 0, "W", "", "", "");
let X = new Nod(0, 0, "X", "", "", "");
let Y = new Nod(0, 0, "Y", "", "", "");
let Z = new Nod(0, 0, "Z", "", "", "");
let litere = [A, Ă, Â, B, C, D, E, F, G, H, I, Î, J, K, L, M, N, O, P, Q, R, S, Ș, T, Ț, U, V, W, X, Y, Z];

function ReseteazaLitere(){
    for (let i = 0; i < litere.length; i++){
        litere[i].frv = 0;
        litere[i].stg = "";
        litere[i].drp = "";
        litere[i].huf = "";
    }
}

function ProcesareText() {
    ReseteazaLitere();

    let text;
    let counter = 0;
    let totalProbabilitate = 0;
    //console.log("S-a apelat functia");

    text = document.getElementById("floatingTextarea").value;
    //console.log(text);

    text = text.toUpperCase();

    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < litere.length; j++) {
            if (text[i] === litere[j].lit) {
                litere[j].frv++;
                counter++;
            }
        }
    }

    let stiva = [...litere];
    stiva.sort(function (a, b) {
        return a.frv - b.frv
    });

    while (stiva.length > 1) {
        let stang = stiva.shift();
        let dreapta = stiva.shift();
        let aux = new Nod(stang.frv + dreapta.frv, "-", "-", stang, dreapta, "");
        stiva.push(aux);
        stiva.sort(function (a, b) {
            return a.frv - b.frv
        });
    }

    function vsd(Nod, cale, aux) {
        if (Nod) {
            //console.log(Nod.lit)
            Nod.huf += cale;
            Nod.huf += aux;
            vsd(Nod.stg, Nod.huf, "0");
            vsd(Nod.drp, Nod.huf, "1");
        }
    }
    vsd(stiva[0], "", "");


// ---------------------------------------DEBUG---------------------------------------------------------------
    //console.log("Lista de litere: ");
    //console.log(litere);
    //console.log("Stiva de noduri ordonate: ");
    //console.log(stiva);

    for (let i = 0; i < litere.length; i++) {
        litere[i].prb = ((litere[i].frv * 1.0) / counter);
        totalProbabilitate += litere[i].prb;

        let auxString;
        auxString = "litera";
        auxString += litere[i].lit;
        let tdCaracter = document.getElementById(auxString);
        tdCaracter.innerText = litere[i].lit;

        auxString = "frecventa";
        auxString += litere[i].lit;
        let tdFrecventa = document.getElementById(auxString);
        tdFrecventa.innerText = litere[i].frv;

        auxString = "probabilitate";
        auxString += litere[i].lit;
        let tdProbabilitate = document.getElementById(auxString);
        tdProbabilitate.innerText = litere[i].prb;

        auxString = "huff";
        auxString += litere[i].lit;
        let tdHuffman = document.getElementById(auxString);
        tdHuffman.innerText = litere[i].huf;

    }

    let ctr = document.getElementById("afisajNumarTotalLitere")
    ctr.innerText = "Numar total de litere: " + counter;

    let prb = document.getElementById("afisajProbabilitateTotala");
    prb.innerText = "Total probabilitate de aparitie: " + totalProbabilitate;

    let entropie = 0;
    let lungimeTotala = 0;

    for (let i = 0; i < litere.length; i++) {
        if (litere[i].prb > 0) {
            entropie += litere[i].prb * Math.log2(1 / litere[i].prb);
            lungimeTotala += litere[i].prb * litere[i].huf.length;
        }
    }

    let entr = document.getElementById("afisajEntropie");
    entr.innerText = "Entropia este: " + entropie;

    let eficienta = entropie / lungimeTotala;
    let efic = document.getElementById("afisajEficienta");
    efic.innerText = "Eficienta este: " + eficienta;

    let redundanta = 1 - eficienta;
    let redt = document.getElementById("afisajRedundanta");
    redt.innerText = "Redundanta este: " + redundanta;

    let meh = entropie + 1;
    let vrf = document.getElementById("afisajVerificareTeorema");
    vrf.innerText = "Verificare teorema: " + entropie + " ≤ " + lungimeTotala + " < " + meh;
}

function CriptareText(){
    let text;
    text = document.getElementById("floatingTextarea2").value.toUpperCase();
    //console.log(text);

    let textCriptat = "";

    for (let i = 0; i <text.length ;i++){
        for (let j = 0; j <litere.length ; j++){
            if (text[i] === litere[j].lit ){
                textCriptat += ""+litere[j].huf;
                //console.log(textCriptat);
            }
            if (text[i] === " ") {
                textCriptat += " ";
                //textCriptat += litere[19].huf;
            }
        }
    }
    let txtcrpt = document.getElementById("textCriptat");
    txtcrpt.innerText=textCriptat;
}

function DecriptareText(){
    let text;
    text = document.getElementById("floatingTextarea3").value;
    //console.log(text);

    let textDecriptat = "";
    let mostra = "";

    for (let i = 0; i < text.length ;i++){
        mostra += text[i];
        for (let j = 0; j < litere.length ; j++){
            if (mostra === " "){
                textDecriptat += " ";
                mostra = "";
            }
            if (mostra === litere[j].huf) {
                textDecriptat += litere[j].lit;
                mostra = "";
            }
        }
    }

    let txtdecrpt = document.getElementById("textDecriptat");
    txtdecrpt.innerText=textDecriptat;
}