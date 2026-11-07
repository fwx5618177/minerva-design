// 本包单独做类型检查时使用（使用方一般已有 vite/client 等同类声明；本文件不被源码导入，不会传给使用方）
declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
