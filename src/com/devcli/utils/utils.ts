import * as vscode from "vscode";
import { window, workspace, TextEditor, Uri } from "vscode";
import * as fs from "fs";
import * as path from "path";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import { TerminalSet } from "./terminalSet";

const DEFAULT_PATH = "/src/app";

export class Utils {
  terminalSet: TerminalSet;

  public constructor() {
    this.terminalSet = new TerminalSet();
  }

  /**
   * getTerminalForRootFolder
   */
  public getTerminalForRootFolder(
    workspaceFolder: vscode.WorkspaceFolder
  ): vscode.Terminal {
    return this.terminalSet.getTerminalForRootFolder(workspaceFolder);
  }

  public getRelativePath(args): Observable<[string, vscode.WorkspaceFolder]> {
    const editor = window.activeTextEditor;
    const ws = workspace.workspaceFolders;

    let clickedFolderPath: Uri;
    let rootFolder: vscode.WorkspaceFolder;
    let result:[string, vscode.WorkspaceFolder];

    if (!args && !editor) {
      vscode.window.showErrorMessage(
        "Please open a file first.. or just right-click on a file/folder and use the context menu!"
      );
      result = ["1-ERROR-", rootFolder];
      return Observable.of(result);
    }

    if (args) {
      clickedFolderPath = vscode.Uri.file(args.fsPath);
      if (ws) {
        rootFolder = vscode.workspace.getWorkspaceFolder(clickedFolderPath);
      } else {
        vscode.window.showErrorMessage("Please select a opened project.");
        result = ["1-ERROR-", rootFolder];
        return Observable.of(result);
      }
    } else if (editor) {
      clickedFolderPath = editor.document.uri;
      if (ws) {
        rootFolder = vscode.workspace.getWorkspaceFolder(clickedFolderPath);
      } else {
        vscode.window.showErrorMessage("Please select a opened project.");
        result = ["1-ERROR-", rootFolder];
        return Observable.of(result);
      }
    }

    // if the selected item doesn't have src/app and the project doesn't have src/app folder then error
    let newFolderPath: string = fs
      .lstatSync(clickedFolderPath.fsPath)
      .isDirectory()
      ? clickedFolderPath.fsPath
      : path.dirname(clickedFolderPath.fsPath);
    let srcInx = newFolderPath.indexOf(DEFAULT_PATH);
    if (srcInx == -1) {
      newFolderPath = rootFolder.uri.fsPath.concat(DEFAULT_PATH);
      if (!fs.existsSync(newFolderPath)) {
        vscode.window.showErrorMessage("Please select a opened project.");
        result = ["1-ERROR-", rootFolder];
        return Observable.of(result);
      }
    }
    result = [
      newFolderPath.substring(srcInx + DEFAULT_PATH.length),
      rootFolder];
    return Observable.of(result);
  }
}
