export interface IMarkdownProcessorProvider {
  toHTML: (markdown: string) => Promise<string>;
}
