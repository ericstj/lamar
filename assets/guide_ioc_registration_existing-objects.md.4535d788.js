import{_ as s,c as e,o as a,a as n}from"./app.8b741b6d.js";const C=JSON.parse('{"title":"Registering Existing Objects","description":"","frontmatter":{},"headers":[],"relativePath":"guide/ioc/registration/existing-objects.md"}'),o={name:"guide/ioc/registration/existing-objects.md"},t=n(`<h1 id="registering-existing-objects" tabindex="-1">Registering Existing Objects <a class="header-anchor" href="#registering-existing-objects" aria-hidden="true">#</a></h1><p>It&#39;s frequently common to register existing objects with a Lamar <code>Container</code> and there are overloads of the <code>ServiceRegistry.For().Use(object)</code> and <code>ServiceRegistry.For().Add(object)</code> methods to do just that:</p><p><a id="snippet-sample_injecting-pre-built-object"></a></p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">Fact</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">should_be_able_to_resolve_from_the_generic_family_expression</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">widget</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AWidget</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">container</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Container</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">For</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">IWidget</span><span style="color:#89DDFF;">)).</span><span style="color:#82AAFF;">Use</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">widget</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">Named</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">mine</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    container</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetInstance</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IWidget</span><span style="color:#89DDFF;">&gt;(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">mine</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">ShouldBeTheSameAs</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">widget</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/Bugs/AddValueDirectlyWithGenericUsage.cs#L8-L18" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_injecting-pre-built-object" title="Start of snippet">anchor</a></sup></p><p>Injecting an existing object into the <code>Container</code> makes it a de facto singleton, but the <code>Container</code> treats it with a special scope called <code>ObjectLifecycle</code> if you happen to look into the <a href="/lamar/guide/ioc/diagnostics/what-do-i-have.html">WhatDoIHave()</a> diagnostics.</p><p>Lamar will attempt to call the <code>IDisposable.Dispose()</code> on any objects that are directly injected into a <code>Container</code> that implement <code>IDisposable</code> when the <code>Container</code> itself is disposed.</p>`,7),p=[t];function l(c,r,i,F,D,y){return a(),e("div",null,p)}const A=s(o,[["render",l]]);export{C as __pageData,A as default};
