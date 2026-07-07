---
tags:
  - Basics
  - Architecture
  - Behaviors
  - Behavior
  - w2behtree
  - w2beh
  - w2steer
  - w2animev

status: new
---


#Behavior system architecture


**Glossary**

- BT - Behavior Tree
- WS - Witcher Script
- SSM - Scriptable State Machine
- FSM - Finite State Machine (architectural pattern)
- NPC - Non Playable Character


## First - three different "behaviors"

The main source of confusion, and it's worth stating right now, separately: the word "behavior" in the engine means three unrelated mechanisms.
They are connected only through variables and events, but live on different layers.

### **Scriptable State Machine** - "what state the object is in" (*object-state layer*)

A finite state machine (FSM) written in Witcher Script, the state of the object itself, not its animation and not its AI goal.
It's a common mechanism for everyone, but for the player it holds a special place:
since the player has no Behavior Tree, it is the SSM that becomes the player's main source of decisions.
That is, for an NPC decisions are made by the BT and the SSM just reflects the state, whereas for the player the SSM both decides and reflects the state at the same time.


### **Behavior Tree** - "what to do" (*decision layer*)

The decision tree, also known as the behavior tree. It's responsible for AI actions.
Only NPCs have it - the player has no such layer at all, the player's decisions come directly from input and the player's SSM.


### **Behavior Graph** - "what plays" (*presentation layer*)

This is not about decisions at all, it's about how a decision looks.
In other engines this is called the animation graph (animgraph).
An animation state machine that blends skeleton poses and produces the final pose.
It's common to everyone (NPCs and the player), but it doesn't decide anything itself - it only reacts to variables/events
that came from the outside (from the BT or from the SSM).


## NPC vs Player. Shared execution, different control

The shared executive part is the same for everyone, the difference is only in the control part between the player and NPCs.
The player has no BT since that is the AI for NPCs, the player's decisions instead come from input and the global SSM `CR4Player`.
It commands the shared executive part directly and, unlike NPCs, closes the loop through animation events;
for the player this is the primary mechanism for timing actions, not an auxiliary one. Event loops are covered at the end.
For NPCs the states rather serve the BT tree.

**Flow diagram:**

![Flow diagram](../../../../assets/diagrams/en/unofficial_docs/base/behavior/behavior_control_flow.drawio)


## Systems and abstraction layers

The full map of layers. The same flow, but broken down by layers:

![Layer map](../../../../assets/diagrams/en/unofficial_docs/base/behavior/behavior_layermap.drawio)


**Systems individually**:

### Scripting & state machines

SSM on WS, the pattern that all game logic rests on.
In short, an object can be in one of the defined states, a state is effectively a loop that
runs in a separate asynchronous thread (latent functions), the object switches in turn between these states,
for example *walks* -> *attacks* -> *dead*.

**Key classes**

- CActor
- CGameplayEntity
- CR4Player

### Orchestrator (AI Orchestration)

Populating the world and scheduling: who exists, where they appear and what high-level task they are busy with.
Creates the NPC and sets up its behavior tree. Doesn't touch the player at all.

**Key classes:**

- CEncounter - the orchestrator object, spawn tree + creature pool
- CCommunitySystem - system for spawning NPCs on schedules
- CJobTree - work points and their animations
- CBehTreeReactionManager - world stimuli and their reactions


### Behavior Trees

The AI decision layer: every tick it traverses the priority tree, picks an action and dispatches commands for execution.
The heart of NPC behavior.

**Key classes:**

- CBehTree (.w2behtree) - the tree asset
- IBehTreeTask - interface for tasks in Witcher Script

### Movement

Computes speed and direction per frame, keeps the agent on the navmesh, reconciles root motion with the desired movement.
For NPCs it's driven by the steering graph (.w2steer), whereas for the player it's input directly, so the component is shared but the drivers differ.

**Key classes**:

- CMovingAgentComponent - the movement component
- CMoveSteeringBehavior (.w2steer) - the steering tree
- CMovementAdjustor - fitting the animation to the target

### Behavior graphs

The animation state machine and pose-blending network: variables and events come in from scripts and trees,
and the output is a ready skeleton pose for every frame.

**Key classes**:

CBehaviorGraph (.w2beh) - the graph asset

### Animation System

Computes the pose into bones, extracts root motion and, at the right moment, sends animation events. Holds the graph + skeleton.

**Key classes:**

CAnimatedComponent - the center: graph stack + skeleton
CSkeleton - the skeleton
CExtAnimEvent - events baked into the clip


#### Animation Events

Necessary for the two-way link: the logic starts an animation, and the events baked into the clip, at the right frame,
call named OnAnimEvent_* functions back on the object.

AddAnimEventCallback('Name','OnAnimEvent_X') - registering the callback in scripts

When playback reaches the event - CAnimatedComponent calls this function by name


## Events

All levels are connected only through events:

![](../../../../assets/diagrams/en/unofficial_docs/base/behavior/behavior_eventsmap.drawio)



***
Author: leviofanh

*Documentation is maintained by the [REDkit RU](https://discord.gg/kRTEy8KcNa) community members.*

_The translation into English is done using the LLM._
***
