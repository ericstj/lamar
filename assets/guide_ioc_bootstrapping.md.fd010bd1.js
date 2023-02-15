import{_ as s,c as a,o as n,a as e}from"./app.5b13aa3a.js";const d=JSON.parse('{"title":"Bootstrapping a Container","description":"","frontmatter":{},"headers":[],"relativePath":"guide/ioc/bootstrapping.md"}'),o={name:"guide/ioc/bootstrapping.md"},t=e(`<h1 id="bootstrapping-a-container" tabindex="-1">Bootstrapping a Container <a class="header-anchor" href="#bootstrapping-a-container" aria-hidden="true">#</a></h1><p>To configure and bootstrap a Lamar container, you have a couple options. You can create a <code>Container</code> object with inline registrations:</p><p><a id="snippet-sample_bootstrap-inline"></a></p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">container</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Container</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddTransient</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IClock</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Clock</span><span style="color:#89DDFF;">&gt;();</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">});</span></span>
<span class="line"></span></code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/Samples/Bootstrapping.cs#L16-L20" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_bootstrap-inline" title="Start of snippet">anchor</a></sup></p><p>Or pass in a configured <code>ServiceRegistry</code> object as shown below:</p><p><a id="snippet-sample_bootstrap-with-registry"></a></p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// Create a Lamar.ServiceRegistry object</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// and define your service registrations</span></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">registry</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ServiceRegistry</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Use ASP.Net Core style registrations</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// for basic functionality</span></span>
<span class="line"><span style="color:#A6ACCD;">registry</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddSingleton</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IClock</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Clock</span><span style="color:#89DDFF;">&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;">registry</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddTransient</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IWidget</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">RedWidget</span><span style="color:#89DDFF;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Or use StructureMap style registration syntax</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// as an alternative or to use more advanced usage</span></span>
<span class="line"><span style="color:#A6ACCD;">registry</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">For</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IClockFactory</span><span style="color:#89DDFF;">&gt;()</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Use</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ClockFactory</span><span style="color:#89DDFF;">&gt;()</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Singleton</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">container</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Container</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">registry</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span></code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/Samples/Bootstrapping.cs#L25-L45" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_bootstrap-with-registry" title="Start of snippet">anchor</a></sup></p><p>Lamar&#39;s <code>ServiceRegistry</code> supports a subset of StructureMap&#39;s old <code>Registry</code> class and should be used as a replacement when replacing StructureMap with Lamar. We renamed the class to disambiguate the name from the many other <code>Registry</code> classes in the CLR. <code>ServiceRegistry</code> implements the <a href="https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.iservicecollection?view=aspnetcore-2.0" target="_blank" rel="noreferrer">IServiceCollection</a> interface from <a href="http://ASP.Net" target="_blank" rel="noreferrer">ASP.Net</a> Core. You can also create a Lamar container by passing in an instance of <code>IServiceCollection</code> like you&#39;d get within an <a href="http://ASP.Net" target="_blank" rel="noreferrer">ASP.Net</a> Core application.</p>`,10),p=[t];function l(r,c,i,y,F,C){return n(),a("div",null,p)}const A=s(o,[["render",l]]);export{d as __pageData,A as default};
