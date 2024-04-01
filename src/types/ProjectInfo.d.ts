import type { Link } from "./Link";
import type { Platform } from "./Platform";

export interface ProjectInfo {
  id: string;
  name: string;
  platform: Platform;
  description: string;
  image: string;
  links: Array<Link>;
  technologies: Array<Link>;
}
