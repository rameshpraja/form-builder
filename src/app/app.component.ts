import { Component, OnInit } from '@angular/core';
import 'grapesjs/dist/css/grapes.min.css';
// @ts-ignore
import * as grapesjs from 'grapesjs';
import { formsHtml, inputHTML } from './constant/form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-grapejs';
  editor: any;
  undoManager: any;
  blockManager: any;
  css: any;
  constructor() {}

  ngOnInit(): void {
    this.initGrapeJS(this.editor);
    this.addCommand(this.editor);
    this.addForm();
    this.addCSS();
  }

  initGrapeJS(editor: any) {
    this.editor = grapesjs.init({
      container: '#gjs',
      fromElement: true,
      height: '100vh',
      width: 'auto',
      allowScripts: 1,
      // Disable the storage manager for the moment
      storageManager: false,
      // Avoid any default panel
      panels: {
        defaults: [
          {
            id: 'panel-switcher',
            el: '.panel__switcher',
            buttons: [
              {
                id: 'show-traits',
                active: true,
                label: 'Traits',
                command: 'show-traits',
                togglable: false,
              },
            ],
          },
        ],
      },
      canvas: {
        styles: [],
        scripts: [],
      },
      layerManager: {
        appendTo: '.layers-container',
      },
      traitManager: {
        appendTo: '.traits-container',
      },
      selectorManager: {
        appendTo: '.styles-container',
      },
      // styleManager: {
      //   appendTo: '.styles-container',
      //   sectors: [
      //     {
      //       name: 'Dimension',
      //       open: false,
      //       // Use built-in properties
      //       buildProps: ['width', 'flex', 'font-size'],
      //       // Use `properties` to define/override single property
      //       properties: [
      //         {
      //           // Type of the input,
      //           // options: integer | radio | select | color | slider | file | composite | stack
      //           type: 'integer',
      //           name: 'The width', // Label for the property
      //           property: 'width', // CSS property (if buildProps contains it will be extended)
      //           units: ['px'], // Units, available only for 'integer' types
      //           defaults: 'auto', // Default value
      //           min: 0, // Min value, available only for 'integer' types
      //           max: 100,
      //         },
      //       ],
      //     },
      //     {
      //       name: 'Extra',
      //       open: false,
      //       buildProps: ['background-color', 'box-shadow', 'custom-prop'],
      //       properties: [
      //         {
      //           id: 'custom-prop',
      //           name: 'Custom Label',
      //           property: 'font-size',
      //           type: 'select',
      //           defaults: '32px',
      //           // List of options, available only for 'select' and 'radio'  types
      //           options: [
      //             { value: '12px', name: 'Tiny' },
      //             { value: '18px', name: 'Medium' },
      //             { value: '32px', name: 'Big' },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // },
      blockManager: {
        appendTo: '#blocks',
        blocks: [
          {
            id: 'heading', // id is mandatory
            label: '<b>Heading</b>', // You can use HTML/SVG inside labels
            attributes: {
              class: 'gjs-block-section',
              href: '/test',
            },
            content: `<section>
              <h1 style="text-align: center;margin: 40px auto;">This is a simple title</h1>`,
          },
          {
            id: 'description',
            label: 'Description',
            content:
              '<div data-gjs-type="text" style="text-align: center;margin: 10px auto;">Insert your text here</div>',
          },
          {
            id: 'image',
            label: 'Image',
            select: true,
            content: { type: 'image' },
            activate: true,
          },
          {
            id: 'banner',
            label: 'Banner',
            content: `<style>.banner {
              width: 100%;
              height: 600px;
              background-image: url(https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940);
              background-position: center center;
              background-size: cover;
            }</style></style><div class="banner"></div>`,
          },
        ],
      },
    });
    this.blockManager = this.editor.BlockManager;
    this.css = this.editor.Css;
  }

  addForm() {
    const formSection = formsHtml;
    formSection.forEach((item, i) => {
      this.blockManager.add('form', {
        category: 'form',
        label: item[0],
        content: item[1],
      });
    });
    
    const inputSection = inputHTML;
    inputSection.forEach((item, i) => {
      this.blockManager.add('input' + i, {
        category: 'input',
        label: item[0],
        droppable: 'data-gjs-type="form"',
        content: {
          content: item[1],
          droppable: 'data-gjs-type="form"',
        },
      });
    });
  }

  addCSS() {
    const addedRules = this.css.addRules(`
    *[data-gjs-highlightable] {
      outline: 1px dashed rgba(170, 170, 170, 0.7);
      outline-offset: -2px;
    }
    `);
  }

  addCommand(editor: any) {
    // Define commands
    editor.Commands.add('show-layers', {
      getRowEl(editor: any) {
        return editor.getContainer().closest('.editor-row');
      },
      getLayersEl(row: any) {
        return row.querySelector('.layers-container');
      },

      run(editor: any, sender: any) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = '';
      },
      stop(editor: any, sender: any) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = 'none';
      },
    });
    editor.Commands.add('show-styles', {
      getRowEl(editor: any) {
        return editor.getContainer().closest('.editor-row');
      },
      getStyleEl(row: any) {
        return row.querySelector('.styles-container');
      },

      run(editor: any, sender: any) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = '';
      },
      stop(editor: any, sender: any) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = 'none';
      },
    });
    // Commands
    editor.Commands.add('set-device-desktop', {
      run: (editor: any) => editor.setDevice('Desktop'),
    });
    editor.Commands.add('set-device-mobile', {
      run: (editor: any) => editor.setDevice('Mobile'),
    });
    editor.DomComponents.addType('input', {
      isComponent: (el: { tagName: string }) => el.tagName == 'INPUT',
      model: {
        defaults: {
          traits: [
            // Strings are automatically converted to text types
            'name', // Same as: { type: 'text', name: 'name' }
            'placeholder',
            'value',
            {
              type: 'select', // Type of the trait
              label: 'Type', // The label you will see in Settings
              name: 'type', // The name of the attribute/property to use on component
              options: [
                { id: 'text', name: 'Text' },
                { id: 'email', name: 'Email' },
                { id: 'password', name: 'Password' },
                { id: 'number', name: 'Number' },
                { id: 'button', name: 'Button' },
              ],
            },
            {
              type: 'checkbox',
              name: 'required',
            },
          ],
          // As by default, traits are binded to attributes, so to define
          // their initial value we can use attributes
          attributes: { type: 'text', required: true },
        },
      },
    });
    editor.DomComponents.addType('form', {
      isComponent: (el: { tagName: string }) => el.tagName == 'FORM',
      model: {
        defaults: {
          traits: [
            // Strings are automatically converted to text types
            'action', // Same as: { type: 'text', name: 'name' }
            {
              type: 'select', // Type of the trait
              label: 'Method', // The label you will see in Settings
              name: 'method', // The name of the attribute/property to use on component
              options: [
                { id: 'get', name: 'get' },
                { id: 'post', name: 'post' },
              ],
            },
          ],
          // As by default, traits are binded to attributes, so to define
          // their initial value we can use attributes
          attributes: { type: 'text', required: true },
        },
      },
    });
  }

  setDevice(device: string) {
    console.log(this.editor.DeviceManager.getDevices());
    return this.editor.setDevice(device);
  }

  undo(): void {
    return this.undoManager.undo();
  }

  redo(): void {
    return this.undoManager.redo();
  }

  clear(): void {
    this.editor.runCommand('core:canvas-clear');
  }

  view(): void {
    const html = this.editor.getHtml();
    // const css = this.editor.getCss();
    const css =
      this.editor.getCss() +
      `.grid-item{
     border: none !important;
 }`;
    this.save();
    console.log(html);
    console.log(css);
  }

  save(): void {
    const css =
      this.editor.getCss() +
      `.grid-item{
       border: none !important;
   }`;
  }
}
