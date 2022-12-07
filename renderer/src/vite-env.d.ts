/// <reference types="vite/client" />

declare namespace ipc {
  function send(event: string, callback: function): void
  function invoke<T>(channel: string, ...args: Array[]): Promise<T>
}
