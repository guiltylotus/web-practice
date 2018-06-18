<template>
    <div class='main'>
      <shopping-nav :items="items"/>
      <shopping-add-new :items="items"/>
      <shopping-list :items="items"/>
    </div>
</template>

<script>
import ShoppingNav from './ShoppingNav.vue'
import ShoppingAddNew from './ShoppingAddNew.vue'
import ShoppingList from './ShoppingList.vue'

export default {
    props: ["items"],
    components: {
        'shopping-nav': ShoppingNav,
        'shopping-add-new': ShoppingAddNew,
        'shopping-list': ShoppingList,
    }
}

</script>

<style scoped>
.main {
    margin-left: 160px;
}
</style>

