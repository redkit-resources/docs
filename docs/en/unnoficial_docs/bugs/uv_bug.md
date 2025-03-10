---
tags:
  - Bugs
  - Meshes
  - w2mesh
---

# Description

When importing meshes (whether newly exported or new ones) in the editor, thin but very noticeable seams may appear on the texture.

The problem is probably related to incorrect UV unwrapping, which cannot be fixed using the standard tools of the engine editor.

After 7 hours of struggling with a team of 4 people, we found a solution. Yes, it's a workaround, but it works!

![uv_bug_example.webp](../../../assets/images/unnoficial_docs/bugs/uv_bug_example.webp)

## Required Tools

To solve the problem, you will need:

- Blender 3.6 (This specific version is needed for the plugin)
- [Fan-made Blender plugin](https://github.com/dingdio/Witcher3-Blender-Tools)
- [Wolvenkit for Witcher 3](https://github.com/WolvenKit/WolvenKit-7)
- A cup of strong coffee (this may take time)

## Import Workaround

1. Import the FBX into Redkit - it will display incorrectly (with seams) - this is normal!
2. Find the created `.w2mesh` file in your workspace folder
3. In Blender, go to `File` --> `Import` --> `Witcher 3 Assets` --> `Mesh`
4. Specify the path to the found `.w2mesh` file
5. Export it back through `File` --> `Export` --> `Witcher 3 Assets` --> `Mesh`. You will get a JSON file for Wolvenkit
6. Open any project in Wolvenkit
7. Click `File` --> `Add File` and select the created JSON file
8. Right-click on the added file
9. Select **Create cr2w from JSON**
10. After creating the w2mesh file, right-click again and select **Open in File Explorer**
11. Copy the resulting `.w2mesh` file to your workspace
12. Return to REDkit
13. In the Asset Browser, right-click on an empty space
14. Select **Refresh All**
15. Find the updated mesh file
16. Assign shaders and textures manually

***
Authors: sour_gi, x4lva, alicricher, leviofanh

*Documentation is maintained by the [REDkit RU](https://discord.gg/kRTEy8KcNa) community members.*

_The translation into English is done using the LLM._
***