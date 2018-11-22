
export default {
    props: ['post'],
    template: `
        <div class="media blog-post">
            <img class="mr-3 blog-post-img" v-bind:src="post.img" v-bind:alt="post.title">
            <div class="media-body">
                <h5 class="mt-2 blog-post-title">{{post.title}}</h5>
                {{post.text}}
            </div>
        </div>
    `
};
