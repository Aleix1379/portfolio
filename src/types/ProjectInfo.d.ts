import type { Link } from "./Link";
import type { Platform } from "./Platform";

export interface AppInfo {
  id: string;
  name: string;
  platform: Platform;
  description: string;
  technologies: Array<Link>;
}

export interface ProjectInfo {
  id: string;
  name: string;
  description: string;
  image: string;
  links: Array<Link>;
  apps: Array<AppInfo>;
  active: boolean;
}
