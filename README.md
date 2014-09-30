# grunt-dom-templates

> The best Grunt plugin ever.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dom-templates --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dom-templates');
```

## The "dom_templates" task

### Overview
The task compiles all you partial html templates into a single js service file. 

```js
grunt.initConfig({
    dom_templates: {
        compile: {
            files: {
                '<%= config.directory.scripts %>/.compiled/templates.js': ['<%= config.directory.templates %>/**/*.html']
            }
        }
    },
    
    watch: {
        dom_templates: {
            files: ['<%= config.directory.templates %>/**/*.html'],
            options: { livereload: true },
            tasks: ['dom_templates:compile']
        }
    },
        
});
```

### Options

There are no options at this time. Simply provide the output file and the source html files.
 
### Usage Examples

```html
<div tpl-name="category-card" class="category" tpl-node-name="content">
    <h1>{ category:name }</h1>
    
    <div class="products">
        <div class ="products__product" rv-each-product="products" rv-on-click="open">
            <h2>{ product:name }</h2>
            <div class="products__product__price"><span>{ product:price | currency }</span></div>
            <div class="products__product__image"><img rv-src="product:image | gallery-img-url" /></div>
            <div class="products__product__details"><button>Details</button></div>
        </div>
    </div>
</div>
```

```js
    var rivetsView = rivets.bind(card.tpl.getRootNode(), {
        category: category,
        products: products.models,
        open: function (event, models) {
            appRouter.navigate(cardUrl('product', { id: models.product.get('id') }));
        }
    });
```

```js
    var rivetsView = rivets.bind(card.tpl.getRootNode(), {
        category: category,
        products: products.models,
        open: function (event, models) {
            appRouter.navigate(cardUrl('product', { id: models.product.get('id') }));
        }
    });
```

```js
require.config({
    paths: {
        'dom-templates': '.compiled/templates'
    }
});
```

```js
require(['dom-templates'], function (tpl) {
    console.log(tpl('category-card').getRootNode());
    console.log(tpl('category-card').getNodeByName('content'));
});
```
 
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.14 first release
