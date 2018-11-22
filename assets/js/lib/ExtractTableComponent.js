function ExtractTableComponent () {

}

// Componente tabela de extrato
ExtractTableComponent.init = function( elem ) {

    // Usar o identificador do elemento para criar um objeto Jquery
    this.table = $(elem);

    // Valores padrão
    this.initialValue = "";
    this.finalValue = "";
    this.period = "";
    this.tableEntries = [];

    // Criar e preencher a tabela
    this.createTable();
}

// Criar a tabela
ExtractTableComponent.createTable = function() {
    this.table.html(`
        <div class="extract-table">
            <div class="extract-table-header">
                <div class="row">
                    <div class="col-md-8 text-white">
                        <h5>Extrato</h5>
                    </div>
                    <div class="col-md-4 text-white">
                        <p>Intervalo: <span class="period"></span></p>
                    </div>
                </div>
            </div>
            <div class="extract-table-sub-header">
                <div class="row">
                    <div class="col-md-8">
                        Início do Período <br><h5>VALOR DA CARTEIRA</h5>
                    </div>
                    <div class="col-md-4 value">
                        <strong class="initial-value"></strong>
                    </div>
                </div>
            </div>

            <div class="entries-list"></div>

            <div class="extract-table-sub-header">
                <div class="row">
                    <div class="col-md-8">
                        Final do Período <br><h5>VALOR DA CARTEIRA</h5>
                    </div>
                    <div class="col-md-4 value">
                        <strong class="final-value"></strong>
                    </div>
                </div>
            </div>
        </div>
    `);
}

// Preencher a tabela com os dados
ExtractTableComponent.fillTable = function( data ) {
    this.initialValue = data.initialValue;
    this.finalValue = data.finalValue;
    this.period = data.period;
    this.tableEntries = data.entries;

    this.table.find(".initial-value").text(this.initialValue);
    this.table.find(".final-value").text(this.finalValue);
    this.table.find(".period").text(this.period);

    for (var i = 0; i < this.tableEntries.length; i++) {
        this.table.find(".entries-list").append(`
            <div class="extract-table-row ${ (i + 1) % 2 == 0 ? "even-row" : "odd-row" }">
                <div class="row">
                    <div class="col-md-4 date-mark ${ this.tableEntries[i].type == "in" ? "text-success" : "text-danger" }">
                        ${ this.tableEntries[i].date } <br><strong>${ this.tableEntries[i].type == "in" ? "Entrada" : "Saída" }</strong>
                    </div>
                    <div class="col-md-4 info-text text-black-50">
                        ${ this.tableEntries[i].description }
                    </div>
                    <div class="col-md-4 value-text ${ this.tableEntries[i].type == "in" ? "text-success" : "text-danger" }">
                        <strong>${ this.tableEntries[i].value }</strong>
                    </div>
                </div>
            </div>
        `);
    }
}

export default ExtractTableComponent;
