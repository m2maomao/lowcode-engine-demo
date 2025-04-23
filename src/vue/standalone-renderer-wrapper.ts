import { renderSchema } from './standalone-renderer';

// Expose the renderer to the global scope
(window as any).StandaloneRenderer = {
  renderSchema
};

export { renderSchema };
