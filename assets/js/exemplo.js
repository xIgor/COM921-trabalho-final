// Importar os componentes usados na página
import BlogPostComponent from "./lib/BlogPostComponent";
import ExtractTableComponent from "./lib/ExtractTableComponent";

new Vue({
    el: "#exampleApp",
    data: {
        posts: []
    },
    components: {
        "blog-post": BlogPostComponent
    },
    created() {
        // vue lifecycle hook
        API.get("/exemplo1").done(res => {
            switch (res.code) {
                case 200:
                    this.posts = res.data.posts;
                    break;
                default:
                    throw "Codigo não esperado! " + res.code;
            }
        });
    }
});

// Criar o componente extract-table, buscar o json e preenchê-lo
ExtractTableComponent.init("#extractTable");
API.get("/exemplo2").done((res) => {
    switch (res.code) {
        case 200:
            ExtractTableComponent.fillTable(res.data);
            break;
        default:
            throw "Codigo não esperado! " + res.code;
    }
});
