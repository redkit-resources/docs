---
tags:
  - References
  - World
  - occlusion
  - w3occlusiondef

status: new

---

# Umbra

## Quick Summary

### What is Occlusion?

Occlusion is the process of hiding objects that are not visible to the camera due to being blocked by other objects. 
It is a key technology for rendering optimization: 
Invisible objects are excluded from rendering, which saves resources.

### What is Umbra?
**Umbra** is a technology that manages occlusion and object visibility in 3D space.
It helps determine which objects are visible to the player and which can be excluded from rendering.

**How Umbra Works:**

- Divides the scene into parts 
using spatial structures or special algorithms (e.g., frustum pyramids).
- Analyzes which objects need to be loaded for rendering and which can be skipped.
- Optimizes resources by processing only what is actually needed for display.

### What is Object Streaming?
Object streaming is the process where the game dynamically loads and unloads objects 
based on their visibility and relevance. 
Instead of loading everything at once, the game processes only the elements 
that are within the player’s field of view or nearby.

Streaming uses occlusion to determine which objects should be loaded and which should not.

## umbraScene: [CUmbraScene]

umbraScene is responsible for Umbra parameters. The umbraScene parameter is available for 
[worlds](../../base/world/world.md).

It is a resource (inherited from CResource), occlusion files are stored inside the world folder in `.w3occlusion` files,
and the UmbraScene definition is in `.w3occlusiondef`.
They are generated automatically by the engine and do not require manual modifications.

### CResource
Since it inherits from CResource, it also has fields from CResource (importFile and importFileTimeStamp). 
These fields are non-functional (importing occlusion doesn’t make sense, as it is generated automatically).

### CUmbraScene
#### distanceMultiplier
- **Type**: **Float**
- **Parameter**: Distance multiplier for Umbra streaming.
- **Description**: Determines the coefficient for the distance at which objects
are processed by the Umbra system.

Example: A value of 1.5 means that Umbra will consider objects at
1.5 times the base distance. This can be useful
for levels with distant objects that need to be processed
for occlusion.

Increasing the value affects performance, as
streaming will cover a larger distance.

#### localUmbraOccThresholdMul
- **Type**: **String**
- **Parameter**: Path to the w3simplex file.
- **Description**: Allows specifying a simplex tree for the threshold multiplier of local occlusion areas.

***
Author: grandvel

*Documentation is maintained by the [REDkit RU](https://discord.gg/kRTEy8KcNa) community members.*

_The translation into English is done using the LLM._
***