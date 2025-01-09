---
tags:
  - References
  - world
  - w2w
    
status: new
---


# World Parameters

This document provides information about world parameters.

[General information about worlds](../../base/world/world.md)


## CWorld
### initialyHiddenLayerGroups
- **Type**: **String**
- **Description**: Reference to an internal CSV file containing information about layers that won’t be loaded when the world starts. 
Such layers are typically used to display world changes during gameplay. 
The file is created and edited automatically. 
Often, there’s no need to specify or edit it manually.

### umbraScene

- **Type**: **Class**[CUmbraScene]
- **Description**: A set of properties responsible for automatic occlusion culling ([Occlusion culling](https://docs.unity3d.com/Manual/OcclusionCulling.html)). 

    The Umbra technology is used. Learn more about Umbra [here](umbra.md).

### pathLib
- **Type**: **Class**[CPathLibWorld]
- **Description**: A list of navigation calculation settings. 
If you want to study navigation in more detail, read [this](pathlib.md) page.

### worldDimension
- **Type**: **Float**
- **Description**: The size of the world.

### shadowConfig
- **Type**: **Class**[CWorldShadowConfig]
- **Description**: A list of shadow settings within the world. 
If you want to study shadow settings in more detail, read [this](shadow_params) page.

### environmentParameters
- **Type**: **Class** [SWorldEnvironmentParameters]
- **Description**: A list of settings for the world’s environment appearance. Very detailed and complex settings.
All settings are located on [this](env_params.md) page.

### soundsBanksDependency
- **Type**: **Array**
- **Description**: An array of references to sound banks that will be applied in this world.

### soundEventsOnAttach
- **Type**: **Array**
- **Description**: An array of sound events triggered when an object or entity is attached to the world.

### soundEventsOnDetach
- **Type**: **Array**
- **Description**: An array of sound events triggered when an object or entity is detached from the world.

### foliageScene
- **Type**: **Class**[CFoliageScene]
- **Description**: Vegetation display parameters.

#### visibilityDepth
- **Type**: **Int**
- **Description**: This parameter sets the rendering depth for vegetation displayed from the camera’s position. 
The value indicates how many vegetation cells will be visible in one direction from the camera’s current position.
The parameter helps improve performance by limiting the amount of vegetation 
that is rendered based on the camera’s distance and viewing angle.

#### editorVisibilityDepth
- **Type**: **Int**
- **Description**: Similar to `visibilityDepth`, but only for the editor.

#### lodSetting
- **Type**: **Static Array**[SFoliageLODSettings]
- **Description**: A static array of Level of Detail (LOD) settings for the world’s vegetation (Foliage).

##### 0-7
- **Type**: **Float**
- **Description**: A quality divisor for each LOD level, where 0 is closest to the camera and 7 is farthest.
The higher the number, the lower the detail quality.

### playGoChunks
- **Type**: **Array**
- **Description**: An array of game chunks tied to this world. 
A chunk in the context of REDkit is a part of the game, more from a scripting perspective. 
As I understand it, this is needed for linking quests to the world 
(for example, when displaying an icon in the quest journal).

Each element in the array represents a list of all available chunks. 
For example: Prologue - Kaer Morchen, Prologue Village, Prologue Wysima, 
Novigrad + No Mans Land - part 1.

### minimapsPath
- **Type**: **String**
- **Description**: Path to the folder containing minimap files. The folder contains generated JPG files of minimap parts.

### gubmapsPath
- **Type**: **String**
- **Description**: Path to the folder containing global map files for the region.

### mergedGeometry
- **Type**: **Class**[CMergedWorldGeometry]
- **Description**: A set of parameters for managing merged geometry, 
which is used for optimization in the game. Learn more about the parameters [here](merged_geometry_params.md).

***
Authors: lxgdark, grandvel

*Documentation is maintained by the [REDkit RU](https://discord.gg/kRTEy8KcNa) community members.*

_The translation into English is done using the LLM._
***
