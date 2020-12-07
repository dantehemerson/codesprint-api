import { defaultMetadataStorage } from 'class-transformer/storage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import express from 'express';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';
import { routingControllersOptions } from '../options/routing-controler.options';
import { version, license } from '../../../../../package.json';

export function createSwaggerDocsRouter() {
  const swaggeOASRouter = express.Router();

  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/',
  });

  /** Wrapped in an object because we need create the server before getting the metadata */
  const storage = getMetadataArgsStorage();

  const spec = routingControllersToSpec(storage, routingControllersOptions, {
    components: {
      schemas,
      securitySchemes: {
        bearerAuth: {
          scheme: 'bearer',
          bearerFormat: 'JWT',
          type: 'http',
        },
      },
    },
    info: {
      description:
        'It provides an overview around our available endpoints, *you need to be authenticated to use our API*',
      title: 'CodeSprint API',
      license: {
        name: license,
        url: 'https://github.com/dantehemerson/codesprint/blob/master/LICENSE',
      },
      version,
    },
  });

  swaggeOASRouter.use(
    '/docs',
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(spec, {
      customSiteTitle: 'CodeSprint API',
      customCssUrl:
        'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.1/themes/3.x/theme-flattop.css',
    }),
  );

  return swaggeOASRouter;
}
