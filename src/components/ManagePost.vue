<template>
    <section id="manage-post">
        <h1 class="title">Edit Post</h1>
        <form>
        <div class="field">
            <div class="control">
                <label for="" class="label">
                    Title
                    <input type="text" class="input" v-model="content.title">
                </label>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label">
                Draft
            </div>
            <div class="field-body">
                <toggle :label="'draft'" :draft.sync="content.draft"/>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label">
                Featured
            </div>
            <div class="field-body">
                <toggle :label="'featured'" :featured.sync="content.featured"/>
            </div>
        </div>
         <div class="field" v-if="content.featured">
            <div class="control">
                <label for="" class="label">
                    Select Image
                    <input type="file" class="input">
                </label>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <editor v-model="content.body" />
            </div>
        </div>
    </form>
    </section>
</template>

<script>
import Toggle from "./Toggle.vue";
import Editor from "./editor/Editor.vue";
export default {
    name: "ManagePosts",
    components: { Toggle, Editor },
    props: {
        content: {
            type: Object
        }
    }
}
</script>

<style>
.field-label {
    text-align: left;
}
</style>
