---
tags:
  - Useful
  - Editor
---

# How to Copy Information from Object Properties

In REDkit, every object has a set of properties. Often, you need to copy their names 
for your own purposes (e.g., searching online).

There’s a convenient way to quickly copy the entire structure of properties from a property group.
![img.webp](../../../assets/images/unnoficial_docs/usesful_features/info_prop.webp)

## Method 1: Copying an Entire Property Group

1. Right-click on the property group (in the screenshot, it’s the gray block labeled CResource or CWorld).
2. Select the "Copy" option from the context menu.

As a result, the following XML will be copied to the clipboard:

```xml
<?xml version="1.0" encoding="UTF-16"?>
<CopyToClipboard type="CGameWorld">
    <group name="CResource">
        <property name="importFile" value="" />
        <property name="importFileTimeStamp" value="01/01/00 00:00:00" />
    </group>
</CopyToClipboard>
```

## Method 2: Copying Nested Properties

This is the same as above, but click on the internal properties with nested elements (those with a red cross). 
In this case, all properties included in this element will be copied.

***
Author: lxgdark

*Documentation is maintained by the [REDkit RU](https://discord.gg/kRTEy8KcNa) community members.*

_The translation into English is done using the LLM._
***