import{_ as s,c as n,o as a,a as e}from"./app.5b13aa3a.js";const A=JSON.parse('{"title":"Auto Resolving Concrete Types","description":"","frontmatter":{},"headers":[],"relativePath":"guide/ioc/resolving/requesting-a-concrete-type.md"}'),o={name:"guide/ioc/resolving/requesting-a-concrete-type.md"},l=e(`<h1 id="auto-resolving-concrete-types" tabindex="-1">Auto Resolving Concrete Types <a class="header-anchor" href="#auto-resolving-concrete-types" aria-hidden="true">#</a></h1><p>Lamar allows you to resolve instances of concrete classes without configuring that concrete type with a few provisos:</p><ul><li>The concrete type must have at least one public constructor</li><li>Lamar can build all the arguments in the constructor, either because Lamar has explicit configuration for that dependency or can auto resolve the type</li><li>The constructor does not contain any <em>primitive</em> arguments like strings, numbers, or dates because Lamar assumes those elements are configuration items and not <em>auto resolvable</em>.</li></ul><p>Let&#39;s say we have the following object model, which represents the weather condition for a certain location.</p><p><a id="snippet-sample_concrete-weather-model"></a></p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Weather</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Location</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Location</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">get</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">set</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Atmosphere</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Atmosphere</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">get</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">set</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Wind</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Wind</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">get</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">set</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Condition</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Condition</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">get</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">set</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Weather</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Location</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">location</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Atmosphere</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">atmosphere</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Wind</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">wind</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Condition</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">condition</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        Location </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> location</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">        Atmosphere </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> atmosphere</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">        Wind </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> wind</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">        Condition </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> condition</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Location</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//some properties</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Atmosphere</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//some properties</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Wind</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//some properties        </span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Condition</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//some properties        </span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/Samples/model.cs#L92-L129" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_concrete-weather-model" title="Start of snippet">anchor</a></sup></p><p>Before we can resolve the concrete <code>Weather</code> type, we need an instance of an <code>Container</code> object. As mentioned earlier, these objects defines a generic <code>GetInstance</code> method which can build us an instance of the <code>Weather</code> type.</p><p>You can create a container yourself or use the statically accessed container.</p><p><a id="snippet-sample_quickstart-resolve-concrete-types"></a></p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">container</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Container</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">weather1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> container</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetInstance</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Weather</span><span style="color:#89DDFF;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">weather2</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> container</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetInstance</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Weather</span><span style="color:#89DDFF;">&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;">weather2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> container</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetInstance</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Weather</span><span style="color:#89DDFF;">&gt;();</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">//short version for above.</span></span>
<span class="line"></span></code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/Samples/quickstart/resolving_instances.cs#L44-L50" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_quickstart-resolve-concrete-types" title="Start of snippet">anchor</a></sup></p><p>The reason why we don&#39;t need to supply any configuration is because Lamar supports a concept called <a href="/lamar/guide/ioc/auto-wiring.html">auto wiring</a>. It&#39;s basically a smart way of building instances of types by looking to the constructors of the requested and all the needed underlying types. During this inspection Lamar also uses any provided configuration to help building the requested service or dependency.</p><p>In our example, where there isn&#39;t any configuration available, Lamar looks at the constructor of the requested <code>Weather</code> type. It sees that it depends on four concrete types which all have a default constructor. Lamar is therefore able to create an instance for all of them and inject them into the <code>Weather</code> constructor. After that the <code>Weather</code> instance is returned to the caller.</p><p>Most of the time you will be mapping abstractions to concrete types, but as you have seen Lamar supports other use cases as well.</p>`,15),p=[l];function t(c,r,i,y,C,F){return a(),n("div",null,p)}const h=s(o,[["render",t]]);export{A as __pageData,h as default};
