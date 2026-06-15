import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

class VibescapeProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "vibescapeView";

  private _view?: vscode.WebviewView;

  constructor(private readonly context: vscode.ExtensionContext) {}

  resolveWebviewView(webviewView: vscode.WebviewView) {
    console.log("resolveWebviewView called");
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
    };

    webviewView.onDidChangeVisibility(() => {
      if (webviewView.visible) {
        this.render();
      }
    });

    this.render();
  }

  private render() {
    console.log("render called");
    if (!this._view) {
      console.log("_view undefined");
      return;
    }

    const webviewView = this._view;

    const savedPath = this.context.globalState.get<string>("wallpaperPath");

    console.log("Saved path:", savedPath);

    if (!savedPath) {
      webviewView.webview.html = this.getEmptyHTML();
      return;
    }

    if (!fs.existsSync(savedPath)) {
      console.log("File does not exist:", savedPath);
      webviewView.webview.html = this.getEmptyHTML();
      return;
    }

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.file(path.dirname(savedPath))],
    };

    const mediaUri = webviewView.webview.asWebviewUri(
      vscode.Uri.file(savedPath),
    );

    console.log("Media URI:", mediaUri.toString());

    webviewView.webview.html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: var(--vscode-editor-background);
          }

          .container {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: flex-end;
          }

          img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <img src="${mediaUri}" />
        </div>
      </body>
      </html>
    `;
  }

  private getEmptyHTML() {
    return `
      <!DOCTYPE html>
      <html>
      <body style="
        margin:0;
        height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        font-family:sans-serif;
        background: var(--vscode-editor-background);
        color: var(--vscode-foreground);
      ">
        <h3>No media selected ✨</h3>
      </body>
      </html>
    `;
  }

  public refresh() {
    this.render();
  }
}

export function activate(context: vscode.ExtensionContext) {
  const provider = new VibescapeProvider(context);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      VibescapeProvider.viewType,
      provider,
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vibescape.changeWallpaper", async () => {
      const file = await vscode.window.showOpenDialog({
        canSelectMany: false,
        filters: {
          Images: ["gif", "png", "jpg", "jpeg", "webp"],
        },
      });

      if (!file || file.length === 0) {
        return;
      }

      const selectedPath = file[0].fsPath;

      console.log("Selected:", selectedPath);

      await context.globalState.update("wallpaperPath", selectedPath);

      console.log("Stored:", context.globalState.get("wallpaperPath"));

      await context.globalState.update("wallpaperPath", selectedPath);

      await vscode.commands.executeCommand("workbench.view.explorer");

      provider.refresh();
    }),
  );
}

export function deactivate() {}
