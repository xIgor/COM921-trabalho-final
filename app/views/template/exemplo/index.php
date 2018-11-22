<div class="container">

    <h2 class="py-3 wb-3">Componente criado com Vue:</h2>

    <div id="exampleApp" class="posts-gallery wb-5">
        <blog-post v-for="post in posts" v-bind:post="post" v-bind:key="post.id"></blog-post>
    </div>

    <h2 class="py-3 wb-3">Componente criado com JQuery</h2>

    <div id="extractTable" class="wb-5"></div>

</div>



