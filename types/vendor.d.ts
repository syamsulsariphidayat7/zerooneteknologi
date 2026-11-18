declare module "isotope-layout" {
  interface IsotopeOptions {
    itemSelector?: string;
    layoutMode?: string;
    filter?: string;
  }
  interface IsotopeArrangeOptions {
    filter?: string;
  }
  class Isotope {
    constructor(element: Element, options?: IsotopeOptions);
    arrange(options?: IsotopeArrangeOptions): void;
    layout(): void;
    destroy(): void;
  }
  export default Isotope;
}

declare module "glightbox" {
  interface GLightboxOptions {
    selector?: string;
    width?: string;
    height?: string;
  }
  interface GLightboxInstance {
    destroy(): void;
  }
  function GLightbox(options?: GLightboxOptions): GLightboxInstance;
  export default GLightbox;
}
