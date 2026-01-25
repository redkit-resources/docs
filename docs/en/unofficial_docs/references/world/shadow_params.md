---
tags:
  - References
  - World
  - Environment
  
status: new

---
# shadowConfig

## CWorldShadowConfig

### numCascades
- **Type**: **Int** [1-4]
- **Description**: Defines the number of cascades in the shadow system. 
Cascaded shadows divide the space into several zones with different shadow resolutions, 
allowing optimization of quality and performance. Objects closest to the camera receive more detailed shadows.

### cascadeRange1 - 4
- **Type**: **Float**
- **Description**: Sets the distance from the camera (in meters) where each shadow cascade ends. 

    Each subsequent cascade must have a larger value than the previous one. For example:

    - cascadeRange1: 8.0 (closest objects)
    - cascadeRange2: 24.0
    - cascadeRange3: 64.0
    - cascadeRange4: 128.0 (distant objects)

### cascadeFilterSize1 - 4
- **Type**: **Float**
- **Description**: Controls the size of the shadow smoothing filter for each cascade. 
Larger values create softer shadows, improving performance. 
It is recommended to increase the values for each subsequent cascade:
    - cascadeFilterSize1: 0.04 (sharp shadows for close objects)
    - cascadeFilterSize2: 0.08
    - cascadeFilterSize3: 0.12
    - cascadeFilterSize4: 0.2 (blurred shadows for distant objects)

### shadowEdgeFade1 - 4
- **Type**: **Float**
- **Description**: Defines the degree of shadow edge blurring for each cascade. 
Helps eliminate aliasing and create more realistic transitions between lit and shaded areas.

### shadowBiasOffsetSlopeMul
- **Type**: **Float**
- **Description**: Multiplier for dynamic adjustment of shadow bias based on surface slope. 
Helps eliminate self-shadowing artifacts on sloped surfaces.

### shadowBiasOffsetConst
- **Type**: **Float**
- **Description**: Constant bias for all shadows. This parameter adjusts the overall shadow bias, 
improving accuracy and eliminating unwanted artifacts.

### shadowBiasOffsetConstCascade1 - 4
- **Type**: **Float**
- **Description**: This parameter overrides the global `shadowBiasOffsetConst` separately for each cascade. 
0 - uses the global parameter.

### speedTreeShadowFilterSize1 - 4
- **Type**: **Float**
- **Description**: Special settings for shadow filter size for vegetation created in SpeedTree. 
Allows precise tuning of shadow quality for foliage and branches.

### speedTreeShadowGradient
- **Type**: **Float**
- **Description**: Controls the shadow gradient transition for SpeedTree vegetation. 
Helps create more natural shading for foliage.

### hiResShadowBiasOffsetSlopeMul
- **Type**: **Float**
- **Description**: Multiplier for slope bias in high-quality shadows. 
Works similarly to `shadowBiasOffsetSlopeMul` but with greater precision.

### hiResShadowBiasOffsetConst
- **Type**: **Float**
- **Description**: Constant bias for high-quality shadows. Analogous to `shadowBiasOffsetConst` with increased precision.

### hiResShadowTexelRadius
- **Type**: **Float**
- **Description**: Defines the texel radius for high-quality shadows. 
Affects the accuracy and detail of shadows for important objects.

### useTerrainShadows
- **Type**: **Bool**
- **Description**: Enables or disables the display of shadows on the terrain. 
Disabling can significantly improve performance but greatly reduce realism.

### terrainShadowsDistance
- **Type**: **Float**
- **Description**: The maximum distance at which terrain shadows are displayed.

### terrainShadowsFadeRange
- **Type**: **Float**
- **Parameter**: The range for smooth fading of terrain shadows. 
Determines how smoothly shadows will fade when reaching `terrainShadowsDistance`.

### terrainShadowsBaseSmoothing
- **Type**: **Float**
- **Description**: The base level of shadow smoothing for the entire terrain. 
Helps reduce shadow graininess on large surfaces.

### terrainShadowsTerrainDistanceSoftness
- **Type**: **Float**
- **Description**: The degree of shadow softening for the terrain based on distance. 
Larger values create softer shadows at a distance.

### terrainShadowsMeshDistanceSoftness
- **Type**: **Float**
- **Description**: Controls the softening of shadows from mesh objects on the terrain based on distance.

### terrainMeshShadowFadeRange
- **Type**: **Float**
- **Description**: Defines the distance range over which shadows from mesh objects will smoothly fade on the terrain.

***
Author: grandvel

*Documentation is maintained by the [REDkit RU](https://discord.gg/kRTEy8KcNa) community members.*

_The translation into English is done using the LLM._
***