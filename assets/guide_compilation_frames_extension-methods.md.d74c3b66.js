import{_ as s,c as n,o as a,a as o}from"./app.5b13aa3a.js";const d=JSON.parse('{"title":"Extension Methods for Names in Code","description":"","frontmatter":{},"headers":[],"relativePath":"guide/compilation/frames/extension-methods.md"}'),l={name:"guide/compilation/frames/extension-methods.md"},p=o(`<h1 id="extension-methods-for-names-in-code" tabindex="-1">Extension Methods for Names in Code <a class="header-anchor" href="#extension-methods-for-names-in-code" aria-hidden="true">#</a></h1><p>To help generate code in memory, you&#39;ll want just a little bit of help from the following methods to determine how a type should be written <em>in code</em> with these extension methods in <code>LamarCodeGeneration</code>:</p><ol><li><p><code>Type.NameInCode()</code> -- gives you the type name as it should appear in code. Handles inner types, generic types, well known simple types like <code>int</code>, and all other types</p></li><li><p><code>Type.FullNameInCode()</code> -- gives you the type name as it should appear in code. Handles inner types, generic types, well known simple types like <code>int</code>, and all other types</p></li></ol><p>The functionality of <code>NameInCode()</code> is demonstrated below with some of its xUnit tests:</p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">Theory</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(void),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">void</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(int),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">int</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(string),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">string</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(long),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">long</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(bool),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">bool</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(double),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">double</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(object),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">object</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Message1</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Message1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Handler</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Message1</span><span style="color:#89DDFF;">&gt;),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Handler&lt;LamarCompiler.Testing.Codegen.Message1&gt;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Handler</span><span style="color:#89DDFF;">&lt;string&gt;),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Handler&lt;string&gt;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">alias_name_of_task</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">type</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">name</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// Gets the type name</span></span>
<span class="line"><span style="color:#A6ACCD;">    type</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">NameInCode</span><span style="color:#89DDFF;">().</span><span style="color:#82AAFF;">ShouldBe</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>Likewise, <code>FullNameInCode()</code> is shown below:</p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">Theory</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(void),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">void</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(int),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">int</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(string),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">string</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(long),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">long</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(bool),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">bool</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(double),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">double</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(object),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">object</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Message1</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">LamarCompiler.Testing.Codegen.Message1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Handler</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Message1</span><span style="color:#89DDFF;">&gt;),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">LamarCompiler.Testing.Codegen.Handler&lt;LamarCompiler.Testing.Codegen.Message1&gt;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InlineData</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Handler</span><span style="color:#89DDFF;">&lt;string&gt;),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">LamarCompiler.Testing.Codegen.Handler&lt;string&gt;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">alias_full_name_of_task</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">type</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">name</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    type</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">FullNameInCode</span><span style="color:#89DDFF;">().</span><span style="color:#82AAFF;">ShouldBe</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,7),e=[p];function t(F,D,c,r,y,C){return a(),n("div",null,e)}const A=s(l,[["render",t]]);export{d as __pageData,A as default};
