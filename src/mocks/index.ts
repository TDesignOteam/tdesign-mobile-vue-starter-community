export async function startMsw() {
  if (typeof window === 'undefined')
    return
  // 仅在显式开启时启动，避免无意中影响真实接口
  const enabled = (window as any).__MSW_ENABLED__ ?? import.meta.env.VITE_MSW === 'true'
  if (!enabled)
    return
  const { worker } = await import('./browser')
  const swUrl = `${import.meta.env.BASE_URL || '/'}mockServiceWorker.js`
  await worker.start({
    serviceWorker: { url: swUrl },
    onUnhandledRequest: 'bypass',
  } as any)
}
