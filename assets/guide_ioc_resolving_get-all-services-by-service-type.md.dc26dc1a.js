import{_ as s,c as n,o as a,a as l}from"./app.8b741b6d.js";const i=JSON.parse('{"title":"Get all Services by Service Type","description":"","frontmatter":{},"headers":[],"relativePath":"guide/ioc/resolving/get-all-services-by-service-type.md"}'),p={name:"guide/ioc/resolving/get-all-services-by-service-type.md"},o=l(`<h1 id="get-all-services-by-service-type" tabindex="-1">Get all Services by Service Type <a class="header-anchor" href="#get-all-services-by-service-type" aria-hidden="true">#</a></h1><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>The functionality respects the order in which the actual instances are configured in the Container -- which is compliant with the expected behavior inside of <a href="http://ASP.Net" target="_blank" rel="noreferrer">ASP.Net</a> Core. Be warned that some other IoC tools make different assumptions if you are coming from a different tool.</p></div><p>Please see <a href="/lamar/guide/ioc/working-with-enumerable-types.html">working with Enumerable Types</a> for a lot more information about what&#39;s going on behind the scenes.</p><p>Once in a while you might want to get an enumerable of all the configured objects for a ServiceType. That&#39;s done with the <code>GetAllInstances()</code> method shown below:</p><p><a id="snippet-sample_get-all-instances"></a></p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">Fact</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">get_all_instances</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">container</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Container</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">For</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IWidget</span><span style="color:#89DDFF;">&gt;().</span><span style="color:#82AAFF;">Add</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">AWidget</span><span style="color:#89DDFF;">&gt;().</span><span style="color:#82AAFF;">Named</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">A</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">For</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IWidget</span><span style="color:#89DDFF;">&gt;().</span><span style="color:#82AAFF;">Add</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">BWidget</span><span style="color:#89DDFF;">&gt;().</span><span style="color:#82AAFF;">Named</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">B</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">For</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IWidget</span><span style="color:#89DDFF;">&gt;().</span><span style="color:#82AAFF;">Add</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">CWidget</span><span style="color:#89DDFF;">&gt;().</span><span style="color:#82AAFF;">Named</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">C</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    container</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">QuickBuildAll</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IWidget</span><span style="color:#89DDFF;">&gt;()</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Select</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetType</span><span style="color:#89DDFF;">())</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ShouldHaveTheSameElementsAs</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">AWidget</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">BWidget</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">CWidget</span><span style="color:#89DDFF;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    container</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetAllInstances</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IWidget</span><span style="color:#89DDFF;">&gt;()</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Select</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetType</span><span style="color:#89DDFF;">())</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ShouldHaveTheSameElementsAs</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">AWidget</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">BWidget</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">CWidget</span><span style="color:#89DDFF;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// or</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    container</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetAllInstances</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">IWidget</span><span style="color:#89DDFF;">))</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">OfType</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IWidget</span><span style="color:#89DDFF;">&gt;()</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// returns an IEnumerable, so I&#39;m casting here</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Select</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetType</span><span style="color:#89DDFF;">())</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ShouldHaveTheSameElementsAs</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">AWidget</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">BWidget</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">CWidget</span><span style="color:#89DDFF;">));</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/IoC/Acceptance/get_all_instances.cs#L69-L97" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_get-all-instances" title="Start of snippet">anchor</a></sup><a id="snippet-sample_get-all-instances-1"></a></p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">Fact</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">get_all_instances</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">container</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Container</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">For</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IWidget</span><span style="color:#89DDFF;">&gt;().</span><span style="color:#82AAFF;">Add</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">AWidget</span><span style="color:#89DDFF;">&gt;().</span><span style="color:#82AAFF;">Named</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">A</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">For</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IWidget</span><span style="color:#89DDFF;">&gt;().</span><span style="color:#82AAFF;">Add</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">BWidget</span><span style="color:#89DDFF;">&gt;().</span><span style="color:#82AAFF;">Named</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">B</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">For</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IWidget</span><span style="color:#89DDFF;">&gt;().</span><span style="color:#82AAFF;">Add</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">CWidget</span><span style="color:#89DDFF;">&gt;().</span><span style="color:#82AAFF;">Named</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">C</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    container</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetAllInstances</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IWidget</span><span style="color:#89DDFF;">&gt;()</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Select</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetType</span><span style="color:#89DDFF;">())</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ShouldHaveTheSameElementsAs</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">AWidget</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">BWidget</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">CWidget</span><span style="color:#89DDFF;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// or</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    container</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetAllInstances</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">IWidget</span><span style="color:#89DDFF;">))</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">OfType</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IWidget</span><span style="color:#89DDFF;">&gt;()</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// returns an IEnumerable, so I&#39;m casting here</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Select</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetType</span><span style="color:#89DDFF;">())</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ShouldHaveTheSameElementsAs</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">AWidget</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">BWidget</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">CWidget</span><span style="color:#89DDFF;">));</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/Examples/Resolving/SimpleScenarios.cs#L50-L73" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_get-all-instances-1" title="Start of snippet">anchor</a></sup></p>`,9),e=[o];function t(F,c,r,y,D,A){return a(),n("div",null,e)}const d=s(p,[["render",t]]);export{i as __pageData,d as default};
