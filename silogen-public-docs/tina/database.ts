import {
  createDatabase,
  createLocalDatabase,
  Database,
} from "@tinacms/datalayer";
import { GitHubProvider } from "tinacms-gitprovider-github";
import { MongodbLevel } from "mongodb-level";
import { rootPath } from "./config";
import pino from "pino";
import pretty from "pino-pretty";

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || "info",
  },
  pretty({
    colorize: true,
  }),
);

// Manage this flag in your CI/CD pipeline and make sure it is set to false in production
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";
const token = process.env.GITHUB_ACCESS_TOKEN as string;
const owner = (process.env.GITHUB_OWNER ||
  process.env.VERCEL_GIT_REPO_OWNER) as string;
const repo = (process.env.GITHUB_REPO ||
  process.env.VERCEL_GIT_REPO_SLUG) as string;
const branch = (process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  "main") as string;

if (!branch) {
  throw new Error(
    "No branch found. Make sure that you have set the GITHUB_BRANCH or process.env.VERCEL_GIT_COMMIT_REF environment variable.",
  );
}

let currentUserId: string = "default-userid";

export function setCurrentUserId(userId: string): void {
  currentUserId = userId;
  logger.debug(`Current user ID set to: ${userId}`);
}

function getDatabaseInstance() {
  let gitProvider: GitHubProvider = new GitHubProvider({
    branch,
    owner,
    repo,
    token,
    rootPath: rootPath,
  });

  // Store the original onPut function and bind it to the gitProvider
  const originalOnPut = gitProvider.onPut.bind(gitProvider);

  // Override onPut with a new function
  gitProvider.onPut = async (path, data) => {
    // Set the commit message to include the current user ID
    gitProvider.commitMessage = `${currentUserId}: Update content`;
    logger.info(`User ${currentUserId} put ${path} to database`, data);
    // Call the original onPut function
    if (originalOnPut) {
      await originalOnPut(path, data);
    }
  };

  // Store the original onDelete function and bind it to the gitProvider
  const originalOnDelete = gitProvider.onDelete.bind(gitProvider);

  // Override onDelete with a new function
  gitProvider.onDelete = async (path) => {
    // Set the commit message to include the current user ID
    gitProvider.commitMessage = `${currentUserId}: Delete content`;
    logger.info(`User ${currentUserId} deleted ${path} from database`);
    // Call the original onDelete function
    if (originalOnDelete) {
      await originalOnDelete(path);
    }
  };

  return isLocal
    ? createLocalDatabase()
    : createDatabase({
        gitProvider: gitProvider,
        databaseAdapter: new MongodbLevel<string, Record<string, any>>({
          // If you are not using branches you could pass a static collection name. ie: "tinacms"
          collectionName: `tinacms-${branch}`,
          dbName: "tinacms",
          mongoUri: process.env.MONGODB_URI as string,
        }),
      });
}

export default getDatabaseInstance();
