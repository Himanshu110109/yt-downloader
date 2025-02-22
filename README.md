Here’s your README file formatted with proper headings, code blocks, and a professional structure:

```markdown
# 🎬 YouTube Video Downloader CLI

A simple command-line tool to download YouTube videos and audio in different qualities effortlessly.

---

## ✨ Features

- ✅ Download YouTube Videos in different qualities (1080p, 720p, highest)
- ✅ Download Audio Only (MP3 format)
- ✅ Interactive CLI with user-friendly prompts
- ✅ Shows Estimated File Size before download
- ✅ Saves Files Automatically to:  
  `/storage/emulated/0/Download/`

---

## 📌 Installation

### 🔹 Global Installation (Recommended for CLI Use)

To install the package globally, run:

```bash
npm install -g your-package-name
```

Now you can use it anywhere with:

```bash
youtube-downloader
```

---

### 🔹 Running Without Installation (Using `npx`)

If you don’t want to install it globally, run directly using `npx`:

```bash
npx your-package-name
```

---

### 🔹 Running Locally (For Development or Manual Use)

1️⃣ Clone the repository:

```bash
git clone https://github.com/Himanshu110109/yt-downloader.git
cd yt-downloader
```

2️⃣ Install dependencies:

```bash
npm install
```

3️⃣ Run the script:

```bash
node index.js
```

---

## 📚 Usage Example

When you run the command, you will be asked to enter a YouTube video URL, select the format (video/audio), and choose the quality.

```bash
youtube-downloader
```

or

```bash
node index.js
```

or

```bash
npx your-package-name
```

You will see interactive prompts like this:

```
🔗 Enter YouTube video URL: https://www.youtube.com/watch?v=xyz123  
🎬 Select download format: (video/audio)  
🎬 Select video quality: (highest/1080p/720p)  
📂 Estimated File Size: 50 MB  
📥 Do you want to continue with the download? (Y/n)
```

✅ The downloaded file will be saved in:

```
/storage/emulated/0/Download/
```

---

## 🛠 Dependencies

This package uses:

- `@distube/ytdl-core` – for video/audio downloading
- `inquirer` – for interactive prompts
- `chalk` – for colored terminal output
- `ora` – for loading spinners
- `fs-extra` – for file system operations

---

## 🤝 Contribution

If you find any bugs or have feature suggestions, feel free to open an issue or submit a pull request! 😃

🔗 GitHub Repo: [https://github.com/Himanshu110109/yt-downloader](https://github.com/Himanshu110109/yt-downloader)

---

## 📜 License

📝 **Apache 2.0 License** – Free to use & modify!

---

## 🔥 Created by Himanshu Chandani

---