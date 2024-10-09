interface ItemProps {
  type: string;
  id?: string;
  label?: string;
  link?: {
    type: string;
    id?: string;
  };
  items?: ItemProps[];
  href?: string;
}

export const getDocId = (doc: string): string => {
  return doc
    .replace(/\.mdx?$/, "")
    .split("/")
    .slice(1)
    .join("/");
};

export const getItem = (item: any): ItemProps[] => {
  const type = item["_template"];

  let itemProps: ItemProps = {
    type: type,
  };

  if (type === "doc") {
    if (!item.document) {
      return [];
    }

    itemProps = { ...itemProps, id: getDocId(item.document) };

    if (item.label) {
      itemProps.label = item.label;
    }
  }

  if (type === "category") {
    if (item.title) {
      itemProps.label = item.title;
    }

    if (item.link && item.link !== "none") {
      if (item.link === "doc" && item.docLink) {
        itemProps.link = {
          type: "doc",
          id: getDocId(item.docLink),
        };
      } else if (item.link === "generated") {
        itemProps.link = {
          type: "generated-index",
        };
      } else {
        return [];
      }
    }

    itemProps.items = item.items.flatMap((item: any) => {
      return getItem(item);
    });
  }

  if (type === "link") {
    if (item.href && item.title) {
      itemProps.label = item.title;
      itemProps.href = item.href;
    } else {
      return [];
    }
  }

  return [itemProps];
};

export const createSidebar = (sidebarData: any): ItemProps[] => {
  return sidebarData.items.flatMap((item: any) => {
    return getItem(item);
  });
};
