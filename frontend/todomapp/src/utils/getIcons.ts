const getIcons = (svgs: __WebpackModuleApi.RequireContext): string[] => {
  const icons: string[] = [];
  const allIconsFilepaths = svgs.keys();
  allIconsFilepaths.forEach((svg, index) => {
    icons.push(svgs(svg).default);
  });
  return icons;
};

export default getIcons;
