/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_URI: string
  readonly VITE_GRAPHQL_TOKEN?: string
  readonly VITE_USE_MOCK_TASKS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
