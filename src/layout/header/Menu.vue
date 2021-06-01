<template>
  <!--begin::Menu wrapper-->
  <div class="searcah" style=""> 
                <div class="d-flex justify-content-center px-5">
                    <div class="search"> <a href="#" class="search-icon"> <i class="fa fa-search"></i> </a> <input type="text" class="search-input" placeholder="Search..." name=""> </div>
                </div> 
            </div>
  <!--end::Menu wrapper-->
</template>
<style  >
 .searcah {
     
     display: block;
}
 .search {
    width: 50rem;
    margin-bottom: auto;
    margin-top: 17px;
    height: 44px;
    background-color: #fff;
    padding: 10px; 
}
.search-input {
    color: #5a5757;
    border: 0; 
    line-height: 20px;
    border-bottom: 1px solid #D4D4D4!important; 
    width: 47rem;
    
} 
</style>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
 

export default defineComponent({
  name: "NTMenu",
  components: {},
  setup() {
    const route = useRoute();
  
    return {
    
    };
  }
});
</script>
