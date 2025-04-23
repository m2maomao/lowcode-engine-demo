# Lowcode Engine Standalone Renderer

This document explains how to integrate the Lowcode Engine renderer into your own application, allowing you to render lowcode schemas without needing to access our server.

## Prerequisites

The standalone renderer requires the following dependencies:

- Vue 3
- Lowcode Vue Renderer

## Integration Steps

### 1. Include Required Scripts

Include the following scripts in your HTML:

```html
<!-- Vue 3 Runtime -->
<script src="https://unpkg.com/vue@3/dist/vue.runtime.global.js"></script>

<!-- Lowcode Vue Renderer -->
<script src="path/to/vue-renderer.js"></script>

<!-- Standalone Renderer -->
<script src="path/to/standalone-renderer.js"></script>
```

You can either host these files on your own server or use CDN links.

### 2. Create a Container Element

Create a container element where the renderer will mount the rendered schema:

```html
<div id="my-container"></div>
```

### 3. Render Your Schema

Use the `renderSchema` function to render your schema:

```javascript
// Your lowcode schema
const schema = {
  componentName: "Page",
  props: {},
  children: [
    {
      componentName: "Text",
      props: {
        content: "Hello World"
      }
    }
  ]
};

// Optional: Component packages if your schema uses custom components
const packages = [
  {
    package: "my-components",
    library: "MyComponents",
    urls: ["path/to/my-components.js", "path/to/my-components.css"]
  }
];

// Render the schema
window.StandaloneRenderer.renderSchema({
  containerId: "my-container",
  schema: schema,
  packages: packages, // Optional
  onError: (error) => console.error(error) // Optional
});
```

## API Reference

### renderSchema(options)

Renders a lowcode schema in the specified container.

#### Options

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| containerId | string | Yes | ID of the container element where the renderer will be mounted |
| schema | object | Yes | The lowcode schema to render |
| packages | array | No | Array of component packages to use |
| onError | function | No | Error callback function |

#### Example

```javascript
window.StandaloneRenderer.renderSchema({
  containerId: "my-container",
  schema: mySchema,
  packages: myPackages,
  onError: (error) => {
    console.error("Failed to render schema:", error);
  }
});
```

## Example

See the `standalone-example.html` file for a complete working example.

## Troubleshooting

### Schema Not Rendering

- Make sure all required scripts are loaded correctly
- Check the browser console for any errors
- Verify that your schema is valid
- Ensure the container element exists in the DOM

### Custom Components Not Working

- Make sure you've included all necessary component packages
- Check that the component names in your schema match the registered components
- Verify that component URLs are accessible
