<template>
<div class="recommend">
  <div v-for="item in recommends" class="recommend-item">
    <a :href="item.link">
      <img :src="item.image" alt="">
      <div>{{item.title}}</div>
    </a>
  </div>
</div>
</template>

<script>
  export default {
    name: "HomeRecommendView",
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display:flex;
    width:100%;
    text-align: center;
    font-size: 12px;

    padding:15px 0 15px;
  }

  .recommend-item{
    flex: 1;
  }
  .recommend-item img{
    width:80%;
  }
</style>
