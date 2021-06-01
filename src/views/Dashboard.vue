<template>
  <!--begin::Dashboard-->
  <div class="row gy-5 g-xl-8">
    <div class="col-12">
      <MixedWidget1></MixedWidget1>
    </div>
    <div class="col-xxl-4">
      <ListWidget5
        widget-classes="card-xxl-stretch mb-5 mb-xl-10"
      ></ListWidget5>
    </div>
    <div class="col-xxl-4">
      <StatsWidget7></StatsWidget7>
      <StatsWidget12></StatsWidget12>
    </div>
  </div>

  <div class="row gy-5 gx-xl-8">
    <div class="col-xxl-4">
      <ListWidget3 widget-classes="card-xxl-stretch mb-xl-3"></ListWidget3>
    </div>
    <div class="col-xxl-8">
      <TableWidget9
        widget-classes="card-xxl-stretch mb-5 mb-xl-8"
      ></TableWidget9>
    </div>
  </div>

  <div class="row gy-5 g-xl-8">
    <div class="col-xxl-4">
      <ListWidget2 widget-classes="card-xl-stretch mb-xl-8"></ListWidget2>
    </div>
    <div class="col-xxl-4">
      <ListWidget6 widget-classes="card-xl-stretch mb-xl-8"></ListWidget6>
    </div>
    <div class="col-xxl-4">
      <ListWidget1 widget-classes="card-xxl-stretch mb-xl-3"></ListWidget1>
    </div>
  </div>

  <div class="row g-5 gx-xxl-8">
    <div class="col-xxl-4">
      <StatsWidget13></StatsWidget13>
    </div>
    <div class="col-xxl-8">
      <TableWidget3
        widget-classes="card-xxl-stretch mb-5 mb-xxl-8"
      ></TableWidget3>
    </div>
  </div>
  <!--end::Dashboard-->
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import MixedWidget1 from "@/components/widgets/mixed/Widget1.vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "OVERVIEW",
  components: {
    MixedWidget1,
  },
  setup() {
    onMounted(() => {
      setCurrentPageTitle("OVERVIEW");
    });
  },
});
</script>
