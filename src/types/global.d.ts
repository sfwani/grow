/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="next" />
/// <reference types="framer-motion" />

declare module 'react' {
  interface JSX {
    IntrinsicElements: any
  }
}

declare module 'framer-motion' {
  export const motion: any
}

declare module 'next/link' {
  const Link: any
  export default Link
} 