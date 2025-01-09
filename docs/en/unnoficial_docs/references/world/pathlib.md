---
tags:
  - References
  - World
  - Navigation
  - navmesh

status: new

---

# PathLib

PathLib is a navigation and pathfinding system that manages the movement of all agents in the game world. 
The system processes navigation data, calculates routes, and ensures collision avoidance between agents.

## CPathLibWorld
## globalSettings
### CpathLibSettings
#### agentCategoriesCount
- **Type**: **Int** [0-4]
- **Description**: Defines the number of different types of agents in the game. 
Each category represents a separate type of creature (e.g., humans, large creatures, small animals) 
with unique navigation parameters.

#### agentCategoryRadius1 - 4
- **Type**: **Float**
- **Description**: Defines the personal space radius for each agent category. This value is used for:
    - Calculating the minimum distance between agents
    - Determining the width of passages an agent can pass through
    - Planning obstacle avoidance

#### roadsNavcostMultiplier
- **Type**: **Float**
- **Description**: A multiplier that affects the priority of using roads when calculating paths. 
Lower values make roads more preferable for navigation, while higher values reduce their priority.

#### maxTerrainSlope
- **Type**: **Float** [30-80]
- **Description**: The maximum slope angle of the surface that agents can traverse. 
Surfaces with a steeper slope are considered impassable.

#### seaLevel
- **Type**: **Float**
- **Description**: Defines the base water level height in the world. Areas below this level 
are considered impassable for regular agents and are excluded from the navigation mesh.

#### desiredStreamingRange
- **Type**: **Float**
- **Description**: The radius for loading navigation data around active agents. Affects:
    - The volume of navigation data loaded
    - The maximum distance for route planning
    - Performance

#### terrainWalkableRegionMinSize
- **Type**: **Float**
- **Description**: The minimum area (in m²) of a walkable region on the terrain. 
Smaller areas are automatically marked as impassable, 
which helps prevent agents from getting stuck in small spaces.

#### terrainUnwalkableRegionMinSize
- **Type**: **Float**
- **Description**: The minimum area of an impassable region on the terrain. 
Smaller obstacles are ignored when building the navigation mesh.

#### terrainNavmeshSurroundedRegionMinSize
- **Type**: **Float**
- **Description**: The minimum area of an isolated region in the navigation mesh. 
Regions smaller than this size, completely surrounded by impassable space, are automatically excluded from 
the navigation mesh, helping to prevent agents from getting stuck in dead ends.

#### terrainHeightApproximationRange
- **Type**: **Float**
- **Description**: The maximum allowable error when 
[approximating](https://en.wikipedia.org/wiki/Approximation) 
terrain height in the navigation mesh. Smaller values provide more accurate agent positioning, 
but require more computational resources.

***
Author: grandvel

*Documentation is maintained by the [REDkit RU](https://discord.gg/kRTEy8KcNa) community members.*

_The translation into English is done using the LLM._
***