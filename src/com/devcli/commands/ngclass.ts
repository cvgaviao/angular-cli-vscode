import * as vscode from "vscode";
import { window, workspace, TextEditor, Disposable } from "vscode";
import { ICommand } from "./icommand";
import { Utils } from "./../utils/utils";
import { TerminalSet } from "./../utils/terminalSet";

const CMD_DEFAULT = "ng g class ";

export class NgClass implements ICommand {
  private static utils: Utils;

  public constructor() {
    NgClass.utils = new Utils();
  }

  public regMenuCommand(): Disposable {
    // For Context Menu
    let disposable = vscode.commands.registerCommand(
      "angularcliextension.menu_class",
      args => {
        NgClass.utils.getRelativePath(args).subscribe(
          v => {
            if (v[0] === "1-ERROR-") return;
            vscode.window
              .showInputBox({
                placeHolder: 'name of class (relative to "' + v[0] + '")'
              })
              .then(data => {
                if (data != undefined) {
                  let terminal: vscode.Terminal = NgClass.utils.getTerminalForRootFolder(
                    v[1]
                  );
                  let command = CMD_DEFAULT + v[0] + "/" + data;
                  console.log("calling '" + command + "'");
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
    return disposable;
  }

  public regCommand(): Disposable {
    let disposable = vscode.commands.registerCommand(
      "angularcliextension.class",
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
              .showInputBox({ placeHolder: "name of class" })
              .then(data => {
                if (data != undefined) {
                  console.log("Running angular-cli command...");
                  let terminal: vscode.Terminal = NgClass.utils.getTerminalForRootFolder(
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
