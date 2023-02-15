import{o as a,c as n,a as s,d as e,e as t,b as p}from"./app.21b67795.js";const o='{"title":"Working with Variables","description":"","frontmatter":{},"headers":[{"level":2,"title":"Default Naming","slug":"default-naming"},{"level":2,"title":"Creator Frame","slug":"creator-frame"},{"level":2,"title":"Overriding Variable Usage or Type","slug":"overriding-variable-usage-or-type"},{"level":2,"title":"Derived Variables","slug":"derived-variables"},{"level":2,"title":"Dependencies to Other Variables","slug":"dependencies-to-other-variables"}],"relativePath":"guide/compilation/frames/variables.md","lastUpdated":1629820849211}',c={},l=e("h1",{id:"working-with-variables"},[e("a",{class:"header-anchor",href:"#working-with-variables","aria-hidden":"true"},"#"),t(" Working with Variables")],-1),i=e("p",null,[t("The "),e("code",null,"Variable"),t(" class in LamarCodeGeneration models the CLR type and usage of a value within a generated method.")],-1),r=e("p",null,"Here are some samples of creating variable objects with a variable type and name:",-1),u=p('<p><a id="snippet-sample_create-a-variable"></a></p><div class="language-cs"><pre><code><span class="token comment">// Create a connection for the type SqlConnection </span>\n<span class="token comment">// with the name &quot;conn&quot;</span>\n<span class="token class-name"><span class="token keyword">var</span></span> conn <span class="token operator">=</span> Variable<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>SqlConnection<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;conn&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Pretty well the same thing above</span>\n<span class="token class-name"><span class="token keyword">var</span></span> conn2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Variable</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">SqlConnection</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;conn2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Create a variable with the default name</span>\n<span class="token comment">// for the type</span>\n<span class="token class-name"><span class="token keyword">var</span></span> conn3 <span class="token operator">=</span> Variable<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>SqlConnection<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nconn3<span class="token punctuation">.</span>Usage<span class="token punctuation">.</span><span class="token function">ShouldBe</span><span class="token punctuation">(</span><span class="token string">&quot;sqlConnection&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/LamarCompiler.Testing/Samples/Variables.cs#L40-L52" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_create-a-variable" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><h2 id="default-naming"><a class="header-anchor" href="#default-naming" aria-hidden="true">#</a> Default Naming</h2><p>If you do not give a name for a variable, Lamar will derive a default variable name from the type like this:</p>',5),k=p('<p><a id="snippet-sample_default-variable-name-usage"></a></p><div class="language-cs"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> widget <span class="token operator">=</span> Variable<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nwidget<span class="token punctuation">.</span>Usage<span class="token punctuation">.</span><span class="token function">ShouldBe</span><span class="token punctuation">(</span><span class="token string">&quot;widget&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/LamarCompiler.Testing/Samples/Variables.cs#L26-L29" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_default-variable-name-usage" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><p>The best way to understand the full rules for deriving the default variable names is to just peek at the <a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/Codegen/VariableTests.cs" target="_blank" rel="noopener noreferrer">unit tests within the Lamar codebase</a>.</p><h2 id="creator-frame"><a class="header-anchor" href="#creator-frame" aria-hidden="true">#</a> Creator Frame</h2><p>If a variable is created by a <a href="/guide/compilation/frames/frame.html">Frame</a>, you really want to mark that relationship by either passing the creating frame into the constructor function like this:</p>',6),d=p('<p><a id="snippet-sample_nowfetchframe"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NowFetchFrame</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">SyncFrame</span></span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token function">NowFetchFrame</span><span class="token punctuation">(</span><span class="token class-name">Type</span> variableType<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token comment">// Notice how &quot;this&quot; frame is passed into the variable</span>\n        <span class="token comment">// class constructor as the creator</span>\n        Variable <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Variable</span><span class="token punctuation">(</span>variableType<span class="token punctuation">,</span> <span class="token string">&quot;now&quot;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    \n    <span class="token keyword">public</span> <span class="token return-type class-name">Variable</span> Variable <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n    \n    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GenerateCode</span><span class="token punctuation">(</span><span class="token class-name">GeneratedMethod</span> method<span class="token punctuation">,</span> <span class="token class-name">ISourceWriter</span> writer<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        writer<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$&quot;var </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">Variable<span class="token punctuation">.</span>Usage</span><span class="token punctuation">}</span></span><span class="token string"> = </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">Variable<span class="token punctuation">.</span>VariableType<span class="token punctuation">.</span>FullName</span><span class="token punctuation">}</span></span><span class="token string">.</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp"><span class="token keyword">nameof</span><span class="token punctuation">(</span>DateTime<span class="token punctuation">.</span>UtcNow<span class="token punctuation">)</span></span><span class="token punctuation">}</span></span><span class="token string">;&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        Next<span class="token punctuation">?.</span><span class="token function">GenerateCode</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> writer<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/LamarCodeGeneration/Model/NowTimeVariableSource.cs#L31-L49" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_nowfetchframe" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><h2 id="overriding-variable-usage-or-type"><a class="header-anchor" href="#overriding-variable-usage-or-type" aria-hidden="true">#</a> Overriding Variable Usage or Type</h2><p>Do this sparingly, but you can override the name or usage and type of a previously built variable like this:</p>',5),m=p('<p><a id="snippet-sample_override-variable-usage-and-type"></a></p><div class="language-cs"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> service <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Variable</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">IService</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;service&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nservice<span class="token punctuation">.</span><span class="token function">OverrideName</span><span class="token punctuation">(</span><span class="token string">&quot;myService&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nservice<span class="token punctuation">.</span><span class="token function">OverrideType</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">WhateverService</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/LamarCompiler.Testing/Samples/Variables.cs#L33-L37" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_override-variable-usage-and-type" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><h2 id="derived-variables"><a class="header-anchor" href="#derived-variables" aria-hidden="true">#</a> Derived Variables</h2><p>Variables don&#39;t have to mean literal C# variables in the generated code. They can be derived values like this example:</p>',5),h=p('<p><a id="snippet-sample_derived-variable"></a></p><div class="language-cs"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> now <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Variable</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">DateTime</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">$&quot;</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp"><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">DateTime</span><span class="token punctuation">)</span><span class="token punctuation">.</span>FullName</span><span class="token punctuation">}</span></span><span class="token string">.</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp"><span class="token keyword">nameof</span><span class="token punctuation">(</span>DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">)</span></span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/LamarCompiler.Testing/Samples/Variables.cs#L22-L24" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_derived-variable" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><h2 id="dependencies-to-other-variables"><a class="header-anchor" href="#dependencies-to-other-variables" aria-hidden="true">#</a> Dependencies to Other Variables</h2><p>For the sake of frame ordering, you might need to give Lamar a hint that your variable depends on another variable. Here&#39;s an example of doing that with the <code>HttpResponse</code> type from <a href="http://ASP.Net" target="_blank" rel="noopener noreferrer">ASP.Net</a> Core:</p>',5),g=p('<p><a id="snippet-sample_variable-dependencies"></a></p><div class="language-cs"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> context <span class="token operator">=</span> Variable<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>HttpContext<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name"><span class="token keyword">var</span></span> response <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Variable</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">HttpResponse</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">$&quot;</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">context<span class="token punctuation">.</span>Usage</span><span class="token punctuation">}</span></span><span class="token string">.</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp"><span class="token keyword">nameof</span><span class="token punctuation">(</span>HttpContext<span class="token punctuation">.</span>Response<span class="token punctuation">)</span></span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nresponse<span class="token punctuation">.</span>Dependencies<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/LamarCompiler.Testing/Samples/Variables.cs#L56-L60" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_variable-dependencies" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p>',3);c.render=function(e,t,p,o,c,v){return a(),n("div",null,[l,i,r,s(" snippet: sample_create-a-variable "),u,s(" snippet: sample_default-variable-name-usage "),k,s(" snippet: sample_NowFetchFrame "),d,s(" snippet: sample_override-variable-usage-and-type "),m,s(" snippet: sample_derived-variable "),h,s(" snippet: sample_variable-dependencies "),g])};export{o as __pageData,c as default};