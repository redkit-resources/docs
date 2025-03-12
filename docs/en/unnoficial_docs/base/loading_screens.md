---
tags:
  - Basics
  - Cutscenes
  - usm
---


# Loading Screens

In the engine, there are videos that play when loading a save or transitioning to another world.
They are tied to a specific world and a certain moment in the story.  

But how do they work?

Like all videos in the engine, these are files with the .usm extension. If you're not familiar with them yet, 
it's recommended to check out the [guide on creating USM videos](../../unnoficial_docs/guides/create_usm_video.md) before starting.

All videos for loading screens must be strictly located in the folder:

```
movies\cutscenes\storybook
```

This path is hardcoded, so it cannot be moved to another location.

## How are videos connected to the journal?

Loading videos are tied to entries in the journal, which is located in the storybook section.

Let's see how this looks:

![journal_1.webp](../../../assets/images/unnoficial_docs/base/loading_screens/journal_1.webp)

Among the important parameters here is World.
It determines for which world the video will play.

If a player loads a save from this world or transitions to it,
then when the journal entry is enabled, the specified video plays.

Inside each journal file, there are entries. It's their activation that launches the corresponding video:

![journal_2.webp](../../../assets/images/unnoficial_docs/base/loading_screens/journal_2.webp)

Pay attention to the Video filename parameter.

This is the name of the `.usm` file from the **storybook** folder.
However, the format of the entry might look a bit strange:

```
st_3|2.usm
```

Although the file itself is simply called `st_3.usm`.

This |2 symbol indicates a choice between two voiceover options:

- The standard version contains full voiceover of the story (Add |1 to the file)
- The alternative version includes only part of it (Add |2 to the file)

If you recall the USM guide, there were also 2 voiceover options for one language. This is exactly it.

Thus, you can adapt the content of the video depending on the progression level, expanding the story within a single loading screen.

To change the loading screen, as you might have guessed, you simply need to activate this journal entry from the quest graph.

***
Authors: x4lva, leviofanh

*Documentation is maintained by the [REDkit RU](https://discord.gg/kRTEy8KcNa) community members.*

_The translation into English is done using the LLM._
***
