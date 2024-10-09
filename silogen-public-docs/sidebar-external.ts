import externalSidebarData from "./external-docs/config/sidebar/index.json";
import { createSidebar } from "./sidebars";

const sidebars = {
  externalDocsSidebar: createSidebar(externalSidebarData),
};

export default sidebars;
