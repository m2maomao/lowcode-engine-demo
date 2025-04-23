# Lowcode Engine Standalone Renderer

This package provides a standalone renderer for Lowcode Engine schemas, allowing you to render lowcode schemas in your own application without needing to access a Lowcode Engine server.

## Installation

```bash
npm install lowcode-engine-standalone-renderer
```

## Usage

### 1. Include Required Scripts

```html
<!-- Vue 3 Runtime (included in the package) -->
<script src="node_modules/lowcode-engine-standalone-renderer/dist/vue.runtime.global.js"></script>

<!-- Lowcode Vue Renderer (included in the package) -->
<script src="node_modules/lowcode-engine-standalone-renderer/dist/vue-renderer.js"></script>

<!-- Standalone Renderer -->
<script src="node_modules/lowcode-engine-standalone-renderer/dist/standalone-renderer.js"></script>

<!-- Include any component libraries your schema depends on -->
<!-- For example, if using Naive UI components: -->
<script src="https://unpkg.com/naive-ui@2.32.0/dist/index.prod.js"></script>
```

### 2. Create a Container Element

```html
<div id="my-container"></div>
```

### 3. Render Your Schema

```javascript
// Your lowcode schema
const schema = {
  componentName: 'Page',
  props: {},
  children: [
    {
      componentName: 'NText',
      props: {
        children: 'Hello World',
      },
    },
  ],
};

// Component packages if your schema uses custom components
const packages = [
  {
    package: 'naive-ui',
    version: '2.32.0',
    urls: ['https://unpkg.com/naive-ui@2.32.0/dist/index.prod.js'],
    library: 'naive',
  },
];

// Render the schema
window.StandaloneRenderer.renderSchema({
  containerId: 'my-container',
  schema: schema,
  packages: packages,
});
```

## API Reference

### renderSchema(options)

Renders a lowcode schema in the specified container.

#### Options

| Parameter   | Type     | Required | Description                                                    |
| ----------- | -------- | -------- | -------------------------------------------------------------- |
| containerId | string   | Yes      | ID of the container element where the renderer will be mounted |
| schema      | object   | Yes      | The lowcode schema to render                                   |
| packages    | array    | No       | Array of component packages to use                             |
| onError     | function | No       | Error callback function                                        |

## Example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Lowcode Renderer Example</title>
    <script src="node_modules/lowcode-engine-standalone-renderer/dist/vue.runtime.global.js"></script>
    <script src="node_modules/lowcode-engine-standalone-renderer/dist/vue-renderer.js"></script>
    <script src="node_modules/lowcode-engine-standalone-renderer/dist/standalone-renderer.js"></script>
    <script src="https://unpkg.com/naive-ui@2.32.0/dist/index.prod.js"></script>
  </head>
  <body>
    <div id="container"></div>

    <script>
      const schema = {
        componentName: 'Page',
        props: {},
        children: [
          {
            componentName: 'NText',
            props: {
              children: 'Hello from Lowcode Engine!',
            },
          },
        ],
      };

      const packages = [
        {
          package: 'naive-ui',
          version: '2.32.0',
          urls: ['https://unpkg.com/naive-ui@2.32.0/dist/index.prod.js'],
          library: 'naive',
        },
      ];

      window.StandaloneRenderer.renderSchema({
        containerId: 'container',
        schema: schema,
        packages: packages,
      });
    </script>
  </body>
</html>
```

## License

MIT
