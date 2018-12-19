import * as path from 'path';

import {
  CompilerHost,
  Diagnostic,
  FormatDiagnosticsHost,
  ParseConfigFileHost,
  ParsedCommandLine,
  Printer,
  Program,
  ScriptTarget,
  SourceFile,
  createCompilerHost,
  createPrinter,
  createProgram,
  createSourceFile,
  formatDiagnostic,
  formatDiagnosticsWithColorAndContext,
  getConfigFileParsingDiagnostics,
  getParsedCommandLineOfConfigFile,
  getPreEmitDiagnostics,
  parseCommandLine,
  sys,
  transform,
} from 'typescript';

import createInnerJsxTransformer from 'typescript-plugin-inner-jsx';

class Compiler {
  private diagnosticsHost: FormatDiagnosticsHost;
  private config: ParsedCommandLine;
  private compilerHost: CompilerHost;
  private printer: Printer;

  constructor(args: { tsconfigPath: string; commandLine: ReadonlyArray<string> }) {
    this.diagnosticsHost = this.createDiagnosticsHost();
    this.config = this.createConfig(args.tsconfigPath, args.commandLine);
    this.compilerHost = createCompilerHost(this.config.options);
    this.printer = createPrinter();
  }

  private createDiagnosticsHost() {
    const diagnosticsHost: FormatDiagnosticsHost = {
      getCurrentDirectory: sys.getCurrentDirectory,
      getCanonicalFileName: path.normalize,
      getNewLine(): string {
        return sys.newLine;
      },
    };

    return diagnosticsHost;
  }

  private createConfigFileHost() {
    const configFileHost: ParseConfigFileHost = {
      onUnRecoverableConfigFileDiagnostic(diagnostic: Diagnostic) {
        console.error(formatDiagnostic(diagnostic, this.diagnosticsHost));
      },
      useCaseSensitiveFileNames: false,
      readDirectory: sys.readDirectory,
      fileExists: sys.fileExists,
      readFile: sys.readFile,
      getCurrentDirectory: sys.getCurrentDirectory,
    };

    return configFileHost;
  }

  private showDiagnostics(diagnostics: ReadonlyArray<Diagnostic>) {
    throw formatDiagnosticsWithColorAndContext(diagnostics, this.diagnosticsHost);
  }

  private createConfig(tsconfigPath: string, commandLine: ReadonlyArray<string>) {
    const configFileHost = this.createConfigFileHost();
    const config = getParsedCommandLineOfConfigFile(
      tsconfigPath,
      parseCommandLine(commandLine).options,
      configFileHost,
    );

    if (!config) {
      throw 'Error parsing config file';
    }

    const diagnostics = getConfigFileParsingDiagnostics(config);
    if (diagnostics.length) {
      this.showDiagnostics(diagnostics);
    }

    return config;
  }

  private createProgram(compilerHost: CompilerHost, oldProgram?: Program) {
    const { fileNames, options } = this.config;
    const program = createProgram(fileNames, options, compilerHost, oldProgram);
    const preEmitDiagnostics = getPreEmitDiagnostics(program);

    if (preEmitDiagnostics.length) {
      this.showDiagnostics(preEmitDiagnostics);
    }

    return program;
  }

  private getTransformed(program: Program) {
    const sourceFiles = program.getSourceFiles();
    const sourseTsxFiles = sourceFiles.filter(({ fileName }) => fileName.match(/\.tsx$/));
    const { transformed } = transform(sourseTsxFiles, [createInnerJsxTransformer()]);

    return transformed.reduce<{ [path: string]: SourceFile }>((dict, file) => {
      dict[file.fileName] = file;
      return dict;
    }, {});
  }

  private wrapCompilerHost(host: CompilerHost, transformed: { [path: string]: SourceFile }) {
    return {
      ...host,
      getSourceFile: (fileName: string, version: ScriptTarget) => {
        if (transformed[fileName]) {
          return createSourceFile(fileName, this.printer.printFile(transformed[fileName]), version);
        } else {
          return host.getSourceFile(fileName, version);
        }
      },
    };
  }

  run() {
    const program = this.createProgram(this.compilerHost);
    const transformed = this.getTransformed(program);
    const wrappedHost = this.wrapCompilerHost(this.compilerHost, transformed);
    const finalProgram = this.createProgram(wrappedHost, program);
    const emitResult = finalProgram.emit();

    if (emitResult.diagnostics.length) {
      this.showDiagnostics(emitResult.diagnostics);
    }

    const exitCode = emitResult.emitSkipped ? 1 : 0;
    process.exit(exitCode);
  }
}

const compiler = new Compiler({
  commandLine: process.argv,
  tsconfigPath: path.join(__dirname, '..', 'tsconfig.json'),
});

compiler.run();
