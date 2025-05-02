import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import Axios from '../services/Axios';

export interface Folder {
  _id: string;
  name: string;
  description?: string;
  parent?: string | null;
  children: Folder[];
  files: FileItem[];
  createdAt: string;
  updatedAt: string;
}

export interface FileItem {
  _id: string;
  name: string;
  originalName: string;
  folderId: string;
  fileType: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

interface FileStoreState {
  folderPath: string[];
  currentFolder: Folder | null;
  folderTree: Folder[];
  searchTerm: string;
  uploadProgress: number;

  expandedFolders: Record<string, boolean>;
  toggleFolderExpand: (id: string) => void;
  setFolderExpanded: (id: string, isOpen: boolean) => void;
  isLeftSidebarOpen: boolean;
  setLeftSidebarOpen: (open: boolean) => void;

  setUploadProgress: (percent: number) => void;
  setCurrentFolder: (folder: Folder | null) => void;
  setSearchTerm: (term: string) => void;
  setFolderTree: (tree: Folder[]) => void;
  fetchFolderTree: () => Promise<void>;

  loadedFolders: Record<string, Folder>; // folderId → folder with children/files
  loadFolderById: (id: string) => Promise<void>;
}


export const useFileStore = create<FileStoreState>()(
  devtools((set) => ({
    currentFolder: null,
    folderTree: [],
    searchTerm: '',
    uploadProgress: 0,
    isLeftSidebarOpen: true,
    expandedFolders: {},
    loadedFolders: {},

    setCurrentFolder: (folder) => set({ currentFolder: folder }),
    setSearchTerm: (term) => set({ searchTerm: term }),
    setFolderTree: (tree) => set({ folderTree: tree }),
    setUploadProgress: (percent) => set({ uploadProgress: percent }),

    toggleFolderExpand: (id) =>
      set((state) => ({
        expandedFolders: {
          ...state.expandedFolders,
          [id]: !state.expandedFolders[id],
        },
      })),

    setFolderExpanded: (id, isOpen) =>
      set((state) => ({
        expandedFolders: {
          ...state.expandedFolders,
          [id]: isOpen,
        },
      })),

    setLeftSidebarOpen: (open) => set({ isLeftSidebarOpen: open }),

    fetchFolderTree: async () => {
      try {
        const res = await Axios.get('/folders');
        set({ folderTree: res.data });
      } catch (err) {
        console.error('Failed to fetch folder tree:', err);
      }
    },

    loadFolderById: async (id) => {
      try {
        const res = await Axios.get(`/folders/${id}/items`);
        set((state) => ({
          loadedFolders: {
            ...state.loadedFolders,
            [id]: {
              ...state.loadedFolders[id],
              _id: id,
              children: res.data.folders,
              files: res.data.files,
            },
          },
        }));
      } catch (err) {
        console.error(`Failed to load folder ${id}`, err);
      }
    },

  }))
);
