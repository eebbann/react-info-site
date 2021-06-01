import {
  MenuComponent,
  DrawerComponent,
  ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  ToggleComponent
} from "@/assets/ts/components";
import Theme from "@/assets/ts/_utils/_Theme";

/**
 
 */
Theme.init();
setTimeout(() => {
  ToggleComponent.bootstrap();
  ScrollComponent.bootstrap();
  ScrollTopComponent.bootstrap();
  DrawerComponent.bootstrap();
  StickyComponent.bootstrap();
  MenuComponent.bootstrap();
}, 0);
