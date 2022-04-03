class Nod {
    constructor(frv, prb, lit, stg, drp, huf, shan) {
        this.frv = frv;
        this.prb = prb;
        this.lit = lit;
        this.stg = stg;
        this.drp = drp;
        this.huf = huf;
        this.shan = shan
    }
}

let A = new Nod(0, 0, "A", "", "", "", "");
let Ă = new Nod(0, 0, "Ă", "", "", "", "");
let Â = new Nod(0, 0, "Â", "", "", "", "");
let B = new Nod(0, 0, "B", "", "", "", "");
let C = new Nod(0, 0, "C", "", "", "", "");
let D = new Nod(0, 0, "D", "", "", "", "");
let E = new Nod(0, 0, "E", "", "", "", "");
let F = new Nod(0, 0, "F", "", "", "", "");
let G = new Nod(0, 0, "G", "", "", "", "");
let H = new Nod(0, 0, "H", "", "", "", "");
let I = new Nod(0, 0, "I", "", "", "", "");
let Î = new Nod(0, 0, "Î", "", "", "", "");
let J = new Nod(0, 0, "J", "", "", "", "");
let K = new Nod(0, 0, "K", "", "", "", "");
let L = new Nod(0, 0, "L", "", "", "", "");
let M = new Nod(0, 0, "M", "", "", "", "");
let N = new Nod(0, 0, "N", "", "", "", "");
let O = new Nod(0, 0, "O", "", "", "", "");
let P = new Nod(0, 0, "P", "", "", "", "");
let Q = new Nod(0, 0, "Q", "", "", "", "");
let R = new Nod(0, 0, "R", "", "", "", "");
let S = new Nod(0, 0, "S", "", "", "", "");
let Ș = new Nod(0, 0, "Ș", "", "", "", "");
let T = new Nod(0, 0, "T", "", "", "", "");
let Ț = new Nod(0, 0, "Ț", "", "", "", "");
let U = new Nod(0, 0, "U", "", "", "", "");
let V = new Nod(0, 0, "V", "", "", "", "");
let W = new Nod(0, 0, "W", "", "", "", "");
let X = new Nod(0, 0, "X", "", "", "", "");
let Y = new Nod(0, 0, "Y", "", "", "", "");
let Z = new Nod(0, 0, "Z", "", "", "", "");
let litere = [A, Ă, Â, B, C, D, E, F, G, H, I, Î, J, K, L, M, N, O, P, Q, R, S, Ș, T, Ț, U, V, W, X, Y, Z];

function ReseteazaLitere() {
    for (let i = 0; i < litere.length; i++) {
        litere[i].frv = 0;
        litere[i].stg = "";
        litere[i].drp = "";
        litere[i].huf = "";
        litere[i].shan = "";
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


    let stivaShan = [...litere];
    stivaShan.sort(function (a, b) {
        return b.frv - a.frv
    });

    function Shannon(idxInc, idxSft) {
        //console.log("Am intrat in Shannon");
        //console.log("Index inceput: " + idxInc);
        //console.log("Index sfarsit: " + idxSft);

        if (stivaShan[idxInc].frv === 0) {
            if (idxSft - idxInc > 0){
                let idxIncStg = idxInc;
                let idxSftStg = idxInc+Math.floor((idxSft-idxInc)/2);
                let idxIncDrt = idxInc+Math.floor((idxSft-idxInc)/2) + 1;
                let idxSftDrt = idxSft;
                for (let i = idxIncStg; i <= idxSftStg; i++) {
                    stivaShan[i].shan += "0";
                }
                for (let i = idxIncDrt; i <= idxSftDrt; i++) {
                    stivaShan[i].shan += "1";
                }
                Shannon(idxIncStg, idxSftStg);
                Shannon(idxIncDrt, idxSftDrt);
            }
        } else {
            if (idxSft - idxInc > 1) {
                let sumaPartiala = 0;
                let sumaTotala = 0;
                let idxIncStg;
                let idxSftStg;
                let idxIncDrt;
                let idxSftDrt;

                for (let i = idxInc; i <= idxSft; i++) {
                    sumaTotala += stivaShan[i].frv;
                }
                //console.log("Suma totala: " + sumaTotala);


                for (let i = idxInc; i <= idxSft; i++) {
                    sumaPartiala += stivaShan[i].frv;
                    if (sumaPartiala > Math.floor(sumaTotala / 2)) {
                        idxIncStg = idxInc;
                        idxSftStg = i;
                        idxIncDrt = i + 1;
                        idxSftDrt = idxSft;
                        break;
                    }
                }

                for (let i = idxIncStg; i <= idxSftStg; i++) {
                    stivaShan[i].shan += "0";
                }

                for (let i = idxIncDrt; i <= idxSftDrt; i++) {
                    stivaShan[i].shan += "1";
                }
                //console.log("Suma partiala: " + sumaPartiala);

                Shannon(idxIncStg, idxSftStg);
                Shannon(idxIncDrt, idxSftDrt);
            } else {
                if (idxSft - idxInc > 0) {
                    stivaShan[idxInc].shan += "0";
                    stivaShan[idxSft].shan += "1";
                }
            }
        }
    }

    Shannon(0, 30);
    console.log("Am terminat Shannon");
    console.log(litere);

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

        auxString = "shan";
        auxString += litere[i].lit;
        let tdShannon = document.getElementById(auxString);
        tdShannon.innerText = litere[i].shan;

    }

    let ctrHuf = document.getElementById("afisajNumarTotalLitereHuff")
    ctrHuf.innerText = "Numar total de litere: " + counter;

    let prbHuf = document.getElementById("afisajProbabilitateTotalaHuff");
    prbHuf.innerText = "Total probabilitate de aparitie: " + totalProbabilitate;

    let ctrShan = document.getElementById("afisajNumarTotalLitereShan")
    ctrShan.innerText = "Numar total de litere: " + counter;

    let prbShan = document.getElementById("afisajProbabilitateTotalaShan");
    prbShan.innerText = "Total probabilitate de aparitie: " + totalProbabilitate;

    let entropieHuf = 0;
    let lungimeTotalaHuf = 0;

    for (let i = 0; i < litere.length; i++) {
        if (litere[i].prb > 0) {
            entropieHuf += litere[i].prb * Math.log2(1 / litere[i].prb);
            lungimeTotalaHuf += litere[i].prb * litere[i].huf.length;
        }
    }

    let entropieShan = 0;
    let lungimeTotalaShan = 0;

    for (let i = 0; i < litere.length; i++) {
        if (litere[i].prb > 0) {
            entropieShan += litere[i].prb * Math.log2(1 / litere[i].prb);
            lungimeTotalaShan += litere[i].prb * litere[i].shan.length;
        }
    }

    //Huffman
    let entrHuf = document.getElementById("afisajEntropieHuff");
    entrHuf.innerText = "Entropia este: " + entropieHuf;

    let eficientaHuf = entropieHuf / lungimeTotalaHuf;
    let eficHuf = document.getElementById("afisajEficientaHuff");
    eficHuf.innerText = "Eficienta este: " + eficientaHuf*100 + " %";

    let redundantaHuf = 1 - eficientaHuf;
    let redtHuf = document.getElementById("afisajRedundantaHuff");
    redtHuf.innerText = "Redundanta este: " + redundantaHuf*100 + " %";

    let entropieHufPlusOne = entropieHuf + 1;
    let vrfHuf = document.getElementById("afisajVerificareTeoremaHuff");
    vrfHuf.innerText = "Verificarea teoremei lui Shannon: " + entropieHuf + " ≤ " + lungimeTotalaHuf + " < " + entropieHufPlusOne;

    //Shannon
    let entrShan = document.getElementById("afisajEntropieShan");
    entrShan.innerText = "Entropia este: " + entropieShan;

    let eficientaShan = entropieShan / lungimeTotalaShan;
    let eficShan = document.getElementById("afisajEficientaShan");
    eficShan.innerText = "Eficienta este: " + eficientaShan*100 + " %";

    let redundantaShan = 1 - eficientaShan;
    let redtShan = document.getElementById("afisajRedundantaShan");
    redtShan.innerText = "Redundanta este: " + redundantaShan*100 + " %";

    let entropieShanPlusOne = entropieShan + 1;
    let vrfShan = document.getElementById("afisajVerificareTeoremaShan");
    vrfShan.innerText = "Verificarea teoremei lui Shannon: " + entropieShan + " ≤ " + lungimeTotalaShan + " < " + entropieShanPlusOne;
}

//Criptare si Decriptare Huffman
function CriptareTextHuff() {
    let text;
    text = document.getElementById("floatingTextarea2").value.toUpperCase();
    //console.log(text);

    let textCriptat = "";

    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < litere.length; j++) {
            if (text[i] === litere[j].lit) {
                textCriptat += "" + litere[j].huf;
                //console.log(textCriptat);
            }
            if (text[i] === " ") {
                textCriptat += " ";
                //textCriptat += litere[19].huf;
            }
        }
    }
    let txtcrpt = document.getElementById("textCriptatHuff");
    txtcrpt.innerText = textCriptat;
}

function DecriptareTextHuff() {
    let text;
    text = document.getElementById("floatingTextarea3").value;
    //console.log(text);

    let textDecriptat = "";
    let mostra = "";

    for (let i = 0; i < text.length; i++) {
        mostra += text[i];
        for (let j = 0; j < litere.length; j++) {
            if (mostra === " ") {
                textDecriptat += " ";
                mostra = "";
            }
            if (mostra === litere[j].huf) {
                textDecriptat += litere[j].lit;
                mostra = "";
            }
        }
    }

    let txtdecrpt = document.getElementById("textDecriptatHuff");
    txtdecrpt.innerText = textDecriptat;
}

//Criptare si Decriptare Shannon
function CriptareTextShan() {
    let text;
    text = document.getElementById("floatingTextarea4").value.toUpperCase();
    //console.log(text);

    let textCriptat = "";

    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < litere.length; j++) {
            if (text[i] === litere[j].lit) {
                textCriptat += "" + litere[j].shan;
                //console.log(textCriptat);
            }
            if (text[i] === " ") {
                textCriptat += " ";
                //textCriptat += litere[19].huf;
            }
        }
    }
    let txtcrpt = document.getElementById("textCriptatShan");
    txtcrpt.innerText = textCriptat;
}

function DecriptareTextShan() {
    let text;
    text = document.getElementById("floatingTextarea5").value;
    //console.log(text);

    let textDecriptat = "";
    let mostra = "";

    for (let i = 0; i < text.length; i++) {
        mostra += text[i];
        for (let j = 0; j < litere.length; j++) {
            if (mostra === " ") {
                textDecriptat += " ";
                mostra = "";
            }
            if (mostra === litere[j].shan) {
                textDecriptat += litere[j].lit;
                mostra = "";
            }
        }
    }

    let txtdecrpt = document.getElementById("textDecriptatShan");
    txtdecrpt.innerText = textDecriptat;
}