import { Asset } from '@alilc/lowcode-types';
import VueRenderer from '@knxcloud/lowcode-vue-renderer';
import { buildComponents, AssetLoader, noop } from '@knxcloud/lowcode-utils';
import { h, createApp, toRaw, Suspense } from 'vue';

window['__VUE_HMR_RUNTIME__'] = {
  reload: noop,
  rerender: noop,
  createRecord: noop,
};

/**
 * Renders a lowcode schema in the specified container
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.containerId - ID of the container element where the renderer will be mounted
 * @param {Object} options.schema - The lowcode schema to render
 * @param {Array} options.packages - Array of component packages to use (optional)
 * @param {Function} options.onError - Error callback (optional)
 * @returns {Promise<void>}
 */
export async function renderSchema(options: {
  containerId: string;
  schema: any;
  packages?: any[];
  onError?: (error: Error) => void;
}): Promise<void> {
  try {
    const { containerId, schema, packages = [] } = options;
    
    // Prepare components
    const componentsMap: any = {};
    if (schema.componentsMap) {
      schema.componentsMap.forEach((component: any) => {
        componentsMap[component.componentName] = component;
      });
    }

    // Prepare library assets
    const libraryMap = {};
    const libraryAsset: Asset = [];
    packages.forEach(({ package: _package, library, urls, renderUrls }) => {
      libraryMap[_package] = library;
      if (renderUrls) {
        libraryAsset.push(renderUrls);
      } else if (urls) {
        libraryAsset.push(urls);
      }
    });
    
    // Load assets if needed
    if (libraryAsset.length > 0) {
      await new AssetLoader().load(libraryAsset);
    }
    
    // Build components
    const components = await buildComponents(libraryMap, componentsMap);

    // Create and mount the app
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with ID "${containerId}" not found`);
    }

    const app = createApp(() => {
      return h('div', { class: 'lowcode-renderer-container' }, [
        h(Suspense, null, {
          default: () =>
            h(VueRenderer, {
              class: 'lowcode-renderer-content',
              schema: toRaw(schema),
              components: toRaw(components),
            }),
          fallback: () =>
            h('div', { class: 'lowcode-renderer-loading' }, 'loading...'),
        }),
      ]);
    });
    
    app.mount(`#${containerId}`);
    
    return app;
  } catch (error) {
    if (options.onError) {
      options.onError(error as Error);
    } else {
      console.error('Error rendering schema:', error);
    }
    throw error;
  }
}
