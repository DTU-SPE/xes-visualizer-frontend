<template>
    <div class="list-group list-group-flush">
        <b-list-group-item
            v-bind:key="l"
            v-for="l in Object.keys(logs)"
            class="list-group-item list-group-item-action bg-light border-0 align-items-center p-2 pl-3"
            :to="{ name: 'LogViewer', params: { id: l }}">
            <font-awesome-icon icon="file" />
            {{ l }}
        </b-list-group-item>
    </div>
</template>

<script>
export default {
    name: "LogsList",
    props: ["logs"]
}
</script>