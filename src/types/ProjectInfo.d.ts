import type { Link } from "./Link";
import type { Platform } from "./Platform";

export interface AppInfo {
  id: string;
  name: string;
  platform: Platform;
  description: string;
  links: Array<Link>;
  technologies: Array<Link>;
}

export interface ProjectInfo {
  id: string;
  name: string;
  description: string;
  image: string;
  apps: Array<AppInfo>;
}
