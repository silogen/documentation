import internalSidebarData from "./internal-docs/config/sidebar/index.json";
import { createSidebar } from "./sidebars";

const sidebars = {
  internalDocsSidebar: createSidebar(internalSidebarData),
};

export default sidebars;
