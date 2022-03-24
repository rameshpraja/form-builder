import { Component, OnInit } from '@angular/core';
import 'grapesjs/dist/css/grapes.min.css';
// @ts-ignore
import * as grapesjs from 'grapesjs';
// @ts-ignore
import gjsForms from 'grapesjs-plugin-forms';
// @ts-ignore
import gjsPresentWebpage from 'grapesjs-preset-webpage';

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
      plugins: [gjsPresentWebpage, gjsForms],
      pluginsOpts: {
        [gjsPresentWebpage]: {
          // options
        },
        [gjsForms]: {
          /* ...options */
        },
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
        type: 'form',
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
        content: item[1],
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
