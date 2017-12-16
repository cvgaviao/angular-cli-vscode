import * as vscode from "vscode";
import { window, workspace, TextEditor, Disposable } from "vscode";
import { ICommand } from "./icommand";
import { Utils } from "./../utils/utils";
import { TerminalSet } from "./../utils/terminalSet";

const CMD_DEFAULT = "ng g component ";

export class NgComponent implements ICommand {
  private static utils: Utils;

  public constructor() {
    NgComponent.utils = new Utils();
  }

  public regMenuCommand(): Disposable {
    // For Context Menu
    let disposable = vscode.commands.registerCommand(
      "angularcliextension.menu_component",
      args => {
        NgComponent.utils.getRelativePath(args).subscribe(
          v => {
            if (v[0] === "1-ERROR-") return;
            vscode.window
              .showInputBox({
                placeHolder: 'name of component (relative to "' + v[0] + '"'
              })
              .then(data => {
                if (data != undefined) {
                  let terminal: vscode.Terminal = NgComponent.utils.getTerminalForRootFolder(
                    v[1]
                  );
                  let command = CMD_DEFAULT + v[0] + "/" + data;
                  console.info("calling '" + command + "'");
                  terminal.sendText(command);
                }
              });
          },
          e => {
            vscode.window.showErrorMessage(e);
          },
          () => {}
        );
      }
    );
    vscode.commands.executeCommand(
      "workbench.files.action.refreshFilesExplorer"
    );
    return disposable;
  }

  public regCommand(): Disposable {
    let disposable = vscode.commands.registerCommand(
      "angularcliextension.component",
      args => {
        const selectedWorkspaceFolder = vscode.window.showWorkspaceFolderPick();
        if (selectedWorkspaceFolder == undefined) {
          vscode.window.showErrorMessage(
            "You need to select a valid project..."
          );
          return;
        }
        selectedWorkspaceFolder.then(
          function(value) {
            vscode.window
              .showInputBox({
                placeHolder:
                  "name of component (Note - #components support relative path generation)"
              })
              .then(data => {
                if (data != undefined) {
                  console.log("Running angular-cli command...");
                  let terminal: vscode.Terminal = NgComponent.utils.getTerminalForRootFolder(
                    value
                  );
                  terminal.sendText(CMD_DEFAULT + "/" + data);
                }
              });
          },
          function() {
            console.log("Failure while running a angular-cli command");
          }
        );
      }
    );
    return disposable;
  }
}
