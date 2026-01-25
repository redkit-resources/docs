---
tags:
  - Guide
  - Cutscenes
  - .usm
---

# How to Create Your USM Video

In the engine, you can use video files. They can be called from scenes, they are used when loading the game, when loading a save/location at a specific story moment.

Like many things in **REDkit**, working with video is not the most obvious. The engine uses the **USM (CRI Sofdec2)** format - this is a container that contains video and several audio tracks for different languages.

As usual, the developers did not provide a proper tool for working with this format, so we will use third-party software.

Note that all videos are strictly tied to the **movies** folder, as the paths to them are relative. And for example, loading screens are generally fixed to the `movies/cutscenes/storybook` folder

## Required Tools

### For unpacking USM

- [VGMToolBox](https://sourceforge.net/projects/vgmtoolbox/) - USM unpacker
- [vgmstream](https://github.com/vgmstream/vgmstream) - Audio converter
- [FFmpeg](https://www.ffmpeg.org/) - Universal converter

### For packing USM

- [Scaleform VideoEncoder](https://www.nexusmods.com/witcher3/mods/3505) - USM packer
- [FFmpeg](https://www.ffmpeg.org/) - Universal converter
- **Audacity** (or any other audio editor)

## Unpacking USM

If you need to edit an existing video, you first need to unpack it.

1. Extracting video and audio
    1. Open **VGMToolBox**
    2. Go to **Misc. Tools** --> **Stream Tools** --> **Video Demultiplexer**
    3. In the **Format** list, select **USM (CRI Movie 2)**
    4. Check the **Extract Audio and Video** box
    5. Drag the required files into the empty area

After this, the following will appear in the folder with the original files:

- Video in .m2v format
- Several .adx audio files (according to the number of localizations)

### Audio conversion

The .adx files contain audio tracks. Their names are unclear, but you can determine which language a specific file belongs to by the numbers in the name.

| ID       | Language                                           |
|----------|----------------------------------------------------|
| 40534641 | Root 5.1 track with music and English voiceover    |
| 41534641 | Polish                                             |
| 42534641 | German                                             |
| 44534641 | French                                             |
| 48534641 | Russian                                            |
| 49534641 | Chinese                                            |
| 4A534641 | Japanese                                           |
| 4B534641 | Korean                                             |
| 4C534641 | Portuguese                                         |
| F534641  | Alternative English                                |
| 50534641 | Alternative Polish                                 |
| 51534641 | Alternative German                                 |
| 53534641 | Alternative French                                 |
| 57534641 | Alternative Russian                                |
| 58534641 | Alternative Chinese                                |
| 59534641 | Alternative Japanese                               |

To convert .adx to .wav, we use vgmstream:

1. Launch the console **(WIN + R --> CMD)**
2. Navigate to the **vgmstream** folder with the command:
    ```bash 
    cd C:\\path\to\vgmstream
   ```
3. Enter the command: 
    ```bash 
    vgmstream-cli.exe input_file.adx output_file.wav
    ```

!!! warning "Important!"
    The resulting root 5.1-track (40534641) will have the wrong channel order after conversion.

    You can fix this by remapping in Audacity, or through FFmpeg:

    ```bash
    ffmpeg -i path/to/audio.wav -filter_complex "channelmap=0|1|4|5|2|3" output.wav
    ```

## Packing USM

This is a bit more complicated as it requires file preparation.

### Audio format

The most important audio file is the root file. It contains 5.1 sound (six channels).

Even if you only have stereo, you still need to create empty channels in any audio editor and put the voiceover in the correct channel.

Channel distribution (5.1):

| Name                  | Channel number |
|-----------------------|----------------|
| Left Front (LF)       | 1              |
| Right Front (RF)      | 2              |
| Center (C)            | 3              |
| Subwoofer (LFE)       | 4              |
| Left Surround (LS)    | 5              |
| Right Surround (RS)   | 6              |
 

What does this mean in practice?

- **LF** and **RF** - music
- **LS** and **LS** - ambient sounds
- **C** - voice only, it changes when the language is changed
- **LFE** - practically not used and often empty

Example of correct audio:
![correct_audio.webp](../../../assets/images/unnoficial_docs/guides/create_usm_video/correct_audio.webp)

The remaining audio files are mono tracks containing **voice only**.

!!! warning "Important!"
    - **All audio files** must be in **pcm_s16le** or **pcm_s32le** format
    - **The length of all files** must be **the same** as the root 5.1-file

### File preparation

First, convert the video to **AVI** with maximum quality:

```bash
ffmpeg -i path/to/video.extension -qscale:v 0 video.avi
```

Now prepare the audio files.

Converting root 5.1-audio:

```bash
ffmpeg -i path/to/audio.wav -acodec pcm_s16le -y audio.wav
```

Converting other tracks (mono)

```bash
ffmpeg -i path/to/audio.wav -acodec -ac 1 pcm_s16le -y audio.wav
```

### Packing into USM

Use **Scaleform VideoEncoder**.

1. In the Input Name field, specify the AVI file
2. In Codec, select Sofdec.Prime
3. In the Other Audio section, add all audio files

Place tracks according to the table:

| Track    | Language                                            |
|----------|-----------------------------------------------------|
| Track 0  | Root 5.1 track with music and English voiceover     |
| Track 1  | Polish                                              |  
| Track 4  | French                                              |
| Track 8  | Russian                                             |
| Track 9  | Chinese                                             |
| Track 10 | Japanese                                            |
| Track 11 | Korean                                              |
| Track 12 | Portuguese                                          |
| Track 15 | Alternative English                                 |
| Track 16 | Alternative Polish                                  |
| Track 17 | Alternative German                                  |
| Track 19 | Alternative French                                  |
| Track 23 | Alternative Russian                                 | 
| Track 24 | Alternative Chinese                                 |
| Track 25 | Alternative Japanese                                |

You may notice that the tracks have gaps. This is probably a reserve for languages without voiceover.

If the required localization is not in the list, the engine plays Track 0 with the default voiceover, usually English, but in your mod it might be a different language if it is not localized.

Alternate voiceovers are needed for loading screens. 
They usually have a different version of the file part of the story. 
You can choose in the journal which one to play.

!!! success "Done" 
    After you assign everything, just click the **Encode** button.

## Subtitles

The engine supports built-in subtitles for USM videos, and they are stored in separate text files with the `.subs` extension. These files are located in the **subs** folder, located next to the USM video itself.

### Format

Each subtitle file should be named the same as the video, with the addition of the ISO language code. For example, if you have a video `st_1.usm`, then the subtitle files will look like this:
Subtitles for alternate voiceovers are located in the **altsubs** folder.

```bash
subs/st_1_en.subs  (English subtitles)
subs/st_1_ru.subs  (Russian subtitles)
subs/st_1_de.subs  (German subtitles)
```

### Subtitle file structure

The .subs files use a simple text format. Here's an example:

```yaml linenums="1"
1000
1000, 13100, This bard's tale begins near White Orchard, with my dear friend Geralt of Rivia seeking his lover of yore – the sorceress Yennefer. She'd eluded him for years but now seemed just a few steps ahead.
13200, 20400, After many trials and tribulations, Geralt finally learned that Yen was in nearby Vizima.
```

1. The first line is the global starting point (in milliseconds), from which the timecode countdown begins.
2. Each subsequent line contains three parameters: 
    - The time when the text appears (relative to the global starting point).
    - The time when the text disappears.
    - The subtitle text itself.

**Time is specified in milliseconds!**

***
Author: leviofanh

*Documentation is maintained by the [REDkit RU](https://discord.gg/kRTEy8KcNa) community members.*

_The translation into English is done using the LLM._
***
