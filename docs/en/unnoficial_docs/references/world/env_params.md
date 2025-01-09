---
tags:
  - References
  - World
  - Environment
  
status: new

---

# environmentParameters

This page describes the global environment parameters for the world. 

This part of the engine contains many subtle settings, most of which 
are of an **advanced technical nature**.
And they are usually **not changed** for most worlds.

The most complex settings to configure are `speedTreeParameters`, `lensFlare`, and `renderSettings`. 
Changing these parameters requires a deep understanding of the rendering system. 
Their descriptions are aimed at **advanced users**, 
who want to significantly alter the visual perception of the world.

For basic configuration, changing a few **main** parameters based on examples from existing worlds is sufficient.

## SWorldEnvironmentParameters

### vignetteTexture
- **Type**: **Resource** [CBitmapTexture]
- **Description**: Specifies the texture for creating the 
[vignetting](https://en.wikipedia.org/wiki/Vignetting) effect.
(darkening the edges of the screen).

### cameraDirtTexture
- **Type**: **Resource** [CBitmapTexture]
- **Description**: Specifies the texture that creates the camera lens dirt effect. 
The effect is especially noticeable under bright lighting.

### interiorFallbackAmbientTexture 
- **Type**: **Resource** [CCubeTexture]
- **Description**: A fallback cubemap texture for ambient lighting 
in interiors. Used by the lighting system as a backup when 
correct lighting is missing. (Not used in any CDPR worlds)

### interiorFallbackReflectionTexture
- **Type**: **Resource** [CCubeTexture]
- **Description**: A fallback cubemap texture for reflections in interiors.
(Not used in any CDPR worlds)

### globalLightingTrajectory {.collapsed}
- **Type**: **Class**[CGlobalLightingTrajectory]
- **Description**: A set of parameters for configuring the behavior of global light sources (sun and moon) in the world.

#### yawDegrees
- **Type**: **Float**  
- **Description**: The base angle (azimuth) for all light sources in degrees. Specified in degrees.
This parameter defines the main direction of light and serves as the starting point for calculating the positions of the sun and moon.

#### yawDegreesSunOffset
- **Type**: **Float** 
- **Description**: Additional azimuth offset for the sun relative to the base angle `yawDegrees`.
Allows further adjustment of the sun's azimuth.

#### yawDegreesMoonOffset
- **Type**: **Float** 
- **Description**: Similar to the `yawDegreesSunOffset` parameter, but applied to the moon.

#### sunCurveShiftFactor
- **Type**: **Float** 
- **Description**: Time shift factor for the solar cycle.
Positive values increase the duration of daylight, 
shifting sunrise and sunset to a later time. Negative values 
shorten the day. Applied after calculating all curves, allowing 
time adjustment without changing the shape of the lighting curves.

#### moonCurveShiftFactor
- **Type**: **Float** 
- **Description**: Similar to `sunCurveShiftFactor`, but for the moon.

#### sunSqueeze 
- **Type**: **Float**
- **Description**: Time cycle compression factor for the sun.
Affects the interpolation of the time of day, creating sharper or smoother changes.

    ??? abstract "More about time compression"
        How does time "compression" work?
 
        The principle is based on a mathematical formula:

        $$
        t = (t - t_\mathrm{ref}) \cdot \text{sunSqueeze} + t_\mathrm{ref}
        $$
        
        Where:

        - t: current time
        - t_ref: reference time point (combination of current time, curve value, and offset modifier)
        - sunSqueeze: compression factor

        For values less than 1.0, the cycle is stretched:

        - Sunrise and sunset become smoother and longer
        - The sun stays low on the horizon longer
        - Transitions between day phases become "softer"

        For values greater than 1.0, the cycle is compressed:

        - Sunrise and sunset become sharper and faster
        - The sun spends more time at its zenith
        - Transitions between day phases become more dynamic

#### moonSqueeze 
- **Type**: **Float**
- **Description**: Similar to `sunSequeeze`, but for the moon.

#### sunHeight
- **Type**: **Curve**
- **Description**: A curve defining the sun's height above the horizon throughout 
the day. Allows precise tuning of the sun's trajectory.

#### moonHeight
- **Type**: **Curve**
- **Description**: Similar to `sunHeight`, but for the moon.

#### lightHeight
- **Type**: **Curve**
- **Description**: A curve controlling the height of the main light source. 
Used by the rendering system to calculate shadow direction and overall 
light intensity in the world.

#### lightDirChoice 
- **Type**: **Curve**
- **Description**: A curve defining the transition between solar and lunar lighting.  
The value determines which light source (sun or moon) is dominant at a given time. 
Controls the smoothness of day-night transitions, determining the intensity of each light source and twilight time.

#### skyDayAmount
- **Type**: **Curve**
- **Description**: A curve controlling the intensity of daylight throughout the day.

#### moonShaftsBeginHour
- **Type**: **Float**
- **Description**: The start time for the moon shaft effect. 
Creates a faint glow around the moon. 
The effect manifests as a slight increase in moonlight intensity.

#### moonShaftsEndHour
- **Type**: **Float**
- **Description**: The end time for the moon shaft effect.

### toneMappingAdaptationSpeedUp
- **Type**: **Float**
- **Description**: Defines the adaptation speed of the tone mapping system 
when transitioning from dark to bright scenes. Higher values speed up 
camera adaptation to bright light, mimicking the human eye's behavior.

### toneMappingAdaptationSpeedDown
- **Type**: **Float**
- **Description**: Controls the adaptation speed when transitioning from bright to 
dark scenes. This parameter allows you to adjust how quickly the "camera's eye" 
adjusts to darkness.

### environmentDefinition
- **Type**: **Resource** [CEnvironmentDefinition]
- **Description**: Specifies the path to the environment definition file 
used as the default for this world.
The file contains complex settings for environmental effects and weather phenomena. 
Env is a separate complex component of the engine that will be covered separately in the future.

### scenesEnvironmentDefinition
- **Type**: **Resource** [CEnvironmentDefinition]
- **Description**: Specifies the path to the environment definition file 
that will be used by default for scenes.

### speedTreeParameters {.collapsed}
- **Type**: **Struct**[SGlobalSpeedTreeParameters]
- **Description**: A set of parameters for configuring the behavior and appearance of vegetation in the world.

#### alphaScalar3d
- **Type**: **Float**
- **Description**: Global transparency multiplier for all 3D 
vegetation in the world.

#### alphaScalarGrassNear
- **Type**: **Float**
- **Description**: Transparency multiplier for grass in the near zone from the camera. 
Increasing the value makes grass more transparent up close, which can help 
avoid visual artifacts and improve performance.

#### alphaScalarGrass
- **Type**: **Float**
- **Description**: Transparency multiplier for grass at long distances. 
Higher values improve grass visibility at a distance.

#### alphaScalarGrassDistNear
- **Type**: **Float**
- **Description**: Defines the minimum distance from the camera at which 
the grass transparency effect begins.

#### alphaScalarGrassDistFar
- **Type**: **Float**
- **Description**: Sets the maximum distance for applying the 
grass transparency effect.

#### alphaScalarBillboards
- **Type**: **Float**
- **Description**: Controls the transparency of 2D vegetation sprites 
(billboards) that automatically face the camera. Affects how 
visible the simplified version of vegetation will be at a 
distance.

#### billboardsGrainBias
- **Type**: **Float**
- **Description**: Adjusts the base texture offset for vegetation billboards. 
Lower values make the texture sharper, while higher values create a blur effect.

#### billboardsGrainAlbedoScale
- **Type**: **Float**
- **Description**: Controls the intensity of texture grain for billboards. 
Allows you to adjust how noticeable texture details will be.

#### billboardsGrainNormalScale
- **Type**: **Float**
- **Description**: Defines the scale of the normal map for billboard textures. 
Affects how light interacts with the vegetation surface, 
changing the perception of relief and detail.

#### billboardsGrainClipScale
- **Type**: **Float**
- **Description**: Controls the scale of texture grain clipping, 
which affects visual effects when vegetation appears or disappears.

#### billboardsGrainClipBias
- **Type**: **Float**
- **Description**: Sets the base offset for texture grain clipping of billboards. 
Affects how vegetation gradually appears or 
disappears as the distance to the camera changes.

#### billboardsGrainClipDamping
- **Type**: **Float**
- **Description**: Defines the degree of smoothing for the transition of texture 
grain in billboards as the distance from the camera changes. Helps create smoother 
visual transitions.

#### grassNormalsVariation
- **Type**: **Float**
- **Description**: Controls the degree of random deviation of grass normals. 
Higher values create more natural interaction of grass 
with light and diversify its appearance when moving.

### weatherTemplate
- **Type**: **Float** [C2dArray]
- **Description**: Specifies the path to a CSV file that defines the configuration 
of weather conditions in the world. The file contains settings for weather effects and paths 
to .env environment files. These will be covered separately in the documentation about env.

### disableWaterShaders
- **Type**: **Bool**
- **Description**: This parameter controls the rendering of water shaders in the level. 
If set to `true`, all global water effects in this level will be disabled.
This improves performance but significantly degrades the quality of water in the world.

### skybox {.collapsed}
- **Type**: **Struct**[SWorldSkyboxParameters]
- **Description**: A set of parameters for configuring the skybox.

#### sunMesh
- **Type**: **Resource**[CMesh]
- **Description**: This parameter specifies the 3D model of the sun that will be displayed in the skybox.

#### sunMaterial
- **Type**: **Class**[CMaterialInstance]
- **Description**: Configuration of the sun's material from the material graph.

##### Material Instance / baseMaterial
- **Type**: **Resource**[CMaterialGraph]
- **Description**: Sets the material (**w2mg**) for the 3D model of the sun.

#### moonMesh
- **Type**: **Resource**[CMesh]
- **Description**: This parameter specifies the 3D model of the moon that will be displayed in the skybox.

#### moonMaterial
- **Type**: **Class**[CMaterialInstance]
- **Description**: Configuration of the moon's material from the material graph. Similar to `sunMaterial`.

#### skyboxMesh
- **Type**: **Resource**[CMesh]
- **Description**: This parameter specifies the 3D model of the sky that will be displayed in the skybox.

#### skyboxMaterial
- **Type**: **Class**[CMaterialInstance]
- **Description**: Configuration of the sky's material from the material graph. Similar to `sunMaterial`.

#### cloudsMesh
- **Type**: **Resource**[CMesh]
- **Description**: This parameter specifies the 3D model of clouds that will be displayed in the skybox.

#### cloudsMaterial
- **Type**: **Class**[CMaterialInstance]
- **Description**: Configuration of the clouds' material from the material graph. Similar to `sunMaterial`.

### lensFlare {.collapsed}
- **Type**: **Struct**[SLensFlareGroupsParameters]
- **Description**: A set of parameters responsible for lens flares.

#### default
- **Type**: **Struct**[SLensFlareParameters]
- **Description**: Parameters for default lens flares.

##### nearDistance
- **Type**: **Float**
- **Description**: This value sets the minimum distance 
at which lens flares from sunlight begin to appear. 
The smaller this value, the closer to the camera the effect will appear.

##### nearRange
- **Type**: **Float**
- **Description**: This parameter specifies the range of the effect at close distances, 
i.e., how strongly the lens flares will spread at close distances from the light source (sun).

##### farDistance
- **Type**: **Float**
- **Description**: Specifies the maximum distance at which the lens flare effect from the sun can be visible. 
Higher values mean the effect will spread to distant objects or areas.

##### farRange
- **Type**: **Float**
- **Description**: This parameter controls the range of lens flares at long distances. 
The higher the value, the wider the lens flare will spread at long distances.

##### sun
- **Type**: **Struct**[SLensFlareParameters]
- **Description**: Parameters for sun lens flares.

##### moon
- **Type**: **Struct**[SLensFlareParameters]
- **Description**: Parameters for moon lens flares.

##### custom0 - 5
- **Type**: **Struct**[SLensFlareParameters]
- **Description**: Custom lens flare parameters, not entirely clear where they are used.

### renderSettings {.collapsed}
- **Type**: **Struct**[SWorldRenderSettings]
- **Description**: A set of global parameters responsible for rendering in the game world.

#### cameraNearPlane
- **Type**: **Float**
- **Description**: This parameter defines the distance from the camera at which object rendering begins. 
Smaller values allow the camera to see objects that are very close.

#### cameraFarPlane
- **Type**: **Float**
- **Description**: Sets the maximum distance at which the camera will render objects. 
Objects beyond this limit will not be visible.

#### ssaoBlurEnable:
- **Type**: **Bool**
- **Description**: Enables the blur effect for [SSAO](https://learnopengl.com/Advanced-Lighting/SSAO).

#### ssaoNormalsEnable
- **Type**: **Bool**
- **Description**: Enables the use of [normal maps](https://learnopengl.com/Advanced-Lighting/Normal-Mapping) 
for SSAO, improving the quality and realism of the occlusion effect.

#### envProbeSecondAmbientFilterSize
- **Type**: **Float**
- **Description**: This parameter adjusts the filter size for secondary ambient lighting, 
applied to smooth surfaces (e.g., skin), improving their visualization.

#### fakeCloudsShadowSize
- **Type**: **Float**
- **Description**: Controls the size of the shadow from artificial clouds. 
Smaller values create smaller and more detailed shadows.

#### fakeCloudsShadowSpeed
- **Type**: **Float**
- **Description**: This parameter defines the speed of the artificial cloud shadow movement, 
affecting the rate of lighting changes.

#### fakeCloudsShadowTexture
- **Type**: **Resource**[CTextureArray]
- **Description**: Parameter specifying the texture array for artificial cloud shadows.
The array contains several textures for different clouds.

#### bloomLevelsRange
- **Type**: **UInt**[0-7]
- **Description**: Sets the number of levels for the "bloom" effect, 
which blurs bright light sources, creating a glowing effect.

#### bloomLevelsOffset
- **Type**: **UInt**
- **Description**: Defines the base offset for the bloom effect levels, affecting how 
noticeable the glow effect will be at different brightness levels.

#### bloomScaleConst
- **Type**: **Float**
- **Description**: Global scale factor for the bloom effect. 
This value affects the intensity of the glow.

#### bloomDownscaleDivBase
- **Type**: **Float**
- **Description**: Controls the degree of resolution reduction when calculating the bloom effect. 
Affects performance and glow quality.

#### bloomDownscaleExpBase
- **Type**: **Float**
- **Description**: Sets the exponential reduction in resolution for the bloom effect, 
allowing precise tuning of the balance between quality and performance.

#### bloomLevelScale0 - 7
- **Type**: **Float**
- **Description**: Parameters for fine-tuning the scaling of the glow effect at each brightness level, 
allowing for natural glow distribution.

#### bloomPrecision
- **Type**: **Float**
- **Description**: Defines the precision of calculations for the bloom effect, affecting the quality and realism 
of the resulting glow.

#### shaftsLevelIndex
- **Type**: **UInt**
- **Description**: Sets the base intensity level for light shafts (e.g., light rays penetrating through windows).

#### shaftsIntensity
- **Type**: **Float**
- **Description**: Defines the intensity of light shafts.

#### shaftsThresholdsScale
- **Type**: **Float**
- **Description**: Scales the threshold values for light shaft effects, affecting their visibility and intensity.

#### fresnelScaleLights
- **Type**: **Float**
- **Description**: Controls the scaling of the [Fresnel effect](https://www.dorian-iten.com/fresnel/) 
for light sources, affecting reflections and refractions.

#### fresnelScaleEnvProbes
- **Type**: **Float**
- **Description**: Scales the Fresnel effect for environment and environment probes, improving reflection realism.

#### fresnelRoughnessShape
- **Type**: **Float**
- **Description**: Adjusts the roughness shape of the Fresnel effect, 
used for various materials (e.g., water, glass).

#### interiorDimmerAmbientLevel
- **Type**: **Float**
- **Description**: Defines the degree of ambient lighting dimming for interiors.

#### interiorVolumeSmoothExtent
- **Type**: **Float**
- **Description**: Controls the smoothing scale for volumetric effects inside interiors.

#### interiorVolumeSmoothRemovalRange
- **Type**: **Float**
- **Description**: Sets the range for removing smoothing effects in interior volumetric data.

#### interiorVolumesFadeStartDist
- **Type**: **Float**
- **Description**: Defines the distance at which the fading of volumetric effects in interiors begins.

#### interiorVolumesFadeRange
- **Type**: **Float**
- **Description**: Controls the fade range of effects inside interiors.

#### interiorVolumesFadeEncodeRange
- **Type**: **Float**
- **Description**: Sets the encoding range for volumetric effects in interiors.

#### distantLightStartDistance
- **Type**: **Float**
- **Description**: Defines the distance at which light sources start being treated as distant.

#### distantLightFadeDistance
- **Type**: **Float**
- **Description**: Controls the distance for the smooth transition between regular and distant lighting.

#### globalFlaresTransparencyThreshold
- **Type**: **Float**
- **Description**: Sets the transparency threshold for global flares.

#### globalFlaresTransparencyRange
- **Type**: **Float**
- **Description**: Defines the range of transparency change for global flares.

#### motionBlurSettings {.collapsed}
- **Type**: **Struct**[SWorldMotionBlurSettings]
- **Description**: A set of parameters for configuring the motion blur effect 
([motion blur](https://en.wikipedia.org/wiki/Motion_blur)).

##### isPostTonemapping
- **Type**: **Bool**
- **Description**: Specifies whether the motion blur effect will be applied after image tonemapping.

##### distanceNear
- **Type**: **Float**
- **Description**: The distance from the camera at which the motion blur effect starts applying to objects 
at close range. Smaller values result in more noticeable blurring of nearby objects.

##### distanceRange
- **Type**: **Float**
- **Description**: Defines the range of the motion blur effect.
The higher the value, the further from the camera the blur effect will spread.

##### strengthNear
- **Type**: **Float**
- **Description**: The intensity of blurring for objects close to the camera.

##### strengthFar
- **Type**: **Float**
- **Description**: The intensity of blurring for distant objects.

##### fullBlendOverPixels
- **Type**: **Float**
- **Description**: The number of pixels over which the motion blur effect fully blends. 
The higher the value, the smoother the transition between objects with different levels of blur.

##### standoutDistanceNear
- **Type**: **Float**
- **Description**: Specifies the minimum distance at which the effect of highlighting objects 
closer to the camera will be noticeable.

##### standoutDistanceRange
- **Type**: **Float**
- **Description**: Specifies the maximum distance at which the object highlighting effect will be applied.

##### standoutAmountNear
- **Type**: **Float**
- **Description**: The level of highlighting for objects near the camera. 
This value determines how strongly objects at close range will be highlighted.

##### standoutAmountFar
- **Type**: **Float**
- **Description**: The level of highlighting for objects at a distance.

##### sharpenAmount
- **Type**: **Float**
- **Description**: The level of image sharpening (sharpening) for motion blur. 
Values greater than zero make the image sharper but may add artifacts at the edges (oversharpening).

#### chromaticAberrationStart
- **Type**: **Float**
- **Description**: Defines the starting point of the 
[chromatic aberration](https://photographylife.com/what-is-chromatic-aberration) effect.

#### chromaticAberrationRange
- **Type**: **Float**
- **Description**: Sets the range of the chromatic aberration effect. Higher values increase color distortion.

#### interiorFallbackReflectionThresholdLow
- **Type**: **Float**
- **Description**: This parameter controls the threshold value for reflections inside interiors when using 
"fallback" reflections. 
If the scene's illumination is below the specified threshold, 
fallback reflection rendering will be used in interiors.

#### interiorFallbackReflectionThresholdHigh
- **Type**: **Float**
- **Description**: The threshold for high illumination values at which fallback reflections will be activated. 
When the scene's illumination reaches this threshold, reflections in interiors will be stronger and more noticeable.

#### interiorFallbackReflectionBlendLow
- **Type**: **Float**
- **Description**: This parameter determines 
how strongly fallback reflections will blend in low-light conditions.

#### interiorFallbackReflectionBlendHigh
- **Type**: **Float**
- **Description**: Similar to `interiorFallbackReflectionBlendLow`, but for high illumination levels.

#### enableEnvProbeLights
- **Type**: **Bool**
- **Description**: Enables the use of environment probe-based lighting (envprobe).

### localWindDampers
- **Type**: **Resource**[CResourceSimplexTree]
- **Description**: This parameter takes a simplex tree that 
controls wind influence zones, regulating the strength and direction of air movement in various parts of the world. 
The purpose of these zones is to simulate the impact of wind on the environment, as well as influence weather effects and physics.

### localWaterVisibility
- **Type**: **Resource**[CResourceSimplexTree]
- **Description**: This parameter takes a simplex tree that 
controls the visibility of local water in various zones of the world.

***
Author: grandvel

*Documentation is maintained by the [REDkit RU](https://discord.gg/kRTEy8KcNa) community members.*

_The translation into English is done using the LLM._
***