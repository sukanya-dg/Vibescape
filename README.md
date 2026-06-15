# ✨ Vibescape

**Vibescape** is a Visual Studio Code extension that lets you personalize your workspace by uploading and displaying GIFs or images directly inside the Explorer sidebar. It adds a subtle visual space at the bottom of the Explorer, allowing your coding environment to feel more expressive and uniquely yours.

---

## 🎛️ Features

- 🎞️ **Custom GIF & Image Support**
  Upload any `.gif`, `.png`, or `.jpg` file and display it inside VS Code.

- 📍 **Explorer Sidebar Integration**
  Your selected visual appears neatly at the bottom of the Explorer panel without disrupting your workflow.

- 🔄 **Easy Replacement System**
  Quickly change or update your visual anytime using a simple command.

- 💾 **Persistent Storage**
  Remembers your selected GIF/image even after restarting VS Code.

- 🪶 **Lightweight Webview Panel**
  Smooth performance with minimal impact on editor speed.

---

## 📸 Preview

```md
"repository": {
"type": "git",
"url": "https://github.com/sukanya-dg/Vibescape"
}
```

> Add your actual screenshots or GIFs here for best presentation

---

## ⚙️ Requirements

- Visual Studio Code `^1.85.0` or newer
- A local `.gif`, `.png`, or `.jpg` file to display

No external dependencies required.

---

## 🧩 Extension Settings

This extension contributes the following settings:

```json
"vibescape.enabled": true,
"vibescape.mediaPath": "",
"vibescape.loop": true,
"vibescape.fitMode": "contain"
```

| Setting               | Description                                    |
| --------------------- | ---------------------------------------------- |
| `vibescape.enabled`   | Enable or disable Vibescape                    |
| `vibescape.mediaPath` | Path to selected GIF/image file                |
| `vibescape.loop`      | Loop GIF playback (if GIF)                     |
| `vibescape.fitMode`   | Controls how media fits (`contain` or `cover`) |

---

## 🐛 Known Issues

- Very large GIF files may cause minor performance drops
- Some image formats may not render correctly in older VS Code versions
- Explorer layout may slightly shift depending on theme or sidebar width

---

## 🚀 Release Notes

### 1.0.0

- Initial release of Vibescape
- Added support for GIF and image upload
- Integrated Explorer sidebar bottom panel display

---

## 📦 Usage

1. Open Command Palette:

   ```
   Ctrl + Shift + P
   ```

2. Run:

   ```
   Vibescape: Select Media
   ```

3. Choose a `.gif`, `.png`, or `.jpg` file

4. Your selected media appears in the Explorer sidebar 🎉

---

## 🛠️ Development

Clone and run locally:

```bash
git clone https://github.com/your-username/vibescape
cd vibescape
npm install
npm run watch
```

Press `F5` in VS Code to launch Extension Development Host.

---

## 📚 Resources

- [https://code.visualstudio.com/api](https://code.visualstudio.com/api)
- [https://code.visualstudio.com/api/extension-guides/webview](https://code.visualstudio.com/api/extension-guides/webview)

---

## 💙 Vibescape

Turn your VS Code into a more personal, expressive, and visually calming workspace.
