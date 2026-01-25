# Parameter Data Types

This section describes the data types used in the **documentation** to better understand the **expected parameter values**.

Please note that this is a **simplified representation**. 
It reflects the **expected data format**, **not** the actual type in which the data is stored in the engine.

### Basic Types
- **String** (String)

    Text data, for example: "Hello, world"

- **Int** (Integer)

    Whole numbers, including negative and positive values. For example: -5, 0, 42

- **UInt** (Unsigned Integer)

    Only numbers from zero and above. For example: 0, 25.

- **Float** (Floating Point Number)

    Decimal numbers, for example: 3.14, -0.5

- **Bool** (Boolean)

    Logical data type. true/false

- **Int/UInt/Float** [0-10] (Number in Range)

    Numbers within the specified range

- **Const** (Constant)

    An immutable value of any type

### Complex Types
- **DateTime** (Date and Time)

    A special type for storing date and time

- **Enum** (Enumeration)

    A set of named, predefined constants.

- **Array** (Array)

    An array. An ordered collection of elements of the same type. 
    New elements can be added.

- **StaticArray**[SFoliageLODSettings]

    A static array.
    Unlike a regular array, new elements cannot be added (it has a fixed size in memory).

- **Struct** (Structure)

    A set of fields of different types, combined into one structure

- **Struct** [SGlobalSpeedTreeParameters]

    A specific, predefined structure


### Special Types
- **Class** (Class)

    Defines an object with data (fields) and methods (functions).
    In the context of parameters, we will assign classes to implement specific functionality.
    We will configure these classes by changing their fields.

- **Class** [CUmbraScene]

    A specific implementation of a class (in this case, for working with occlusion). 
    When the class is already predefined and unchanged.

- **Resource** (Resource)

    Path to a resource file.

- **Resource** [CBitmapTexture]

    Path to a resource of a specific type (in this case, a texture (class `CBitmapTexture`))

    !!! tip "Tip"
        All engine resources and their classes are described in [this](file_extensions.md) document.

- **Curve**

    A curve graph. Has a separate editor in the properties.