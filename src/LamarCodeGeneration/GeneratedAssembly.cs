using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using LamarCodeGeneration.Model;
using LamarCodeGeneration.Util;

namespace LamarCodeGeneration
{
    public class GeneratedAssembly
    {
        public readonly List<GeneratedType> GeneratedTypes = new List<GeneratedType>();

        public GeneratedAssembly(GenerationRules generation)
        {
            Generation = generation;
        }

        public GenerationRules Generation { get; }
        
        private readonly IList<Assembly> _assemblies = new List<Assembly>();

        public void ReferenceAssembly(Assembly assembly)
        {
            _assemblies.Fill(assembly);
        }
        
        public GeneratedType AddType(string typeName, Type baseType)
        {
            // TODO -- assert that it's been generated already?

            var generatedType = new GeneratedType(Generation, typeName);
            if (baseType.IsInterface)
            {
                generatedType.Implements(baseType);
            }
            else
            {
                generatedType.InheritsFrom(baseType);
            }

            GeneratedTypes.Add(generatedType);

            return generatedType;
        }

        public void AttachAssembly(Assembly assembly)
        {
            var generated = assembly.GetExportedTypes().ToArray();

            foreach (var generatedType in GeneratedTypes)
            {
                generatedType.FindType(generated);
            }
        }
        
        /// <summary>
        /// Extra namespaces to be written out as using blocks
        /// in the generated code
        /// </summary>
        public IList<string> Namespaces { get; } = new List<string>();

        public string GenerateCode(IServiceVariableSource services = null)
        {
            foreach (var generatedType in GeneratedTypes)
            {
                services?.StartNewType();
                generatedType.ArrangeFrames(services);
            }

            var namespaces = AllReferencedNamespaces();

            using (var writer = new SourceWriter())
            {
                foreach (var ns in namespaces.OrderBy(x => x))
                {
                    writer.Write($"using {ns};");
                }

                writer.BlankLine();

                writer.Namespace(Generation.ApplicationNamespace);

                foreach (var @class in GeneratedTypes)
                {
                    writer.WriteLine($"// START: {@class.TypeName}");
                    @class.Write(writer);
                    writer.WriteLine($"// END: {@class.TypeName}");

                    writer.WriteLine("");
                    writer.WriteLine("");
                }

                writer.FinishBlock();


                var code = writer.Code();

                attachSourceCodeToChains(ref code);

                return code;
            }
        }

        public List<string> AllReferencedNamespaces()
        {
            var namespaces = GeneratedTypes
                .SelectMany(x => x.AllInjectedFields)
                .Select(x => x.ArgType.Namespace)
                .Concat(Namespaces)
                .Distinct()
                .Where(x => x.IsNotEmpty()) // weed out blank namespaces, thank you F#!
                .ToList();
            return namespaces;
        }

        private void attachSourceCodeToChains(ref string code)
        {
            using (var parser = new SourceCodeParser(code))
            {
                foreach (var type in GeneratedTypes)
                {
                    type.SourceCode = parser.CodeFor(type.TypeName);
                }
            }
        }

        /// <summary>
        /// Creates a new GeneratedAssembly with default generation
        /// rules and using the namespace "LamarGenerated"
        /// </summary>
        /// <returns></returns>
        public static GeneratedAssembly Empty()
        {
            return new GeneratedAssembly(new GenerationRules("LamarGenerated"));
        }
    }
}