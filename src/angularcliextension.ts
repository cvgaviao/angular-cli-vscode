'use strict';
import * as vscode from 'vscode'
import { window, workspace, TextEditor,Uri } from 'vscode';
import {NgComponent} from "./com/devcli/commands/ngcomponent";
import {NgDirective} from "./com/devcli/commands/ngdirective";
import {NgPipe} from "./com/devcli/commands/ngpipe";
import {NgEnum} from "./com/devcli/commands/ngenum";
import {NgInterface} from "./com/devcli/commands/nginterface";
import {NgService} from "./com/devcli/commands/ngservice";
import {NgClass} from "./com/devcli/commands/ngclass";
import {NgModule} from "./com/devcli/commands/ngmodule";
import {Observable} from 'rxjs/Observable';

import {Utils} from "./com/devcli/utils/utils";
import {TerminalSet} from "./com/devcli/utils/terminalSet";



export function activate(context: vscode.ExtensionContext) {

    // let terminal:vscode.Terminal = vscode.window.createTerminal("ng-build");
    // let activity_terminal:vscode.Terminal = vscode.window.createTerminal("ng");
    // terminal.show(true);


    // vscode.commands.registerCommand('angularcliextension.ngnew', (args) => {
    //     vscode.window.showInputBox({ placeHolder: 'name of your project'}).then(
    //         (data) => {
    //                 terminal.sendText("ng new "+data);
    //                 /*let uri = Uri.parse('file://'+workspace.rootPath+"/"+data);
    //                 setInterval( function(){
    //                     console.log(uri,workspace);
    //                     vscode.commands.executeCommand('vscode.openFolder', uri);
    //                     //terminal.sendText("npm install");
    //                 },10000); */
                   
    //             }
    //     )   
    // });

    // vscode.commands.registerCommand('angularcliextension.serve', () => {
    //     terminal.sendText("ng serve");
    // });

    context.subscriptions.push(new NgComponent().regCommand());
    context.subscriptions.push(new NgComponent().regMenuCommand());
    
    context.subscriptions.push(new NgDirective().regCommand());
    context.subscriptions.push(new NgDirective().regMenuCommand());

    context.subscriptions.push(new NgPipe().regCommand());
    context.subscriptions.push(new NgPipe().regMenuCommand());

    context.subscriptions.push(new NgService().regCommand());
    context.subscriptions.push(new NgService().regMenuCommand());
        
    context.subscriptions.push(new NgClass().regCommand());
    context.subscriptions.push(new NgClass().regMenuCommand());

    context.subscriptions.push(new NgInterface().regCommand());
    context.subscriptions.push(new NgInterface().regMenuCommand());

    context.subscriptions.push(new NgEnum().regCommand());
    context.subscriptions.push(new NgEnum().regMenuCommand());

    context.subscriptions.push(new NgModule().regCommand());
    context.subscriptions.push(new NgModule().regMenuCommand());


    // vscode.commands.registerCommand('angularcliextension.build', () => {
    //     vscode.window.showQuickPick([
    //         "",
    //         "--target=production --environment=prod",
    //         "--prod --env=prod",
    //         "--prod",
    //         "--target=development --environment=dev",
    //         "--dev --e=dev",
    //         "--dev"
    //         ]).then(
    //         (data) => {
    //                terminal.sendText("ng build "+data);
    //             }
    //     )
        
    // });

    // vscode.commands.registerCommand('angularcliextension.test', () => {
    //     terminal.sendText("ng test");
    // });

    // vscode.commands.registerCommand('angularcliextension.e2e', () => {
    //     terminal.sendText("ng e2e");
    // });

}

// this method is called when your extension is deactivated
export function deactivate(args) {
    
}


