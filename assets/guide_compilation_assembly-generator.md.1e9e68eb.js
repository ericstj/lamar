import{_ as s,c as n,o as a,a as l}from"./app.5b13aa3a.js";const A=JSON.parse('{"title":"Compiling Code with AssemblyGenerator","description":"","frontmatter":{},"headers":[],"relativePath":"guide/compilation/assembly-generator.md"}'),e={name:"guide/compilation/assembly-generator.md"},o=l(`<h1 id="compiling-code-with-assemblygenerator" tabindex="-1">Compiling Code with AssemblyGenerator <a class="header-anchor" href="#compiling-code-with-assemblygenerator" aria-hidden="true">#</a></h1><div class="tip custom-block"><p class="custom-block-title">INFO</p><p>The Lamar team thinks most users will use the <a href="/lamar/guide/compilation/frames/">Frames</a> to generate and compile code, but you might very well wish to bypass that admittedly complicated model and just use the inner utility classes that are shown in this page.</p></div><p>If all you want to do is take some C# code and compile that in memory to a new, in memory assembly, you can use the <code>LamarCompiler.AssemblyGenerator</code> class in the LamarCompiler library.</p><p>Let&#39;s say that you have a simple interface in your system like this:</p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">IOperation</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">int</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Calculate</span><span style="color:#89DDFF;">(int</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">one</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">int</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">two</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>Next, let&#39;s use <code>AssemblyGenerator</code> to compile code with a custom implementation of <code>IOperation</code> that we&#39;ve generated in code:</p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">generator</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AssemblyGenerator</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// This is necessary for the compilation to succeed</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// It&#39;s exactly the equivalent of adding references</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// to your project</span></span>
<span class="line"><span style="color:#A6ACCD;">generator</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ReferenceAssembly</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Console</span><span style="color:#89DDFF;">).</span><span style="color:#A6ACCD;">Assembly</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">generator</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ReferenceAssembly</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">IOperation</span><span style="color:#89DDFF;">).</span><span style="color:#A6ACCD;">Assembly</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Compile and generate a new .Net Assembly object</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// in memory</span></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">assembly</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> generator</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Generate</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">@&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">using LamarCompiler.Testing.Samples;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">namespace Generated</span></span>
<span class="line"><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#C3E88D;">public class AddOperator : IOperation</span></span>
<span class="line"><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#C3E88D;">public int Calculate(int one, int two)</span></span>
<span class="line"><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#C3E88D;">return one + two;</span></span>
<span class="line"><span style="color:#C3E88D;">}</span></span>
<span class="line"><span style="color:#C3E88D;">}</span></span>
<span class="line"><span style="color:#C3E88D;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Find the new type we generated up above</span></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> assembly</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetExportedTypes</span><span style="color:#89DDFF;">().</span><span style="color:#82AAFF;">Single</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Use Activator.CreateInstance() to build an object</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// instance of our new class, and cast it to the </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// IOperation interface</span></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">operation</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">IOperation</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">Activator</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">CreateInstance</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">type</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Use our new type</span></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">result</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> operation</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Calculate</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span></code></pre></div><p>There&#39;s only a couple things going on in the code above:</p><ol><li>I added an assembly reference for the .Net assembly that holds the <code>IOperation</code> interface</li><li>I passed a string to the <code>GenerateCode()</code> method, which successfully compiles my code and hands me back a .Net <a href="https://msdn.microsoft.com/en-us/library/system.reflection.assembly(v=vs.110).aspx" target="_blank" rel="noreferrer">Assembly</a> object</li><li>Load the newly generated type from the new Assembly</li><li>Use the new <code>IOperation</code></li></ol><p>If you&#39;re not perfectly keen on doing brute force string manipulation to generate your code, you can also use Lamar&#39;s built in <a href="/lamar/guide/compilation/source-writer.html">ISourceWriter</a> to generate some of the code for you with all its code generation utilities:</p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">generator</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AssemblyGenerator</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// This is necessary for the compilation to succeed</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// It&#39;s exactly the equivalent of adding references</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// to your project</span></span>
<span class="line"><span style="color:#A6ACCD;">generator</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ReferenceAssembly</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Console</span><span style="color:#89DDFF;">).</span><span style="color:#A6ACCD;">Assembly</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">generator</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ReferenceAssembly</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">IOperation</span><span style="color:#89DDFF;">).</span><span style="color:#A6ACCD;">Assembly</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">assembly</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> generator</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Generate</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Namespace</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Generated</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">StartClass</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">AddOperator</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">typeof</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">IOperation</span><span style="color:#89DDFF;">));</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Write</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">BLOCK:public int Calculate(int one, int two)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Write</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">return one + two;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">FinishBlock</span><span style="color:#89DDFF;">();</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// Finish the method</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">FinishBlock</span><span style="color:#89DDFF;">();</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// Finish the class</span></span>
<span class="line"><span style="color:#A6ACCD;">    x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">FinishBlock</span><span style="color:#89DDFF;">();</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// Finish the namespace</span></span>
<span class="line"><span style="color:#89DDFF;">});</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> assembly</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">GetExportedTypes</span><span style="color:#89DDFF;">().</span><span style="color:#82AAFF;">Single</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">operation</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">IOperation</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">Activator</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">CreateInstance</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">type</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">result</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> operation</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Calculate</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span></code></pre></div>`,11),p=[o];function t(c,r,y,F,i,D){return a(),n("div",null,p)}const d=s(e,[["render",t]]);export{A as __pageData,d as default};
