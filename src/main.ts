import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files from the 'client' directory
  app.useStaticAssets("src/client");

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
