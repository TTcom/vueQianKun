function genActiveRule(routerPrefix) {
  return (location) => location.pathname.startsWith(routerPrefix);
}

export default [
  {
    name: "white",
    entry: `/subwhite/`,
    container: "#frame",
    activeRule: genActiveRule("/white"),
  },
  {
    name: "black",
    entry: `/subblack/`,
    container: "#frame",
    activeRule: genActiveRule("/black"),
  },
];
