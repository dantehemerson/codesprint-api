import { IMarkdownProcessorProvider } from '@modules/challenges/domain/interfaces/markdown-processor-provider.interface';
import MarkdownIt from 'markdown-it';

export class MarkdownProcessorProvider implements IMarkdownProcessorProvider {
  private readonly md: MarkdownIt;

  constructor() {
    this.md = new MarkdownIt();
  }

  async toHTML(markdownSource: string) {
    return this.md.render(markdownSource);
  }
}
