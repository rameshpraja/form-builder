import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import 'grapesjs/dist/css/grapes.min.css';
// @ts-ignore
import * as grapesjs from 'grapesjs';
// @ts-ignore
import gjsPresentWebpage from 'grapesjs-preset-webpage';
//@ts-ignore
import plugin from 'grapesjs-style-bg';

import { formsHtml, inputHTML } from './constant/form';
import { HttpClient } from '@angular/common/http';

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
  css: any;
  optionPanel:any;
  previewButton:HTMLInputElement;
  constructor(private http: HttpClient) {}

  
  ngOnInit(): void {
    this.initGrapeJS(this.editor);
    this.addCommand(this.editor);
    this.addForm();
    this.addCSS();

    
    // this.el.nativeElement.on('click',()=>{ 
    //   alert("test"); 
    // });
  }

  ngAfterViewInit(): void {
    this.previewButton = (<HTMLInputElement>document.getElementById("preview-button"));
    this.previewButton.onclick = () => {
      this.view();
    }
  }

  initGrapeJS(editor: any) {
    this.editor = grapesjs.init({
      container: '#gjs',
      plugins: [plugin],
      pluginsOpts: {
        [plugin]: {},
      },
      allowScripts: 1, 
      canvas: {
        styles: [
          'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
        ],
        scripts: [
          'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
          'https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js',
        ],
      },
    });
    this.blockManager = this.editor.BlockManager;
    this.css = this.editor.Css;
    this.optionPanel = this.editor.Panels.getPanel('options');
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
    .gjs-dashed *[data-gjs-highlightable] {
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

    // this.optionPanel.get('buttons').remove('preview');
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
    const css = this.editor.getCss();
    const js = this.editor.getJs();
    this.save();
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

  save(): void {
    const css =
      this.editor.getCss() +
      `.grid-item{
       border: none !important;
   }`;
  }
}

