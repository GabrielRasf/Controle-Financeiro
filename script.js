document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const descricaoInput = document.getElementById("descricao");
    const valorInput = document.getElementById("valor");
    const tipoInput = document.getElementById("tipo");
    const listaGanhos = document.getElementById("lista-ganhos");
    const listaGastos = document.getElementById("lista-gastos");
    const saldoAtual = document.getElementById("saldo-atual");
    const graficoPizza = document.getElementById("graficoPizza");

    let saldo = 0;
    let totalGanhos = 0;
    let totalGastos = 0;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const descricao = descricaoInput.value.trim();
        const valor = parseFloat(valorInput.value);
        const tipo = tipoInput.value;

        if (!descricao || isNaN(valor) || valor <= 0) {
            alert("Preencha os campos corretamente.");
            return;
        }

        const item = document.createElement("li");
        item.textContent = `${descricao}: R$ ${valor.toFixed(2)}`;

        if (tipo === "ganho") {
            listaGanhos.appendChild(item);
            totalGanhos += valor;
            saldo += valor;
        } else {
            listaGastos.appendChild(item);
            totalGastos += valor;
            saldo -= valor;
        }

        atualizarSaldo();
        atualizarGrafico();
        form.reset();
    });

    function atualizarSaldo() {
        saldoAtual.textContent = `Saldo Atual: R$ ${saldo.toFixed(2)}`;
        saldoAtual.style.color = saldo >= 0 ? "green" : "red";
    }

    function atualizarGrafico() {
        const total = totalGanhos + totalGastos;
        if (total === 0) {
            graficoPizza.style.background = "gray";
            return;
        }

        const porcentagemGastos = (totalGastos / total) * 100;
        graficoPizza.style.background = `conic-gradient(#D24D57 ${porcentagemGastos}%, #6FA36F ${porcentagemGastos}%,rgb(180, 180, 180) ${porcentagemGastos}%)`;
    }
});
