import{_ as s,c as a,o as n,a as e}from"./app.8b741b6d.js";const A=JSON.parse('{"title":"Getting Started","description":"","frontmatter":{},"headers":[{"level":2,"title":"What is Lamar?","slug":"what-is-lamar","link":"#what-is-lamar","children":[]},{"level":2,"title":"History and Motivation","slug":"history-and-motivation","link":"#history-and-motivation","children":[]},{"level":2,"title":"Lamar as IoC Container","slug":"lamar-as-ioc-container","link":"#lamar-as-ioc-container","children":[]},{"level":2,"title":"Lamar within ASP.Net Core Applications","slug":"lamar-within-asp-net-core-applications","link":"#lamar-within-asp-net-core-applications","children":[]},{"level":2,"title":"Lamar with ASP.NET Core Minimal Hosting","slug":"lamar-with-asp-net-core-minimal-hosting","link":"#lamar-with-asp-net-core-minimal-hosting","children":[]},{"level":2,"title":"Lamar for Runtime Code Generation & Compilation","slug":"lamar-for-runtime-code-generation-compilation","link":"#lamar-for-runtime-code-generation-compilation","children":[]}],"relativePath":"guide/index.md"}'),l={name:"guide/index.md"},o=e(`<h1 id="getting-started" tabindex="-1">Getting Started <a class="header-anchor" href="#getting-started" aria-hidden="true">#</a></h1><p>This page does assume that you are already familiar with IoC containers. For more background on the concepts and usage of an IoC container within your application, see <a href="/lamar/guide/ioc/concepts.html">concepts</a></p><h2 id="what-is-lamar" tabindex="-1">What is Lamar? <a class="header-anchor" href="#what-is-lamar" aria-hidden="true">#</a></h2><p>Lamar is a .NET library that provides two pieces of functionality:</p><ol><li>A fast <a href="https://www.martinfowler.com/articles/injection.html" target="_blank" rel="noreferrer">Inversion of Control Container</a> that natively supports the <a href="https://code.msdn.microsoft.com/Dependency-injection-in-f789ceaa" target="_blank" rel="noreferrer">ASP.Net Core DI abstractions</a> and a subset of the older <a href="https://structuremap.github.io" target="_blank" rel="noreferrer">StructureMap library</a></li><li>The dynamic code generation and compilation features used underneath the IoC implementation</li></ol><h2 id="history-and-motivation" tabindex="-1">History and Motivation <a class="header-anchor" href="#history-and-motivation" aria-hidden="true">#</a></h2><p><a href="https://structuremap.github.io" target="_blank" rel="noreferrer">StructureMap</a> was the first production capable Inversion of Control container in the .Net ecosystem, with its first production usage in the summer of 2004. Despite its success, StructureMap&#39;s internals were not keeping up well with modern usage within <a href="http://ASP.Net" target="_blank" rel="noreferrer">ASP.Net</a> Core applications and lagged in performance. Lamar was conceived as a replacement for StructureMap that would hugely improve upon StructureMap&#39;s performance, be completely compliant with the new <a href="http://ASP.Net" target="_blank" rel="noreferrer">ASP.Net</a> Core DI behavior, and provide an easy off ramp for existing StructureMap users.</p><h2 id="lamar-as-ioc-container" tabindex="-1">Lamar as IoC Container <a class="header-anchor" href="#lamar-as-ioc-container" aria-hidden="true">#</a></h2><p>To get started, just add <a href="https://www.nuget.org/packages/Lamar/" target="_blank" rel="noreferrer">Lamar</a> to your project through Nuget.</p><p>Most of the time you use an IoC container these days, it&#39;s probably mostly hidden inside of some kind of application framework. However, if you wanted to use Lamar all by itself you would first <a href="/lamar/guide/ioc/bootstrapping.html">bootstrap a Lamar container</a> with all its service registrations something like this:</p><p><a id="snippet-sample_start-a-container"></a></p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">container</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Container</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// Using StructureMap style registrations</span></span>
<span class="line"><span style="color:#A6ACCD;">    x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">For</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IClock</span><span style="color:#89DDFF;">&gt;().</span><span style="color:#82AAFF;">Use</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Clock</span><span style="color:#89DDFF;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// Using ASP.Net Core DI style registrations</span></span>
<span class="line"><span style="color:#A6ACCD;">    x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddTransient</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IClock</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Clock</span><span style="color:#89DDFF;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// and lots more services in all likelihood</span></span>
<span class="line"><span style="color:#89DDFF;">});</span></span>
<span class="line"></span></code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/Samples/GettingStarted.cs#L11-L24" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_start-a-container" title="Start of snippet">anchor</a></sup></p><p>Now, to resolve services from your container:</p><p><a id="snippet-sample_resolving-services-quickstart"></a></p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// StructureMap style</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Get a required service</span></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">clock</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> container</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetInstance</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IClock</span><span style="color:#89DDFF;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Try to resolve a service if it&#39;s registered</span></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">service</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> container</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">TryGetInstance</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IService</span><span style="color:#89DDFF;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// ASP.Net Core style</span></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">provider</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">IServiceProvider</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">container</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Get a required service</span></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">clock2</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> provider</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetRequiredService</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IClock</span><span style="color:#89DDFF;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Try to resolve a service if it&#39;s registered</span></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">service2</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> provider</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetService</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IService</span><span style="color:#89DDFF;">&gt;();</span></span>
<span class="line"></span></code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/Samples/GettingStarted.cs#L26-L45" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_resolving-services-quickstart" title="Start of snippet">anchor</a></sup></p><p>Definitely note that the old StructureMap style of service resolution is semantically different than <a href="http://ASP.Net" target="_blank" rel="noreferrer">ASP.Net</a> Core&#39;s DI resolution methods. That&#39;s been the cause of much user aggravation over the years.</p><h2 id="lamar-within-asp-net-core-applications" tabindex="-1">Lamar within <a href="http://ASP.Net" target="_blank" rel="noreferrer">ASP.Net</a> Core Applications <a class="header-anchor" href="#lamar-within-asp-net-core-applications" aria-hidden="true">#</a></h2><p>To use Lamar within <a href="http://ASP.Net" target="_blank" rel="noreferrer">ASP.Net</a> Core applications, also install the <a href="https://www.nuget.org/packages/Lamar.Microsoft.DependencyInjection/" target="_blank" rel="noreferrer">Lamar.Microsoft.DependencyInjection</a> library from Nuget to your <a href="http://ASP.Net" target="_blank" rel="noreferrer">ASP.Net</a> Core project (and you can thank Microsoft for the clumsy naming convention, thank you).</p><p>With that NuGet installed, your normal <a href="http://ASP.Net" target="_blank" rel="noreferrer">ASP.Net</a> Core bootstrapping changes just slightly. When you bootstrap your <code>IWebHostBuilder</code> object that configures <a href="http://ASP.Net" target="_blank" rel="noreferrer">ASP.Net</a> Core, you also need to call the <code>UseLamar()</code> method as shown below:</p><p><a id="snippet-sample_getting-started-main"></a></p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">static</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Main</span><span style="color:#89DDFF;">(string[]</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">args</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">builder</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">WebHostBuilder</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    builder</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// Replaces the built in DI container</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// with Lamar</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">UseLamar</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// Normal ASP.Net Core bootstrapping</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">UseUrls</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://localhost:5002</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">UseKestrel</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">UseStartup</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Startup</span><span style="color:#89DDFF;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    builder</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Start</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.AspNetCoreTests/Samples/StartUp.cs#L14-L31" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_getting-started-main" title="Start of snippet">anchor</a></sup></p><p>If you use a <code>StartUp</code> class for extra configuration, your <code>ConfigureContainer()</code> method <em>can</em> take in a <code>ServiceRegistry</code> object from Lamar for service registrations in place of the <a href="http://ASP.Net" target="_blank" rel="noreferrer">ASP.Net</a> Core <code>IServiceCollection</code> interface as shown below:</p><p><a id="snippet-sample_getting-started-startup"></a></p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Startup</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// Take in Lamar&#39;s ServiceRegistry instead of IServiceCollection</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// as your argument, but fear not, it implements IServiceCollection</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// as well</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ConfigureContainer</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">ServiceRegistry</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">services</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// Supports ASP.Net Core DI abstractions</span></span>
<span class="line"><span style="color:#A6ACCD;">        services</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddMvc</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">        services</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddLogging</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// Also exposes Lamar specific registrations</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// and functionality</span></span>
<span class="line"><span style="color:#A6ACCD;">        services</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Scan</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">s</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            s</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">TheCallingAssembly</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">            s</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">WithDefaultConventions</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">});</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Configure</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">IApplicationBuilder</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">app</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">UseMvc</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.AspNetCoreTests/Samples/StartUp.cs#L35-L61" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_getting-started-startup" title="Start of snippet">anchor</a></sup></p><p>You can also still write <code>ConfigureServices(IServiceCollection)</code>, but you&#39;d miss out on most of Lamar&#39;s extra functionality beyond what that abstraction provides.</p><p>And that is that, you&#39;re ready to run your <a href="http://ASP.Net" target="_blank" rel="noreferrer">ASP.Net</a> Core application with Lamar handling service resolution and object cleanup during your HTTP requests.</p><h2 id="lamar-with-asp-net-core-minimal-hosting" tabindex="-1">Lamar with <a href="http://ASP.NET" target="_blank" rel="noreferrer">ASP.NET</a> Core Minimal Hosting <a class="header-anchor" href="#lamar-with-asp-net-core-minimal-hosting" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>The <code>[FromServices]</code> attribute is not necessary when using Lamar as the backing DI container behind <a href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-6.0" target="_blank" rel="noreferrer">Minimal API</a> applications because Lamar implements the <a href="http://ASP.Net" target="_blank" rel="noreferrer">ASP.Net</a> <code>IServiceProviderIsService</code> interface.</p></div><p>Minimal hosting provides you with a condensed programming experience, only exposing the minimum required to get an <a href="http://ASP.NET" target="_blank" rel="noreferrer">ASP.NET</a> Core application running. You can still use Lamar with the minimal hosting approach with the existing <code>UseLamar()</code> extension methods to wire Lamar into the <a href="http://ASP.NET" target="_blank" rel="noreferrer">ASP.NET</a> Core infrastructure. Follow the example below. You will still need the NuGet packages mentioned in the previous section.</p><p><a id="snippet-sample_using_lamar_with_minimal_api"></a></p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">builder</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> WebApplication</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">CreateBuilder</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">args</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// use Lamar as DI.</span></span>
<span class="line"><span style="color:#A6ACCD;">builder</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Host</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">UseLamar</span><span style="color:#89DDFF;">((</span><span style="color:#FFCB6B;">context</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">registry</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// register services using Lamar</span></span>
<span class="line"><span style="color:#A6ACCD;">    registry</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">For</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ITest</span><span style="color:#89DDFF;">&gt;().</span><span style="color:#82AAFF;">Use</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">MyTest</span><span style="color:#89DDFF;">&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// Add your own Lamar ServiceRegistry collections</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// of registrations</span></span>
<span class="line"><span style="color:#A6ACCD;">    registry</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">IncludeRegistry</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">MyRegistry</span><span style="color:#89DDFF;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// discover MVC controllers -- this was problematic</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// inside of the UseLamar() method, but is &quot;fixed&quot; in</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// Lamar V8</span></span>
<span class="line"><span style="color:#A6ACCD;">    registry</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddControllers</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#89DDFF;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">app</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> builder</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Build</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">MapControllers</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Add Minimal API routes</span></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">MapGet</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">ITest</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">service</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> service</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">SayHello</span><span style="color:#89DDFF;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Run</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span></code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/LamarWithMinimalApiOnNet6/Program.cs#L8-L37" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_using_lamar_with_minimal_api" title="Start of snippet">anchor</a></sup></p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Note, there are a couple overloads for <code>UseLamar()</code> that may be more or less appropriate for your exact application&#39;s needs.</p></div><h2 id="lamar-for-runtime-code-generation-compilation" tabindex="-1">Lamar for Runtime Code Generation &amp; Compilation <a class="header-anchor" href="#lamar-for-runtime-code-generation-compilation" aria-hidden="true">#</a></h2><p>Please see <a href="./compilation/">compilation</a> for more information.</p>`,39),t=[o];function p(r,c,i,y,F,D){return n(),a("div",null,t)}const h=s(l,[["render",p]]);export{A as __pageData,h as default};
