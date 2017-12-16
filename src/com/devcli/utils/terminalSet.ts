"use strict";

import * as vscode from "vscode";

let terminals: Map<String, vscode.Terminal>;

export class TerminalSet {
  constructor() {
    terminals = new Map<String, vscode.Terminal>();
  }

  /**
   * getTerminalForRootFolder
   */
  public getTerminalForRootFolder(
    workspaceFolder: vscode.WorkspaceFolder
  ): vscode.Terminal {
    let current: vscode.Terminal;

    current = terminals.get(workspaceFolder.name);

    if (!current) {
      current = vscode.window.createTerminal(
        workspaceFolder.name
      );
      current.sendText('cd ' + workspaceFolder.uri.fsPath);
      terminals.set(workspaceFolder.name, current);
    }
    current.show(true);
    return current;
  }
}
