import { AfterViewInit, Component, OnInit } from '@angular/core';
import 'grapesjs/dist/css/grapes.min.css';
// @ts-ignore
import * as grapesjs from 'grapesjs';

import { HttpClient } from '@angular/common/http';
import { gridBlocks } from './constant/grid';
import { basicBlocks } from './constant/basic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-grapejs';
  editor: any;
  undoManager: any;
  blockManager: any;
  styleManager: any;
  css: any;
  optionPanel: any;
  previewButton: HTMLInputElement;
  panelManager: any;
  tabPanel: any;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initGrapeJS(this.editor);
    this.addCommand(this.editor);
    this.setBlocks();
    this.addCSS();
  }

  ngAfterViewInit(): void {
    this.previewButton = <HTMLInputElement>(
      document.getElementById('preview-button')
    );
    this.previewButton.onclick = () => {
      this.view();
    };
  }

  initGrapeJS(editor: any) {
    this.editor = grapesjs.init({
      container: '#gjs',
      pluginsOpts: {},
      allowScripts: 1,
      canvas: {
        styles: [
          'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
        ],
        scripts: [
          'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
          'https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js',
          'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js',
          'https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js',
        ],
      },
    });
    this.blockManager = this.editor.BlockManager;
    this.panelManager = this.editor.Panels;
    this.css = this.editor.Css;
    this.optionPanel = this.editor.Panels.getPanel('options');
  }

  setBlocks() {
    gridBlocks.forEach((block) => {
      this.blockManager.add('grid/' + block.name, {
        label: block.name,
        category: 'Grid',
        content: block.code,
        tab: 'content',
      });
    });
    basicBlocks.forEach((block) => {
      this.blockManager.add('basic/' + block.name, {
        label: block.name,
        category: 'Basic',
        content: block.code,
        tab: 'content',
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
    editor.DomComponents.addType('input', {
      isComponent: (el: { tagName: string }) => el.tagName == 'INPUT',
      model: {
        defaults: {
          traits: [
            // Strings are automatically converted to text types
            'name', // Same as: { type: 'text', name: 'name' }
            'placeholder',
            'value',
            'pattern',
            'minlength',
            'maxlength',
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
              label: 'Required',
              name: 'required',
            },
          ],
          attributes: {},
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
    editor.Panels.addButton('options', {
      id: 'clear-button',
      className: 'btn-clear-button',
      label: 'Clear',
      command(editor: any) {
        editor.runCommand('core:canvas-clear');
      },
    });
    this.editor.Panels.addButton('options', {
      id: 'preview-button',
      className: 'btn-preview-button',
      label: 'Save on server',
      attributes: { id: 'preview-button' },
    });
    // this.tabPanel = this.panelManager.addPanel({
    //   id: 'tab-panel',
    //   visible: true,
    //   buttons: [
    //     {
    //       id: 'test-button',
    //       className: 'btn-test-button',
    //       label: 'Save on server',
    //       attributes: { id: 'test-button' },
    //     },
    //   ],
    // });
    // console.log(this.panelManager.getPanel('views'));
    
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
    this.css.addRules(`
    *[data-gjs-highlightable] {
      outline: 1px dashed rgba(170, 170, 170, 0.7);
      outline-offset: -2px;
    }
    `);
  }

  view(): void {
    const html = this.editor.getHtml();
    const css = this.editor.getCss();
    const js = this.editor.getJs();
    this.saveTemplate(html, css, js);
  }

  saveTemplate(html: any, css: any, js: any) {
    this.http.post('http://localhost:5000/save', { html, css, js }).subscribe(
      (res: any) => {
        console.log(res);
        const url = 'http://localhost:5000/preview/' + res._id;
        window.open(url, '_blank');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
