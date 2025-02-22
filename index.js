const os = require("os");
const path = require("path");
const fs = require("fs-extra");
const ytdl = require("@distube/ytdl-core");
const inquirer = require("inquirer").default;
const chalk = require("chalk").default;
const ora = require("ora").default;

let downloadPath;

if (os.platform() === "win32") {
  downloadPath = path.join(os.homedir(), "Downloads");
} else if (os.platform() === "darwin") {
  downloadPath = path.join(os.homedir(), "Downloads");
} else if (os.platform() === "linux") {
  downloadPath = path.join(os.homedir(), "Downloads");
} else {
  downloadPath = "/storage/emulated/0/Download/";
}

console.log(chalk.green("✅ Download Folder:"), chalk.cyan(downloadPath));

fs.ensureDirSync(downloadPath);

async function downloadYouTubeVideo() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "url",
        message: "🔗 Enter YouTube video URL:",
        validate: (input) => input.startsWith("http") || "Please enter a valid URL!",
      },
      {
        type: "list",
        name: "format",
        message: "🎬 Select download format:",
        choices: ["Video", "Audio"],
      },
      {
        type: "list",
        name: "quality",
        message: "📽️ Select video quality:",
        choices: ["highest", "1080p", "720p"],
        when: (answers) => answers.format === "Video",
      },
    ]);

    const { url, format, quality } = answers;
    const videoInfo = await ytdl.getInfo(url);
    const title = videoInfo.videoDetails.title.replace(/[<>:"/\\|?*]+/g, "");
    const fileExtension = format === "Video" ? "mp4" : "mp3";
    const fileName = `${title}.${fileExtension}`;
    const filePath = path.join(downloadPath, fileName);
    const formats = videoInfo.formats.map((f) => f.qualityLabel);
    let selectedQuality = quality;

    if (!formats.includes(quality)) {
      console.log(chalk.yellow(`⚠️ Selected quality (${quality}) not available. Downloading at highest quality!`));
      selectedQuality = "highest";
    }

    console.log(chalk.yellow("📂 Estimated File Size: ~50MB (varies by quality)"));
    const spinner = ora("Downloading...").start();
    const stream = ytdl(url, { quality: format === "Video" ? selectedQuality : "highestaudio" });

    stream.pipe(fs.createWriteStream(filePath));

    stream.on("end", () => {
      spinner.succeed(chalk.green(`✅ Download Completed! File saved at: ${filePath}`));
    });

    stream.on("error", (err) => {
      spinner.fail(chalk.red("❌ Download Failed!"));
      console.error(err);
    });
  } catch (error) {
    console.error(chalk.red("❌ Error:"), error.message);
  }
}

downloadYouTubeVideo();