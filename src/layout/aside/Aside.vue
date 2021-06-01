<template>
  <!--begin::Aside-->
  <div
    id="kt_aside"
    class="aside aside-hoverable"
    :class="[ asideTheme === 'dark' && !isDocPage && 'aside-dark'
    ]"
    data-kt-drawer="true"
    data-kt-drawer-name="aside"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'200px', '300px': '250px'}"
    data-kt-drawer-direction="start"
    data-kt-drawer-toggle="#kt_aside_mobile_toggle"
  >
    <!--begin::Brand-->
    <div class="aside-logo flex-column-auto" id="kt_aside_logo">
      <!--begin::Logo-->
      <a href="#"  >
        <img alt="Logo" :src="darkLogo" class="h-15px logo" />
      </a>
      
      <!--end::Logo-->

      <!--begin::Aside toggler-->
      <div
        id="kt_aside_toggle"
        class="btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle"
        data-kt-toggle="true"
        data-kt-toggle-state="active"
        data-kt-toggle-target="body"
        data-kt-toggle-name="aside-minimize"
        v-if="!isDocPage"
      >
        
      </div>
      <!--end::Aside toggler (side bar toggle)-->
    </div>
    <!--end::Brand-->

    <!--begin::Aside menu-->
    <div class="aside-menu flex-column-fluid">
      <NTMenu></NTMenu>
    </div>
     <div class="menu-content">
    <div
      class="aside-footer flex-column-auto pt-5 pb-7 px-5"
      id="kt_aside_footer"
    >
      
    </div>>
    </div>
    <!--end::Footer-->
  </div>
  <!--end::Aside-->
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated } from "vue";
import { DrawerComponent } from "@/assets/ts/components/_DrawerOptions.ts";
import { ToggleComponent } from "@/assets/ts/components/_ToggleComponent.ts";
import NTMenu from "@/layout/aside/Menu.vue";
import { isDocPage } from "@/core/helpers/documentation";
import { asideTheme } from "@/core/helpers/config.ts";

export default defineComponent({
  name: "KTAside",
  components: {
    NTMenu
  },
  props: {
    lightLogo: String,
    darkLogo: String
  },
  setup() {
    onMounted(() => {
      DrawerComponent.reinitialization();
      ToggleComponent.reinitialization();
    });

    onUpdated(() => {
      ToggleComponent.bootstrap();
    });

    return {
      isDocPage,
      asideTheme
    };
  }
});
</script>
