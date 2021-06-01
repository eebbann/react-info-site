<template>
  <!--begin::Toolbar-->
  <div class="toolbar" id="kt_toolbar">
    <!--begin::Container-->
    <div id="kt_toolbar_container" class="container-fluid d-flex flex-stack">
      <!--begin::Page title-->
      <div
        class="page-title d-flex align-items-center me-3 flex-wrap mb-5 mb-lg-0 lh-1"
      >
        <!--begin::Title-->
        <h1 class="d-flex align-items-center text-dark fw-bolder my-1 fs-3">
          {{ title }}
        </h1>
        <div class="col-md-8">
          <p class="list-unstyled text-gray-600 fw-bold fs-6 p-0 m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor rhoncus dolor purus non.
          </p>
        </div>
        <!--end::Button-->
      </div>
      <!--end::Actions-->
    </div>
    <!--end::Container-->
  </div>
  <!--end::Toolbar-->
</template>
<style>
p.list-unstyled.text-gray-600.fw-bold.fs-6.p-0.m-0 {
  letter-spacing: 0.2px;
  line-height: 19.2px;
  font-size: 16px;
}
</style>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "KToolbar",
  props: {
    breadcrumbs: Array,
    title: String,
  },
  components: {},
});
</script>
