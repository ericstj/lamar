# Building Custom Frames

::: tip INFO
If you're going to get into LamarCodeGeneration's model, you probably want to be familiar and comfortable with both string interpolation
in C# and the recent `nameof` operator.
:::

To build a custom frame, you first need to create a new class that subclasses `Frame`, with these other more specific subclasses to start from as well:

* `SyncFrame` - a frame that generates purely synchronous code
* `AsyncFrame` - a frame that has at least one `await` call in the code generated

The one thing you absolutely have to do when you create a new `Frame` class is to override the `GenerateCode()` method. Take this example
from Lamar itself for a frame that just injects a comment into the generated code:

<[sample:CommentFrame]>

A couple things to note about the `GenerateCode()` method:

* The `GeneratedMethod` will tell you information about the new method being generated like the return type and whether or not the method returns a `Task` or is marked with the `async` keyword.
* You use the `ISourceWriter` argument to write new code into the generated method
* It's your responsibility to call the `Next?.GenerateCode()` method to give the next frame a chance to write its code. **Don't forget to do this step**.

Inside a custom frame, you can also nest the code from the frames following yours in a method. See this frame from Lamar itself that
calls a "no arg" constructor on a concrete class and returns a variable. In the case of a class that implements `IDisposable`, it should write
a C# `using` block that surrounds the inner code:

<[sample:NoArgCreationFrame]>

## Creating a Variable within a Frame

If the code generated by a `Frame` creates a new `Variable` in the generated code, it should set itself as the creator of that variable. You can do that by
either passing a frame into a variable as its creator like this line from the `NoArgCreationFrame` shown above:

<[sample: NoArgCreationFrameCtor]>

Otherwise, you could also have written that code like this:

<[sample:NoArgCreationFrameCtor2]>

## Finding Dependent Variables

The other main thing you need to know is how to locate `Variable` objects your `Frame` needs to use. You accomplish that by
overriding the `FindVariables()` method. Take this example below that is used within Lamar to generate code that resolves a service
by calling a [service locator](https://en.wikipedia.org/wiki/Service_locator_pattern) method on a Lamar `Scope` (a nested container most likely) object:

<[sample:GetInstanceFrame]>

When you write a `FindVariables()` method, be sure to keep a reference to any variable you need for later, and return that variable as part of the enumeration from this method. Lamar uses the dependency relationship between frames, the variables they depend on, and the creators of those variables to
correctly order and fill in any missing frames prior to generating code through the `GenerateCode()` method.