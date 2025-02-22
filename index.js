#!/usr/bin/env node

const ytdl = require("@distube/ytdl-core");
const inquirer = require("inquirer").default;
const fs = require("fs-extra");
const chalk = require("chalk").default;
const ora = require("ora").default;
const path = require("path");

const getVideoSize = async (url, quality) => {
    const info = await ytdl.getInfo(url);
    
    let format = info.formats.find(f => f.qualityLabel === quality && f.contentLength);

    if (!format) {
        format = info.formats.find(f => f.contentLength);
    }

    if (!format || !format.contentLength) {
        return "Unknown";
    }

    const sizeInMB = (parseInt(format.contentLength) / (1024 * 1024)).toFixed(2);
    return sizeInMB;
};

const downloadVideo = async (url, format, quality) => {
    if (!ytdl.validateURL(url)) {
        console.log(chalk.red("❌ Invalid YouTube URL!"));
        return;
    }

    const info = await ytdl.getInfo(url);
    const availableQualities = info.formats
        .map(f => f.qualityLabel)
        .filter(q => q !== null && q !== undefined);

    //console.log("📌 Available Qualities:", availableQualities);

    if (!availableQualities.includes(quality)) {
        console.log(chalk.red(`❌ Selected quality (${quality}) not available, choosing best available...`));
        quality = "highest";
    }

    const title = info.videoDetails.title.replace(/[<>:"/\\|?*]+/g, "");
    const extension = format === "video" ? "mp4" : "mp3";
    const filePath = path.join("/storage/emulated/0/Download/", `${title}.${extension}`);

    // Get video size before download
    const fileSize = await getVideoSize(url, quality);
    console.log(chalk.blue(`📂 Estimated File Size: ${fileSize} MB`));

    const spinner = ora("⏳ Downloading started...").start();

    const stream = ytdl(url, {
        quality: availableQualities.includes(quality) ? quality : "highest",
        filter: "videoandaudio"
    });

    stream.pipe(fs.createWriteStream(filePath));

    stream.on("end", () => {
        spinner.succeed("✅ Download complete!");
        console.log(`📂 Saved to: ${filePath}`);
    });

    stream.on("error", (error) => {
        spinner.fail("❌ Download failed");
        console.error(error);
    });
};

inquirer
    .prompt([
        {
            type: "input",
            name: "url",
            message: ("🔗 Enter YouTube video URL:"),
        },
        
        {
            type: "list",
            name: "format",
            message: ("🎬 Select download format:"),
            choices: ["video", "audio"],
        },
                
        {
            type: "list",
            name: "quality",
            message: ("🎬 Select video quality:"),
            choices: ["highest", "1080p", "720p"],
           when: (answers) => answers.format === "video",
           
        },
    ])
    .then(async (answers) => {

        const fileSize = await getVideoSize(answers.url, answers.quality);
        console.log(chalk.green(`📂 Estimated File Size: ${fileSize} MB`));

        const confirm = await inquirer.prompt([
            {
                type: "confirm",
                name: "proceed",
                message: `📥 Do you want to continue with the download (${fileSize} MB)?`,
                default: true
            }
        ]);

        if (confirm.proceed) {
            downloadVideo(answers.url, answers.format, answers.quality);
        } else {
            console.log(chalk.yellow("🚫 Download canceled."));
        }
    })
    .catch((error) => {
        console.error("❌ Error: ", error);
    });