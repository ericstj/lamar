import{_ as s,c as a,o as n,a as l}from"./app.5b13aa3a.js";const A=JSON.parse('{"title":"Injected Fields","description":"","frontmatter":{},"headers":[],"relativePath":"guide/compilation/frames/injected-fields.md"}'),p={name:"guide/compilation/frames/injected-fields.md"},o=l(`<h1 id="injected-fields" tabindex="-1">Injected Fields <a class="header-anchor" href="#injected-fields" aria-hidden="true">#</a></h1><p>There&#39;s a special kind of <a href="/lamar/guide/compilation/frames/variables.html">Variable</a> called <code>InjectedField</code> that can be used to:</p><ul><li>Declare a private field within a generated type</li><li>Establish a <code>Variable</code> that points to that private field</li><li>Set up a constructor parameter for that field</li><li>In the constructor, map the constructor parameter to the private field</li></ul><p>As an example, let&#39;s take the <code>WhatTimeIsIt</code> generated type from the <a href="/lamar/guide/compilation/frames/">frames model tutorial</a>, but this time generate the class with the assumption that the &quot;now&quot; time is injected into the generated type&#39;s constructor like this:</p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">assembly</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> GeneratedAssembly</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Empty</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> assembly</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddType</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">WhatTimeIsIt</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">ISaySomething</span><span style="color:#89DDFF;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">method</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> type</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">MethodFor</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">nameof</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">ISaySomething</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Speak</span><span style="color:#89DDFF;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">@call</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MethodCall</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">NowSpeaker</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">nameof</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">NowSpeaker</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Speak</span><span style="color:#89DDFF;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Create an InjectedField as the argument to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// the Speak method</span></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">now</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">InjectedField</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">DateTime</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">now</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">@call</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Arguments</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> now</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">method</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Frames</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Add</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">@call</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">assembly</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">CompileAll</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span></code></pre></div><p>At runtime as Lamar tries to write the code for a new generated type, it will seek out any or all <code>InjectedField</code> variables used within any of the methods and use those to generate a constructor function. The generated code for the dynamic type built up above will end up looking like this:</p><div class="language-csharp"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">WhatTimeIsIt</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Lamar</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">Testing</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">Samples</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">ISaySomething</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">readonly</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DateTime</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">_now</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">WhatTimeIsIt</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">DateTime</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">now</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        _now </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> now</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Speak</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        Lamar</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Testing</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Samples</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">NowSpeaker</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Speak</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">_now</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,7),e=[o];function t(c,r,F,y,D,C){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{A as __pageData,d as default};
