---
tags:
  - References
  - World
  - w2w
    
status: new
---

# mergedGeometry
## CMergedWorldGeometry

These settings optimize world geometry by merging individual meshes to improve rendering performance.

The parameters are aimed at **advanced users**.

### gridSize
- **Type**: **Int**
- **Description**: Defines the grid size for splitting merged geometry. 
Larger values create larger sections for merging, 
which can improve performance but reduce accuracy. 
Smaller values provide more precise merging but may increase overhead.

### mergers
- **Type**: **Array**
- **Description**: An array of CMergedWorldGeometryShadowData objects that control geometry parameters. 
(Why there are multiple of them is not entirely clear.)

#### minExtractMeshRadius
- **Type**: **Float**
- **Description**: The minimum mesh radius for extraction and consideration as a candidate for merging. 
Meshes with a radius smaller than the specified value are processed separately for performance optimization.

#### minMergeMeshRadius
- **Type**: **Float**
- **Description**: The minimum mesh radius for inclusion in the merging process. 
Meshes with a smaller radius remain independent, helping to avoid excessive detail in merged geometry.

#### MaxMeshTriangles
- **Type**: **Int**
- **Description**: The maximum number of triangles in a mesh for inclusion in the merging process. 
Meshes with more triangles are processed separately to avoid creating overly complex merged structures.

#### mergeCascade1 - 4
- **Type**: **Bool**
- **Description**: Enables the creation of geometry for the corresponding shadow cascade. 
Each subsequent cascade represents a more distant area with potentially less detailed geometry.

#### excludeProxies
- **Type**: **Bool**
- **Description**: When set to true, excludes proxy entities (temporary objects or placeholders) 
from the geometry merging process.

#### streamingDistance
- **Type**: **Float**
- **Description**: This parameter sets the distance at which shadow geometry will be loaded. 
Setting this parameter allows control over the distance from the camera at which shadows will be visible.

#### useInCascade1 - 4
- **Type**: **Bool**
- **Description**: Determines the use of merged geometry in the corresponding shadow cascade. 
Allows precise control over where merged geometry is applied.

#### killZ
- **Type**: **Float**
- **Description**: This parameter filters triangles below the specified Z-coordinate.
This helps exclude objects that are out of view.

#### killAngle
- **Type**: **Float**
- **Description**: The maximum angle in degrees between the triangle normal and the downward vector 
for inclusion in merged geometry. Triangles with a steeper angle are excluded for optimization.

***
Author: grandvel

*Documentation is maintained by the [REDkit RU](https://discord.gg/kRTEy8KcNa) community members.*

_The translation into English is done using the LLM._
***