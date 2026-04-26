declare module '@tryghost/content-api' {
  interface GhostContentAPIOptions {
    url: string;
    key: string;
    version?: string;
  }

  interface BrowseOptions {
    limit?: string | number;
    order?: string;
  }

  interface ReadOptions {
    slug?: string;
    id?: string;
  }

  class GhostContentAPI {
    constructor(options: GhostContentAPIOptions);

    posts: {
      browse(options?: BrowseOptions): Promise<any[]>;
      read(options: ReadOptions): Promise<any>;
    };
    pages: {
      read(options: ReadOptions): Promise<any>;
    };
    tags: {
      browse(options?: BrowseOptions): Promise<any[]>;
    };
  }

  export default GhostContentAPI;
}