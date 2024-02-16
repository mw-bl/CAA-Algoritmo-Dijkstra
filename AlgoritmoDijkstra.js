function dijkstra (grafo, inicio, fim) {

    let distancias = {}, anterior = {}, naoVisitado = new Set();
    for (let no in grafo) {
        distancias[no] = no === inicio ? 0 : Infinity;
        naoVisitado.add(no);
    }

    while (naoVisitado.size) {
        let noFechado = null;
        for (let no of naoVisitado) {
            if (!noFechado || distancias[no] < distancias[noFechado]) {
                noFechado = no;
            }
        }

        if (distancias[noFechado] === Infinity) break;
        if (noFechado === fim) break;

        for (let vizinho in grafo[noFechado]) {
            let novaDistancia = distancias[noFechado] + grafo[noFechado][vizinho];
            if (novaDistancia < distancias[vizinho]) {
                distancias[vizinho] = novaDistancia;
                anterior[vizinho] = noFechado;
            }
        }
        naoVisitado.delete(noFechado);
    }

    let caminho = [], no = fim;
    while (no) {
        caminho.push(no);
        no = anterior[no];
    }
    return caminho.reverse();
}

const grafoExemplo = {
    A: { B: 1, C: 4 },
    B: { A: 1, C: 2, D: 5 },
    C: { A: 4, B: 2, D: 1 },
    D: { B: 5, C: 1 }
};

const inicio = 'A';
const fim = 'D';
const caminhoMaisCurto = dijkstra(grafoExemplo, inicio, fim);

console.log(`Caminho mais curto de ${inicio} para ${fim}: ${caminhoMaisCurto}`);