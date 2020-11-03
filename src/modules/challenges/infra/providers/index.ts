import { IMarkdownProcessorProvider } from '@modules/challenges/domain/interfaces/markdown-processor-provider.interface';
import { container } from 'tsyringe';
import { MarkdownProcessorProvider } from './markdown-processor.provider';

container.registerSingleton<IMarkdownProcessorProvider>(
  'MarkdownProcessorProvider',
  MarkdownProcessorProvider,
);
