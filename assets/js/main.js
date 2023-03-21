/*
Descrizione:
Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri scompaiono e l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

Consigli del giorno:
Pensate prima in italiano.
Dividete in piccoli problemi la consegna.
Individuate gli elementi di cui avete bisogno per realizzare il programma.

Bonus:
Invece di usare prompt e allerte usate inputs ed elementi della dom per mostrare a schermo il risultato.
*/

// Show the numbers on the page and start a 30s timer
// At the end the numbers have to disappear
// The user inserts 5 numbers and I have to check how many and which ones the user remembers correctly

// Create a 5 unique numbers array
const numbersToMemorize = [];
while (numbersToMemorize.length < 5) {
  // Numbers between 0 and 100 (both included) will be generated
  const singleNumberToMemorize = Math.floor(Math.random() * 101);
  if (!numbersToMemorize.includes(singleNumberToMemorize)) {
    numbersToMemorize.push(singleNumberToMemorize);
  }
}

console.log(numbersToMemorize);