import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "SiloGen INTERNAL Docs",
  tagline: "Custom LLMs made easy.",
  favicon: "img/favicon.ico",
  // with these static dirs we don't get the CNAME file in the build
  staticDirectories: ["static-common"],

  // Set the production url of your site here
  url: "https://internal-docs.services.silogen.ai",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "silogen", // Usually your GitHub org/user name.
  projectName: "internal-docs", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "./internal-docs/docs",
          sidebarPath: "./sidebar-internal.ts",
          routeBasePath: "/",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/silogen/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/silogen-social-card.jpg",
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: "SiloGen",
      logo: {
        alt: "SiloGen Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "internalDocsSidebar",
          position: "left",
          label: "Internal Docs",
        },
        {
          href: "https://www.silo.ai/silogen",
          label: "SiloGen",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",

      copyright: `Copyright © ${new Date().getFullYear()} SiloGen, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
