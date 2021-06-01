<template>
  <div class="card-group">
    <!--begin::Header-->
    
    <!--end::Header-->
    <!--begin::Body-->
    <div class="container-fluid">
      <div class=" ">
        <!--begin::Row-->

        <!--end::Row-->
        <!--begin::Row-->
        <div class="row m-0">
          <div class="card col-md-6 col-lg-4 px-5 py-8">
            <img
              src="media/products/landing/Rectangle 15-2.png"
              alt="tire1"
              class="card-image"
            />
            <a href="#" class="text-dark fw-bold fs-6 mt-3"> IMAGE NAME</a>
          </div>
          <div class="card col-md-6 col-lg-4  px-5 py-8">
            <img src="media/products/landing/Rectangle 15-2.png" alt="tire2" />
            <a href="#" class="text-dark fw-bold fs-6 mt-2"> TRAIL GRAPPLER </a>
          </div>
          <div class="card col-md-6 col-lg-4 px-5 py-8">
            <img src="media/products/landing/image_GRP.png" alt="tire1" />
            <a href="#" class="text-dark fw-bold fs-6 mt-2"> MUD GRAPPLER </a>
          </div>
        </div>
        <div class="row m-0">
          <div class="card col-md-6 col-lg-4  px-5 py-8">
            <img src="media/products/landing/Rectangle 15.png" alt="tire1" />
            <a href="#" class="text-dark fw-bold fs-6 mt-3"> RIDGE GRAPPLER </a>
          </div>
          <div class="card col-md-6 col-lg-4  px-5 py-8">
            <img src="media/products/landing/Rectangle 15-3.png" alt="tire2" />
            <a href="#" class="text-dark fw-bold fs-6 mt-2"> TRAIL GRAPPLER </a>
          </div>
          <div class="card col-md-6 col-lg-4  px-5 py-8">
            <img src="media/products/landing/Rectangle 15-5.png" alt="tire1" />
            <a href="#" class="text-dark fw-bold fs-6 mt-2"> MUD GRAPPLER </a>
          </div>
        </div>
        <div class="row m-0">
          <div class="card col-md-6 col-lg-4  px-5 py-8">
            <img src="media/products/landing/Rectangle 15-1.png" alt="tire1" />
            <a href="#" class="text-dark fw-bold fs-6 mt-3"> RIDGE GRAPPLER </a>
          </div>
          <div class="card col-md-6 col-lg-4  px-5 py-8">
            <img src="media/products/landing/Rectangle 15-4.png" alt="tire2" />
            <a href="#" class="text-dark fw-bold fs-6 mt-2"> TRAIL GRAPPLER </a>
          </div>
          <div class="card col-md-6 col-lg-4  px-5 py-8">
            <img src="media/products/landing/Rectangle 15-6.png" alt="tire1" />
            <a href="#" class="text-dark fw-bold fs-6 mt-2"> MUD GRAPPLER </a>
          </div>
        </div>
        <!--end::Row-->
      </div>
      <!--end::Stats-->
      <!--end::Body-->
    </div>
  </div>
</template>

<style> 
.row .col.px-5.py-8 {
    display: grid !important;
}
a.text-dark.fw-bold.fs-6 {
    position: relative;
    text-align: center;
}
.card{
  background: #f2f2f3 !important;
  border-radius: 0 !important;
}
.container-fluid {
    padding: 0 17px;
}
</style>
<script>
import { defineComponent, onMounted } from "vue";

import { MenuComponent } from "@/assets/ts/components/MenuComponent.ts";

export default defineComponent({
  name: "widget-1",
  components: {},

  setup() {
    onMounted(() => {
      MenuComponent.reinitialization();
    });

    return {};
  },
});
</script>
