<template>
  <!--begin::Header-->
  <div id="kt_header" style="" class="header align-items-stretch">
    <!--begin::Container-->
    <div
      :class="{
        'container-fluid': headerWidthFluid,
        container: !headerWidthFluid
      }"
      class="d-flex align-items-stretch justify-content-between"
    >
      <!--begin::Aside mobile toggle-->
      <div
        class="d-flex align-items-center d-lg-none ms-n3 me-1"
        title="Show aside menu"
      >
        <div
          class="btn btn-icon btn-active-light-primary"
          id="kt_aside_mobile_toggle"
        >
          <span class="svg-icon svg-icon-2x mt-1">
            <inline-svg src="media/icons/duotone/Design/Menu.svg" />
          </span>
        </div>
      </div>
      <!--end::Aside mobile toggle-->

      <!--begin::Mobile logo-->
      <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
        <a href="#" class="d-lg-none">
          <img alt="Logo" src="media/logos/logo-1-dark.svg" class="h-10px" />
        </a>
      </div>
      <!--end::Mobile logo-->

      <!--begin::Wrapper-->
      <div
        class="d-flex align-items-stretch justify-content-between flex-lg-grow-1"
      >
        <!--begin::Navbar search-->
        <div
          v-if="!isDocPage"
          class="d-flex align-items-stretch"
          id="kt_header_menu_nav"
        >
          <NTMenu></NTMenu>
        </div>
        <!--end::Navbar-->

        <template v-if="isDocPage">
          <div class="page-title d-flex align-items-center mb-5 mb-lg-0">
            

            <span class="h-20px border-gray-200 border-start mx-4"></span>
            <ul class="breadcrumb breadcrumb-separatorless fw-bold fs-6 my-1">
              <li class="breadcrumb-item text-muted">
                {{ title }}
              </li>
            </ul>
          </div>
        </template>

        <!--begin::Topbar-->
        <div class="d-flex align-items-stretch flex-shrink-0">
          <KTTopbar></KTTopbar>
        </div>
        <!--end::Topbar-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--end::Container-->
  </div>
  <!--end::Header-->
</template>
 
<script>
import { defineComponent } from "vue";
import KTTopbar from "@/layout/header/Topbar.vue";
import NTMenu from "@/layout/header/Menu.vue";
import { version } from "@/core/helpers/documentation";
import { isDocPage } from "@/core/helpers/documentation";

import {
  headerWidthFluid,
  headerLeft,
  asideDisplay
} from "@/core/helpers/config.ts";

export default defineComponent({
  name: "KTHeader",
  props: {
    title: String
  },
  components: {
    KTTopbar,
    NTMenu
  },
  setup() {
    return {
      isDocPage,
      headerWidthFluid,
      headerLeft,
      asideDisplay,
      version
    };
  }
});
</script>
