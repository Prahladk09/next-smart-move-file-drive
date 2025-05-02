// This file contains utility functions for handling folder structures.
import { Folder } from '../store/useFileStore';

export function getPathFromTree(tree: Folder[], targetId: string): Folder[] {
  const path: Folder[] = [];

  function dfs(nodes: Folder[], currentPath: Folder[]) {
    for (const node of nodes) {
      const newPath = [...currentPath, node];
      if (node._id === targetId) {
        path.push(...newPath);
        return true;
      }
      if (node.children && dfs(node.children, newPath)) return true;
    }
    return false;
  }

  dfs(tree, []);
  return path;
}
