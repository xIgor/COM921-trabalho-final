<div class="header">
    <h2 class="text-white text-center mt-3">COM921 - Trabalho Final</h2>
</div>

<div class="row ">
    <div class="col">
        <h1 class="text-center my-4 text-primary">Dashboard</h1>
    </div>
</div>

<div id="dashboardParent">
    <div class="row justify-content-center mb-5">
        <div class="col-10 col-sm-7">
            <h4 class="text-center">Porcentagem de Reclamações por Região</h4>
            <canvas id="regionChart" width="100%"></canvas>
        </div>
    </div>

    <div class="row justify-content-center mb-5" v-show="showStateChart">
        <div class="col-10 col-sm-7">
            <h4 class="text-center">Porcentagem de Reclamações por Estados - Região {{selectedRegion}}</h4>
            <canvas id="stateChart" width="100%"></canvas>
        </div>
    </div>

    <div class="row justify-content-center mb-5" v-show="showCompanyChart">
        <div class="col-10 col-sm-7">
            <h4 class="text-center">Empresas com Maior Número de Reclamações - Estado {{selectedState}}</h4>
            <canvas id="companyChart" width="100%"></canvas>
        </div>
    </div>

    <div class="row justify-content-center mb-5" v-show="showRatingChart">
        <div class="col-10 col-sm-7">
            <h4 class="text-center">Média de Reclamações por Mẽs - Empresa {{selectedCompany}}</h4>
            <canvas id="ratingChart" width="100%"></canvas>
        </div>
    </div>


</div>


<div class="mb-4"></div>